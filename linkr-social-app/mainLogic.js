const baseUrl = 'https://tarmeezacademy.com/api/v1'

// ===== POST REQUEST ===== //
function CreateNewPostClicked() {
  let postId = document.getElementById("post-id-input").value
  let isCreate = postId === ""

  const title = document.getElementById("post-title-input").value
  const body  = document.getElementById("post-body-input").value
  const image = document.getElementById("post-image-input").files[0]
  const token = localStorage.getItem("token")

  let formData = new FormData()
  formData.append("body", body)
  formData.append("title", title)
  formData.append("image", image)

  let Url = ``
  const headers = {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${token}`
  }

  if (isCreate) {
    Url = `${baseUrl}/posts`
  } else {
    formData.append("_method", "put")
    Url = `${baseUrl}/posts/${postId}`
  }

  toggleLoader(true)
  axios.post(Url, formData, { headers })
    .then((response) => {
      const modal = document.getElementById("create-post-modal")
      const modalInstance = bootstrap.Modal.getInstance(modal)
      document.activeElement.blur()
      modalInstance.hide()
      showAlert("Post saved successfully", "success")
      getPosts()
    })
    .catch((error) => {
      showAlert(error.response.data.message, 'danger')
    })
    .finally(() => {
      toggleLoader(false)
    })
}

function EditPostBtnClicked(postObject) {
  let Post = JSON.parse(decodeURIComponent(postObject))
  document.getElementById("post-modal-submit-btn").innerHTML = "Update"
  document.getElementById("post-id-input").value           = Post.id
  document.getElementById("post-modal-title").innerHTML    = "Edit Post"
  document.getElementById("post-title-input").value        = Post.title
  document.getElementById("post-body-input").value         = Post.body
  let postModal = new bootstrap.Modal(document.getElementById("create-post-modal"), {})
  postModal.toggle()
}

function deletePostBtnClicked(postObject) {
  let Post = JSON.parse(decodeURIComponent(postObject))
  document.getElementById("delete-post-id-input").value = Post.id
  let postModal = new bootstrap.Modal(document.getElementById("delete-post-modal"), {})
  postModal.toggle()
}

function confirmPostDelete() {
  const token  = localStorage.getItem("token")
  const postId = document.getElementById("delete-post-id-input").value
  const Url    = `${baseUrl}/posts/${postId}`
  const headers = { "Authorization": `Bearer ${token}` }

  axios.delete(Url, { headers })
    .then((response) => {
      const modal = document.getElementById("delete-post-modal")
      const modalInstance = bootstrap.Modal.getInstance(modal)
      document.activeElement.blur()
      modalInstance.hide()
      showAlert("Post deleted successfully", "success")
      getPosts()
    })
    .catch((error) => {
      showAlert(error.response.data.message, 'danger')
    })
}

function profileClicked() {
  const user   = getCurrentUser()
  const userId = user.id
  window.location = `profile.html?userid=${userId}`
}

function setupUI() {
  const token     = localStorage.getItem("token")
  const loginDiv  = document.getElementById("logged-in-div")
  const logoutDiv = document.getElementById("logout-div")
  const addBtn    = document.getElementById("add-btn")

  if (token == null) {
    if (addBtn) addBtn.style.setProperty("display", "none", "important")
    loginDiv.style.setProperty("display",  "flex", "important")
    logoutDiv.style.setProperty("display", "none", "important")
  } else {
    if (addBtn) addBtn.style.setProperty("display", "flex", "important")
    loginDiv.style.setProperty("display",  "none", "important")
    logoutDiv.style.setProperty("display", "flex", "important")

    const user = getCurrentUser()
    document.getElementById("nav-username").innerHTML = user.username
    document.getElementById("nav-user-image").src     = user.profile_image
  }
}

// ===== AUTH ===== //
function LoginBtnClicked() {
  const username = document.getElementById("username-input").value
  const password = document.getElementById("password-input").value

  toggleLoader(true)
  axios.post(`${baseUrl}/login`, { username, password })
    .then((response) => {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user",  JSON.stringify(response.data.user))

      const modal = document.getElementById("login-modal")
      bootstrap.Modal.getInstance(modal).hide()
      document.activeElement.blur()

      showAlert("Logged in successfully", "success")
      setupUI()
    })
    .catch((error) => {
      showAlert(error.response.data.message, 'danger')
    })
    .finally(() => toggleLoader(false))
}

function RegisterBtnClicked() {
  const name     = document.getElementById("register-name-input").value
  const username = document.getElementById("register-username-input").value
  const password = document.getElementById("register-password-input").value
  const image    = document.getElementById("register-image-input").files[0]

  let formData = new FormData()
  formData.append("name",     name)
  formData.append("username", username)
  formData.append("password", password)
  formData.append("image",    image)

  toggleLoader(true)
  axios.post(`${baseUrl}/register`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then((response) => {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user",  JSON.stringify(response.data.user))

      const modal = document.getElementById("register-modal")
      bootstrap.Modal.getInstance(modal).hide()
      document.activeElement.blur()

      showAlert("Registered successfully", "success")
      setupUI()
    })
    .catch((error) => {
      showAlert(error.response.data.message, 'danger')
    })
    .finally(() => toggleLoader(false))
}

function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  showAlert("Logged out successfully", "success")
  setupUI()
}

// ===== HELPERS ===== //
function toggleLoader(show = true) {
  const loader = document.getElementById("loader")
  if (!loader) return
  loader.style.visibility = show ? "visible" : "hidden"
}

function showAlert(message, type = "success") {
  const placeholder = document.getElementById('success-alert')
  if (!placeholder) return

  placeholder.innerHTML = ''
  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="sh-alert ${type}" role="alert">
      ${type === 'success'
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--success)" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--danger)" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>`
      }
      ${message}
    </div>`
  placeholder.appendChild(wrapper)
  setTimeout(() => wrapper.remove(), 3000)
}

function getCurrentUser() {
  const storageUser = localStorage.getItem("user")
  return storageUser ? JSON.parse(storageUser) : null
}
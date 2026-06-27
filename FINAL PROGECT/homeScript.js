let currentPage = 1
let lastPage    = 1

// === INFINITE SCROLL === //
window.addEventListener("scroll", function () {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 10
  if (endOfPage && currentPage < lastPage) {
    currentPage++
    getPosts(false, currentPage)
  }
})

setupUI()
getPosts()

function userClicked(userId) {
  window.location = `profile.html?userid=${userId}`
}

function getPosts(reload = true, page = 1) {
  toggleLoader(true)
  axios.get(`${baseUrl}/posts?limit=6&page=${page}`)
    .then((response) => {
      toggleLoader(false)
      const posts = response.data.data
      lastPage = response.data.meta.last_page

      if (reload) {
        document.getElementById("posts").innerHTML = ""
      }

      for (let post of posts) {
        const author      = post.author
        const postTitle   = post.title ?? ''
        const postImage   = typeof post.image === 'string' ? post.image : ''
        const authorImage = typeof author.profile_image === 'string'
          ? author.profile_image
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(author.username)}`

        const user     = getCurrentUser()
        const isMyPost = user != null && post.author.id == user.id

        let editBtnContent = ''
        if (isMyPost) {
          editBtnContent = `
            <button class="sh-btn sh-btn-outline sh-btn-sm"
              onclick="event.stopPropagation(); EditPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">
              Edit
            </button>
            <button class="sh-btn sh-btn-danger sh-btn-sm"
              onclick="event.stopPropagation(); deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">
              Delete
            </button>`
        }

        const content = `
          <div class="sh-card">
            <div class="sh-card-header">
              <div class="sh-card-header-left" onclick="userClicked(${author.id})" style="cursor:pointer;">
                <img class="sh-post-avatar"
                  src="${authorImage}"
                  onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(author.username)}'"
                  alt="">
                <span class="sh-post-username">@${author.username}</span>
              </div>
              <div class="sh-card-header-right">
                ${editBtnContent}
              </div>
            </div>

            <div class="sh-card-body" onclick="postClicked(${post.id})">
              ${postImage
                ? `<img class="sh-post-image" src="${postImage}" onerror="this.style.display='none'" alt="">`
                : ''}
              <p class="sh-post-date">${post.created_at}</p>
              ${postTitle ? `<h5 class="sh-post-title">${postTitle}</h5>` : ''}
              <p class="sh-post-body">${post.body}</p>
            </div>

            <div class="sh-card-footer">
              <span class="sh-comments-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12z"/>
                </svg>
                ${post.comments_count} Comments
              </span>
              <div class="sh-tags" id="post-tags-${post.id}"></div>
            </div>
          </div>`

        document.getElementById("posts").innerHTML += content

        // Fill tags
        const tagsEl = document.getElementById(`post-tags-${post.id}`)
        tagsEl.innerHTML = ""
        for (let tag of post.tags) {
          tagsEl.innerHTML += `<span class="sh-tag">${tag.name}</span>`
        }
      }
    })
    .catch((error) => {
      toggleLoader(false)
      console.error("Error fetching posts:", error)
    })
}

function postClicked(postId) {
  window.location = `postDetails.html?postId=${postId}`
}

function addBtnClicked() {
  document.getElementById("post-modal-submit-btn").innerHTML  = "Create"
  document.getElementById("post-id-input").value              = ""
  document.getElementById("post-modal-title").innerHTML       = "Create Post"
  document.getElementById("post-title-input").value           = ""
  document.getElementById("post-body-input").value            = ""
  new bootstrap.Modal(document.getElementById("create-post-modal"), {}).toggle()
}
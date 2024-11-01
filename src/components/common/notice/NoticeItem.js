// cantainer, post 2개 전달받는 경우 (DOM에 직접 추가)_사용자 공지 목록 페이지 || post만 전달받는 경우(문자열을 반환해 .innerHTML에 삽입) 나눔
export const RenderNoticeItem = (postContainer, post = null) => {
  if (postContainer && post) {
    postContainer.innerHTML = `
      <div class="notice-item">
        <div class="notice-image">
          <img src="${post.post_image}" alt="${post.post_title}" />
        </div>
        <div class="notice-content">
          <div class="notice-title">${post.post_title}</div>
          <p class="notice-description">${post.post_description}</p>
          <div class="notice-date">
            <span class="material-symbols-rounded">update</span>
            <p>${new Date(post.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;
  } else if (post) {
    return `
      <div class="notice-item">
        <div class="notice-image">
          <img src="${post.post_image}" alt="${post.post_title}" />
        </div>
        <div class="notice-content">
          <div class="notice-title">${post.post_title}</div>
          <p class="notice-description">${post.post_description}</p>
          <div class="notice-date">
            <span class="material-symbols-rounded">update</span>
            <p>${new Date(post.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;
  }
};

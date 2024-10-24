import './NoticeItem.css';

export const RenderNoticeItem = post => {
  return `
    <div class="notice-item">
      <div class="notice-image">
        <img src="${post.post_image}" alt="${post.post_title}" />
      </div>
      <div class="notice-content">
        <div class="notice-title">${post.post_title}</div>
        <div class="notice-description">${post.post_description}</div>
        <div class="notice-date">
          <span class="material-symbols-rounded">
            update
          </span>
          <p>${new Date(post.updated_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  `;
};

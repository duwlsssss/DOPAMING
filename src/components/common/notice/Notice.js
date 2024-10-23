import './Notice.css';

export const RenderNotice = (container, post) => {
  container.innerHTML = `
    <div class="notice-item">
      <img src="${post.post_image}" alt="${post.post_title}" />
      <h2 class="title">${post.post_title}</h2>
      <p class="description">${post.post_description}</p>
      <p class="edit-date">수정일: ${new Date(post.updated_at).toLocaleDateString()}</p>
    </div>
  `;
};

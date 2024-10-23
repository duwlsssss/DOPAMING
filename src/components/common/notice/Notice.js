import './Notice.css';

export const RenderNotice = (container, post) => {
  container.innerHTML = `
    <div class="notice-item">
      <h2>${post.post_title}</h2>
      <img src="${post.post_image}" alt="${post.post_title}" />
      <p>${post.post_description}</p>
      <p>Created at: ${new Date(post.created_at).toLocaleDateString()}</p>
      <p>Updated at:</> ${new Date(post.updated_at).toLocaleDateString()}</p>
    </div>
  `;
};

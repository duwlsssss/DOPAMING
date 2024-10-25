export const RenderAdminNoticeItem = ({
  post,
  itemContainerClassName,
  imageClassName,
  contentContainerClassName,
  contentTitleClassName,
  contentDescriptionClassName,
  contentDateClassName,
}) => {
  return `
        <div class="${itemContainerClassName}">
          <div class="${imageClassName}">
            <img src="${post.post_image}" alt="${post.post_title}" />
          </div>
          <div class="${contentContainerClassName}">
            <div class="${contentTitleClassName}">${post.post_title}</div>
            <div class="${contentDescriptionClassName}">${post.post_description}</div>
            <div class="${contentDateClassName}">
              <span class="material-symbols-rounded">
                  update
              </span>
              <p>${new Date(post.updated_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      `;
};

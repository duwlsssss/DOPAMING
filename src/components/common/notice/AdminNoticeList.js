import axios from 'axios';

export const RenderAdminNoticeList = async ({
  container,
  renderItemComponent,
  containerClassName,
  itemClassName,
  itemIdPrefix,
}) => {
  try {
    const response = await axios.get(
      '../../../../server/data/company_posts.json',
    );
    const posts = response.data.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    );

    container.innerHTML = `
      <ul class="${containerClassName}">
        ${posts
          .map(
            post => `
            <li class="${itemClassName}" id="${itemIdPrefix}-${post.post_id}">
              ${renderItemComponent(post)}
            </li>
            `,
          )
          .join('')}
      </ul>
    `;
  } catch (e) {
    console.error('공지를 가져오는 과정에서 에러가 발생했습니다: ', e);
  }
};

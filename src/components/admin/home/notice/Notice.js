import axios from 'axios';
import { RenderNoticeItem } from '../../../common/notice/NoticeItem';
import './Notice.css';

export const RenderAdminHomeNotice = async container => {
  try {
    const response = await axios.get(
      '../../../../../server/data/company_posts.json',
    );
    const posts = response.data.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    );

    container.innerHTML = `
          <ul class="admin-notice-list">
            ${posts
              .map(
                post => `
                <li class="admin-notice-container" id="admin-notice-${post.post_id}">
                  ${RenderNoticeItem(null, post)}
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

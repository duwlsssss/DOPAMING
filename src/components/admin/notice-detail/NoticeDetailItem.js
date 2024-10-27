import { ApiClient } from '../../../apis/ApiClient';
import { RenderNotFound } from '../../../pages';
import './NoticeDetailItem.css';

export const RenderAdminNoticeDetailItem = async (container, postId) => {
  const NOTICE_DATA = '../../../../server/data/company_posts.json';

  try {
    const response = await ApiClient.get(NOTICE_DATA);
    const posts = response.data;

    const post = posts.find(post => post.post_id === postId);

    if (!post) {
      RenderNotFound(container);
    }

    container.innerHTML = `
        <span class="material-symbols-rounded back-to-noticeList">arrow_left_alt</span> 
        <div class="admin-notice-detail">
            <h1 class="admin-notice-detail-title">${post.post_title}</h1>
            <h3 class="admin-notice-detail-description">${post.post_description}</h3>
            <p class="admin-notice-detail-upload-date">게시일: ${new Date(post.created_at).toLocaleDateString()}</p>
            <p class="admin-notice-detail-edit-date">수정일: ${new Date(post.updated_at).toLocaleDateString()}</p>
            <img src="${post.post_image}" alt="${post.post_title}" />
            <p class="admin-notice-detail-content">${post.post_content}</p>
        </div>
        `;

    //뒤로가기
    document
      .querySelector('.back-to-noticeList')
      .addEventListener('click', () => {
        history.back();
      });
  } catch (e) {
    console.error('공지를 가져오는 과정에서 에러가 발생했습니다:', e);
  }
};

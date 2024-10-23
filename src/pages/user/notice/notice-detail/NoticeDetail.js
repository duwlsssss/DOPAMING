import axios from 'axios';
import './NoticeDetail.css';

export const RenderUserNoticeDetail = async (container, postId) => {
  try {
    const response = await axios.get('../../server/data/company_posts.json');
    const posts = response.data;

    const post = posts.find(post => post.post_id === postId);

    if (!post) {
      container.innerHTML = `<div class="error-message>공지사항을 찾을 수 없습니다.</div>`;
      return;
    }

    container.innerHTML = `
      <span class="material-symbols-rounded back-to-noticeList">arrow_left_alt</span> 
      <div class="notice-detail">
        <h1 class="notice-detail-title">${post.post_title}</h1>
        <h3 class="notice-detail-description">${post.post_description}</h3>
        <p class="notice-detail-upload-date">게시일: ${new Date(post.created_at).toLocaleDateString()}</p>
        <p class="notice-detail-edit-date">수정일: ${new Date(post.updated_at).toLocaleDateString()}</p>
        <img src="${post.post_image}" alt="${post.post_title}" />
        <p class="notice-detail-content">${post.post_content}</p>
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

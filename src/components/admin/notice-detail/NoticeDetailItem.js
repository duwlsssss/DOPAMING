import { RenderNotFound } from '../../../pages';
import { ADMIN_PATH } from '../../../utils/constants';
import { Button } from '../../ui/button/Button';
import navigate from '../../../utils/navigation';
import './NoticeDetailItem.css';
import { Modal } from '../../ui/modal/Modal';
import { noticeAPI } from '../../../../server/api/admin';

export const RenderAdminNoticeDetailItem = async (container, postId) => {
  const modifyButton = new Button({
    text: '수정',
    color: 'green',
    shape: 'block',
    borderRadius: '14',
  });

  const deleteButton = new Button({
    text: '삭제',
    color: 'coral',
    shape: 'block',
    borderRadius: '14',
  });

  try {
    const post = await noticeAPI.getNoticeById(postId);

    if (!post) {
      RenderNotFound(container);
      return;
    }

    container.addEventListener('click', async e => {
      // 뒤로 가기
      if (e.target.closest('.back-to-noticeList')) {
        history.back();
      }

      // 수정 버튼
      if (e.target.textContent === '수정') {
        navigate(`${ADMIN_PATH.NOTICE_EDIT}/${postId}`);
      }

      // 삭제 버튼
      if (e.target.textContent === '삭제') {
        try {
          await Modal('notice-delete', { postId });
        } catch (error) {
          console.error('모달 처리 중 오류 발생:', error);
        }
      }
    });

    container.innerHTML = `
        <div class="admin-notice-detail-header">
          <span class="material-symbols-rounded back-to-noticeList">arrow_left_alt</span>
          <div class="admin-notice-detail-button-group">
            ${modifyButton.outerHTML}
            ${deleteButton.outerHTML}
          </div>
        </div>
        <div class="admin-notice-detail">
            <h1 class="admin-notice-detail-title">${post.post_title}</h1>
            <h3 class="admin-notice-detail-description">${post.post_description}</h3>
            <p class="admin-notice-detail-upload-date">게시일: ${new Date(post.created_at).toLocaleDateString()}</p>
            <p class="admin-notice-detail-edit-date">수정일: ${new Date(post.updated_at).toLocaleDateString()}</p>
            <img src="${post.post_image}" alt="${post.post_title}" />
            <p class="admin-notice-detail-content">${post.post_content}</p>
        </div>
        `;
  } catch (e) {
    console.error('공지를 가져오는 과정에서 에러가 발생했습니다:', e);
  }
};

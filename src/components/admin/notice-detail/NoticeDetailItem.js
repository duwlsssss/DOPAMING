import { ApiClient } from '../../../apis/ApiClient';
import { RenderNotFound } from '../../../pages';
import { ADMIN_PATH } from '../../../utils/constants';
import { Button } from '../../ui/button/Button';
import navigate from '../../../utils/navigation';
import './NoticeDetailItem.css';
import Modal from '../../ui/modal/Modal';

export const RenderAdminNoticeDetailItem = async (container, postId) => {
  const NOTICE_DATA = '../../../../server/data/company_posts.json';

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
    const response = await ApiClient.get(NOTICE_DATA);
    const posts = response.data;

    const post = posts.find(post => post.post_id === postId);

    if (!post) {
      RenderNotFound(container);
    }

    container.innerHTML = `
        <div class="admin-notice-detail-header">
          <span class="material-symbols-rounded back-to-noticeList">arrow_left_alt</span>
          <div class="admin-notice-detail-button-group"></div>
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

    const buttonGroup = document.querySelector(
      '.admin-notice-detail-button-group',
    );
    buttonGroup.appendChild(modifyButton);
    buttonGroup.appendChild(deleteButton);
    buttonGroup.addEventListener('click', e => {
      if (e.target.textContent === '수정') {
        navigate(`${ADMIN_PATH.NOTICE_EDIT}/${postId}`);
      } else if (e.target.textContent === '삭제') {
        // 추후 모달로 변경
        // const isDelete = confirm('정말 삭제하시겠습니까?');
        const isDelete = Modal('notice-delete');

        if (isDelete) {
          alert('삭제되었습니다.');
          navigate(ADMIN_PATH.NOTICE);
        }
      }
    });

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

import {
  Button,
  Modal,
  NoticeForm,
  ProfileImage,
} from '../../../../components';
import { handleNoticeImage } from '../../../../utils/handleProfileImg';
import navigate from '../../../../utils/navigation';
import { noticeAPI } from '../../../../../server/api/admin';
import { attachProfileImageEvents } from '../../../../components/admin/notice-profile/AttachProfileImageEvents';
import './EditNotice.css';
import { ADMIN_PATH } from '../../../../utils/constants';

export const RenderAdminEditNotice = async (container, noticeId) => {
  const paragraphOne = 'Upload';
  const paragraphTwo = 'Notification';
  const paragraphThree = 'Thumbnail';
  const description = '공지 썸네일';

  const editButton = Button({
    className: 'admin-notice-submit-button',
    text: '수정하기',
    color: 'skyblue-light',
    shape: 'block',
    onClick: async () => {
      try {
        const titleInput = container.querySelector('.notice-from-title-input');
        const descriptionInput = container.querySelector(
          '.notice-from-description-input',
        );
        const contentInput = container.querySelector(
          '.notice-from-content-input',
        );
        const imageElement = container.querySelector('.real-profileImg');

        const updateData = {
          post_title: titleInput.value,
          post_description: descriptionInput.value,
          post_content: contentInput.value,
          post_image: imageElement.getAttribute('data-image'), // data-image 속성에서 이미지 URL 가져오기
        };

        const result = await noticeAPI.updateNotice(noticeId, updateData);
        if (result.success) {
          await Modal('notice-edit-success');
        }
        navigate(ADMIN_PATH.NOTICE);
      } catch (error) {
        alert('수정 중 오류가 발생했습니다.');
        console.error('수정 오류:', error);
      }
    },
  });

  container.innerHTML = `
    <h1>공지 수정</h1>
    <div class="admin-notice-edit-container">
        <div class="admin-edit-form">
          <div class="admin-notice-edit-image">
              ${ProfileImage(paragraphOne, paragraphTwo, paragraphThree, description)}
          </div>
          <div class="admin-notice-edit-content">
            ${NoticeForm()}
          </div>                 
        </div>
        <div class="admin-notice-edit-button-container">
        </div>      
    </div>
  `;

  attachProfileImageEvents(container);
  const buttonEl = document.querySelector(
    '.admin-notice-edit-button-container',
  );
  buttonEl.append(editButton);

  const loadPostData = async () => {
    try {
      const post = await noticeAPI.getNoticeById(noticeId);

      if (post) {
        const profileImgPosition = container.querySelector('.real-profileImg');
        if (post.post_image) {
          handleNoticeImage.applyNoticeImage(
            profileImgPosition,
            post.post_image,
          );
        } else {
          handleNoticeImage.setDefaultNoticeImage(profileImgPosition);
        }

        container.querySelector('.notice-from-title-input').value =
          post.post_title;
        container.querySelector('.notice-from-description-input').value =
          post.post_description;
        container.querySelector('.notice-from-content-input').value =
          post.post_content;
      }
    } catch (error) {
      console.error('공지사항을 불러오는 중 오류가 발생했습니다:', error);
      navigate(ADMIN_PATH.NOTICE);
    }
  };

  await loadPostData();
};

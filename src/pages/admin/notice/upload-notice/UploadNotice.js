import navigate from '../../../../utils/navigation';
import { ProfileImage } from '../../../../components/user/profile/ProfileImage';
import { Button, NoticeForm } from '../../../../components';
import { noticeAPI } from '../../../../../server/api/admin';
import { attachProfileImageEvents } from '../../../../components/admin/notice-profile/AttachProfileImageEvents';
import { ADMIN_PATH } from '../../../../utils/constants';
import { Modal } from '../../../../components';
import './UploadNotice.css';

export const RenderAdminUploadNotice = container => {
  const paragraphOne = 'Upload';
  const paragraphTwo = 'Notification';
  const paragraphThree = 'Thumbnail';
  const description = '공지 썸네일';
  const submitButton = Button({
    className: 'admin-notice-submit-button',
    text: '업로드하기',
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

        // 필수 입력값 검증
        if (!titleInput.value.trim()) {
          alert('제목을 입력해주세요.');
          return;
        }
        if (!descriptionInput.value.trim()) {
          alert('설명을 입력해주세요.');
          return;
        }
        if (!contentInput.value.trim()) {
          alert('내용을 입력해주세요.');
          return;
        }

        const newNotice = {
          post_title: titleInput.value,
          post_description: descriptionInput.value,
          post_content: contentInput.value,
          post_image: imageElement.getAttribute('data-image'),
        };

        const result = await noticeAPI.addNotice(newNotice);
        if (result.success) {
          await Modal('notice-upload-success');
          navigate(ADMIN_PATH.NOTICE);
        }
      } catch (error) {
        Modal('notice-upload-fail');
        console.error('업로드 오류:', error);
      }
    },
  });

  container.innerHTML = /*html */ `
    <h1 class="admin-notice-title">공지 업로드</h1>
    <div class="admin-notice-upload-container">
        <div class="admin-upload-form">
          <div class="admin-notice-upload-image">
              ${ProfileImage(paragraphOne, paragraphTwo, paragraphThree, description)}
          </div>
          <div class="admin-notice-upload-content">
            ${NoticeForm()}
          </div>                 
        </div>
        <div class="admin-notice-button-container">

        </div>      
    </div>
  `;
  attachProfileImageEvents(container);
  const buttonEl = document.querySelector('.admin-notice-button-container');
  console.log(buttonEl);
  buttonEl.append(submitButton);
};

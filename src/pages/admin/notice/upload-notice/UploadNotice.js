import './UploadNotice.css';
import { ProfileImage } from '../../../../components/user/profile/ProfileImage';
import {
  Button,
  NoticeForm,
  attachProfileImageEvents,
} from '../../../../components';

const paragraphOne = 'Upload';
const paragraphTwo = 'Notification';
const paragraphThree = 'Thumbnail';
const description = '공지 썸네일';

export const RenderAdminUploadNotice = container => {
  const submitButton = Button({
    className: 'admin-notice-submit-button',
    text: '업로드하기',
    color: 'skyblue-light',
    shape: 'block',
    onClick: () => console.log('업로드 기능 수행'),
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
  buttonEl.append(submitButton);
};

import { ApiClient } from '../../../../apis/ApiClient';
import {
  Button,
  NoticeForm,
  ProfileImage,
  attachProfileImageEvents,
} from '../../../../components';
import {
  applyProfileImage,
  listenForProfileImageUpdate,
} from '../../../../utils/handleProfileImg';
import './EditNotice.css';

export const RenderAdminEditNotice = async (container, noticeId) => {
  const NOTICE_DATA = '../../../../server/data/company_posts.json';

  const paragraphOne = 'Upload';
  const paragraphTwo = 'Notification';
  const paragraphThree = 'Thumbnail';
  const description = '공지 썸네일';

  const editButton = Button({
    className: 'admin-notice-submit-button',
    text: '수정하기',
    color: 'skyblue-light',
    shape: 'block',
    onClick: () => console.log('업로드 기능 수행'),
  });
  container.innerHTML = /*html */ `
    <h1>공지 업로드</h1>
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

  const handlePostData = async () => {
    try {
      const postData = await ApiClient.get(NOTICE_DATA);
      const filterData = postData.data.find(
        value => value.post_id === noticeId,
      );

      if (filterData) {
        const profileImgPosition = container.querySelector('.real-profileImg');
        applyProfileImage(profileImgPosition);
        listenForProfileImageUpdate(profileImgPosition);
        container.querySelector('.notice-from-title-input').value =
          filterData.post_title;
        container.querySelector('.notice-from-description-input').value =
          filterData.post_description;
        container.querySelector('.notice-from-content-input').value =
          filterData.post_content;
      }
    } catch (error) {
      console.log(error);
    }
  };
  await handlePostData();
};

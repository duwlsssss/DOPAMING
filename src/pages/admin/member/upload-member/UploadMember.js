import { adminFetchMemberUpload } from '../../../../../server/api/admin';
import {
  Button,
  EditProfileForm,
  ProfileImage,
  attachProfileImageEvents,
} from '../../../../components';
import './UploadMember.css';

export const RenderAdminUploadMember = async container => {
  const submitButton = Button({
    className: 'member-submit-button',
    text: '업로드하기',
    color: 'skyblue-light',
    shape: 'block',
    onClick: () => adminFetchMemberUpload(),
  });

  container.innerHTML = /*html*/ `
    <h1>직원 업로드</h1>  
      <div class="member-edit-form-container">
      <div class="member-edit-form">
        <div class="member-edit-profileImg">
          ${ProfileImage()}
        </div>
        <div class="member-edit-profile">
          ${EditProfileForm()}
        </div>
      </div>
      <div class="button-container">

      </div>
    </div>
  `;
  attachProfileImageEvents(container);
  const buttonEl = document.querySelector('.button-container');
  buttonEl.append(submitButton);
};

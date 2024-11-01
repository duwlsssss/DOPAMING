import { adminFetchMemberUpload } from '../../../../../server/api/admin';
import { Button, EditProfileForm, ProfileImage } from '../../../../components';
import { attachProfileImageEvents } from '../../../../components/admin/notice-profile/AttachProfileImageEvents';
import './UploadMember.css';

export const RenderAdminUploadMember = async container => {
  const submitButton = Button({
    className: 'member-submit-button',
    text: '업로드하기',
    color: 'skyblue-light',
    shape: 'block',
    onClick: async () => {
      const getValue = id => document.getElementById(id).value;
      const imageElement = document.querySelector('.real-profileImg');

      const adminMemberValue = {
        user_image: imageElement.getAttribute('data-image'),
        user_position: getValue('role') === 'student' ? '수강생' : '매니저',
        user_name: getValue('name'),
        user_sex: getValue('gender') === 'male' ? '남' : '여',
        user_birthday: getValue('birthDate'),
        user_phone: getValue('phone'),
        user_email: getValue('email'),
      };

      try {
        await adminFetchMemberUpload(adminMemberValue);
      } catch (error) {
        console.error('회원 업로드 실패:', error);
        alert('회원 업로드 실패: ' + error.message);
      }
    },
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

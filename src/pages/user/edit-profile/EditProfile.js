// 메인 렌더링 코드
import './EditProfile.css';
import {
  ProfileImage,
  attachProfileImageEvents,
} from '../../../../src/components/user/profile/ProfileImage';
import {
  EditProfileForm,
  attachEditProfileFormEvents,
} from '../../../../src/components/user/form/edit-profile-form/EditProfileForm';

export const RenderUserEditProfile = container => {
  container.innerHTML = `
    <div class="box-title">
      <div class="edit-title">내 정보 수정</div>
    </div>
    <div class="edit-box">
      <div class="profile-and-form">
        ${ProfileImage()}
        ${EditProfileForm()}
      </div>
    </div>
    <div class="button-space">
      <div class="button-wrapper"> 
        <button class="submit-button">수정하기</button>
      </div>
    </div>
  `;

  // EditProfileForm 이벤트 리스너 추가
  attachEditProfileFormEvents(container);

  // ProfileImage 이벤트 리스너 추가
  const profileImageContainer = container.querySelector('.profile-panel'); // ProfileImage의 부모 요소 선택
  if (profileImageContainer) {
    attachProfileImageEvents(profileImageContainer);
  }
};

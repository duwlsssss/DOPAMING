import './EditProfile.css';

import { ProfileImage } from '../../../../src/components/user/profile/ProfileImage';
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
    <button color="transparent" shape="line">사진 선택하기</button>
      </div>
    </div>
  `;

  // 이벤트 리스너 추가
  attachEditProfileFormEvents(container);
};

import './EditProfile.css';
import {
  ProfileImage,
  attachProfileImageEvents,
} from '../../../../src/components/user/profile/ProfileImage';
import {
  EditProfileForm,
  attachEditProfileFormEvents,
} from '../../../../src/components/user/form/edit-profile-form/EditProfileForm';
import axios from 'axios';

export const RenderUserEditProfile = async (container, jsonFilePath) => {
  // 기본 HTML 구조 설정
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

  // 사용자 데이터 가져오기
  await fetchUserData(container, jsonFilePath);

  // EditProfileForm 이벤트 리스너 추가
  attachEditProfileFormEvents(container);

  // ProfileImage 이벤트 리스너 추가
  const profileImageContainer = container.querySelector('.profile-panel'); // ProfileImage의 부모 요소 선택
  if (profileImageContainer) {
    attachProfileImageEvents(profileImageContainer);
  }
};

const fetchUserData = async (container, jsonFilePath) => {
  try {
    const response = await axios.get(jsonFilePath); // JSON 파일에서 데이터 가져오기
    const users = response.data; // 응답 데이터

    // 첫 번째 사용자 정보 가져오기
    if (users.length > 0) {
      const user = users[0]; // 첫 번째 사용자 정보

      // 사용자 정보를 폼 필드에 채우기
      container.querySelector('#role').value = user.user_position || '';
      container.querySelector('#name').value = user.user_name || '';
      container.querySelector('#gender').value =
        user.user_sex === '남' ? 'male' : 'female';
      container.querySelector('#birthDate').value = user.user_birthday || '';
      container.querySelector('#phone').value = user.user_phone || '';
      container.querySelector('#email').value = user.user_email || '';
      // 비밀번호는 보안상의 이유로 채우지 않음
    }
  } catch (error) {
    console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
  }
};

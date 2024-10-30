import { fetchUserData, updateUserData } from '../../../../server/api/user'; // fetchUserData와 updateUserData 가져오기
import { getItem } from '../../../utils/storage';
import {
  Button,
  EditProfileForm,
  ProfileImage,
  attachProfileImageEvents,
} from '../../../components';
import {
  applyProfileImage,
  listenForProfileImageUpdate,
} from '../../../utils/handleProfileImg';

export const RenderUserEditProfile = async container => {
  // 기본 HTML 구조 설정
  container.innerHTML = `
    <div class="user-edit-title">내 정보 수정</div>
    <div class="user-edit-form-container">
      <div class="user-edit-form">
        <div class="user-edit-profileImg">
          ${ProfileImage()}
        </div>
        <div class="user-edit-profile">
          ${EditProfileForm()}
        </div>
      </div>
    </div>
  `;

  // 사용자 데이터 가져오기
  const userId = getItem('userID'); // 저장된 사용자 ID 가져오기
  const currUser = await fetchUserData(userId); // Firebase에서 사용자 데이터 가져오기

  if (currUser) {
    const profileImgPosition = container.querySelector('.real-profileImg');

    if (currUser.user_image) {
      const img = new Image();
      img.src = currUser.user_image;

      // 이미지가 성공적으로 로드되었을 때
      img.onload = () => {
        profileImgPosition.style.backgroundImage = `url(${currUser.user_image})`; // 배경 이미지 설정
      };

      // 이미지 로드 실패 시
      img.onerror = () => {
        console.error('이미지를 로드할 수 없습니다: ', currUser.user_image);
        profileImgPosition.style.backgroundImage = `url('/path/to/default-image.png')`; // 기본 이미지 경로
      };
    }

    applyProfileImage(profileImgPosition);
    listenForProfileImageUpdate(profileImgPosition);

    // 사용자 정보 입력 필드에 값 설정
    container.querySelector('#role').value =
      currUser.user_position === '매니저' ? 'manager' : 'student';
    container.querySelector('#name').value = currUser.user_name ?? '';
    container.querySelector('#gender').value =
      currUser.user_sex === '남' ? 'male' : 'female';
    container.querySelector('#birthDate').value = currUser.user_birthday ?? '';
    container.querySelector('#phone').value = currUser.user_phone ?? '';
    container.querySelector('#email').value = currUser.user_email ?? '';
  }

  // 버튼 추가
  const buttonPosition = container.querySelector('.user-edit-form-container');
  if (buttonPosition) {
    const submitBtn = Button({
      className: 'edit-submit-btn',
      text: '수정하기',
      color: 'skyblue',
      shape: 'block',
      padding: 'var(--space-medium)',
      fontWeight: 700,
      onClick: async e => {
        e.preventDefault();
        // 프로필 이미지 업데이트 및 사용자 정보 저장
        await updateUserData(container, userId); // 컨테이너와 사용자 ID 전달
      },
    });
    buttonPosition.append(submitBtn);
  }

  // ProfileImage 이벤트 리스너 추가
  attachProfileImageEvents(container);

  // 비밀번호 눈 아이콘 토글
  function togglePasswordVisibility(passwordField, visibilityIcon) {
    visibilityIcon.addEventListener('click', function () {
      const isPassword = this.textContent === 'visibility_off';
      passwordField.setAttribute('type', isPassword ? 'text' : 'password');
      this.textContent = isPassword ? 'visibility' : 'visibility_off';
    });
  }

  const passwordField = container.querySelector('#password');
  const passwordConfirmField = container.querySelector('#confirm-password');

  const visibilityIconPassword = container.querySelector('#toggle-password');
  const visibilityIconPasswordConfirm = container.querySelector(
    '#toggle-confirm-password',
  );

  togglePasswordVisibility(passwordField, visibilityIconPassword);
  togglePasswordVisibility(passwordConfirmField, visibilityIconPasswordConfirm);
};

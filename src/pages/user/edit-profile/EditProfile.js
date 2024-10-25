import './EditProfile.css';
import { getItem } from '../../../utils/storage';
import {
  Button,
  validInput,
  EditProfileForm,
  ProfileImage,
  attachProfileImageEvents,
} from '../../../components';
import {
  applyProfileImage,
  listenForProfileImageUpdate,
} from '../../../utils/handleProfileImg';
import axios from 'axios';
import Modal from '../../../components/ui/modal/Modal';

// validInput에 넘길 비번
let userPassword = '';

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
  await fetchUserData(container);

  // 모달 인스턴스 생성
  const modal = new Modal();

  // 버튼 추가
  const buttonPosition = container.querySelector('.user-edit-form-container');
  const submitBtn = Button({
    className: 'edit-submit-btn',
    text: '수정하기',
    color: 'skyblue',
    shape: 'block',
    padding: 'var(--space-medium)',
    fontWeight: 700,
    onClick: e => {
      e.preventDefault();
      if (validInput(userPassword)) {
        // 모달 열기
        modal.open('edit-profile-success');
      } else {
        alert('입력이 유효하지 않습니다.');
      }
    },
  });
  buttonPosition.append(submitBtn);

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

const fetchUserData = async container => {
  try {
    const response = await axios.get('../../server/data/users.json');
    const users = response.data;

    const userId = getItem('userID');
    const currUser = users.find(user => user.user_id === userId);

    if (currUser) {
      const profileImgPosition = container.querySelector('.real-profileImg');
      applyProfileImage(profileImgPosition);
      listenForProfileImageUpdate(profileImgPosition);

      container.querySelector('#role').value =
        currUser.user_position === '매니저' ? 'manager' : 'student';
      container.querySelector('#name').value = currUser.user_name ?? '';
      container.querySelector('#gender').value =
        currUser.user_sex === '남' ? 'male' : 'female';
      container.querySelector('#birthDate').value =
        currUser.user_birthday ?? '';
      container.querySelector('#phone').value = currUser.user_phone ?? '';
      container.querySelector('#email').value = currUser.user_email ?? '';

      userPassword = currUser.user_password;
    }
  } catch (error) {
    console.error('사용자 데이터를 가져오는 중 오류 발생 ! :', error);
  }
};

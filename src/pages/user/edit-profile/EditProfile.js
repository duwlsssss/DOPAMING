import './EditProfile.css';
import {
  ProfileImage,
  attachProfileImageEvents,
} from '../../../../src/components/user/profile/ProfileImage';
import {
  EditProfileForm,
  attachEditProfileFormEvents,
} from '../../../../src/components/user/form/edit-profile-form/EditProfileForm';
import { getItem } from '../../../utils/storage';
import { Button } from '../../../components';
import axios from 'axios';

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

  // EditProfileForm 이벤트 리스너 추가
  attachEditProfileFormEvents(container);

  // ProfileImage 이벤트 리스너 추가
  attachProfileImageEvents(container);

  // 버튼 추가
  const buttonPosition = container.querySelector('.user-edit-form');
  const submitBtn = Button({
    className: 'img-upload-btn',
    text: '수정하기',
    color: 'skyblue',
    shape: 'block',
    padding: 'var(--space-small)',
    onClick: e => {
      e.preventDefault();
    },
  });
  buttonPosition.append(submitBtn);

  // <button class="submit-button">수정하기</button>
};

const fetchUserData = async container => {
  try {
    const response = await axios.get('../../server/data/users.json'); // JSON 파일에서 데이터 가져오기
    const users = response.data; // 응답 데이터

    // userId로 사용자 정보 가져오기
    const userId = getItem('userID');
    const currUser = users.find(user => user.user_id === userId);

    if (currUser) {
      // 사용자 이미지 채우기
      const profileImg = container.querySelector('.real-profileImg');
      profileImg.style.backgroundImage = `url(${currUser.user_image})`;
      // 사용자 정보를 폼 필드에 채우기
      container.querySelector('#role').value =
        currUser.user_position === '매니저' ? 'manager' : 'student';
      container.querySelector('#name').value = currUser.user_name ?? '';
      container.querySelector('#gender').value =
        currUser.user_sex === '남' ? 'male' : 'female';
      container.querySelector('#birthDate').value =
        currUser.user_birthday ?? '';
      container.querySelector('#phone').value = currUser.user_phone ?? '';
      container.querySelector('#email').value = currUser.user_email ?? '';
      // 비밀번호는 보안상의 이유로 채우지 않음
    }
  } catch (error) {
    console.error('사용자 데이터를 가져오는 중 오류 발생 ! :', error);
  }
};

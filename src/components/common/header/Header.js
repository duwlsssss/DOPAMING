import Router from '../../../routes/Router';
import './Header.css';
import { Button } from '../../ui/button/Button';
import { getItem, clearStorage } from '../../../utils/storage';
import {
  applyProfileImage,
  listenForProfileImageUpdate,
} from '../../../utils/handleProfileImg';
import axios from 'axios';

export async function RenderHeader(header, editProfilePath) {
  try {
    if (!header) {
      console.error('header element is not found');
      return;
    }

    // userId로 사용자 정보 가져오기
    const isAdmin = getItem('userRole') === 'admin' ? true : false;
    let userName;
    if (!isAdmin) {
      const usersResponse = await axios.get('../../server/data/users.json');
      const users = usersResponse.data;
      userName = users.find(
        user => user.user_id === getItem('userID'),
      ).user_name;
    }

    header.innerHTML = `
      <div class="header-items">
        <div class="user-name"> ${isAdmin ? '관리자' : userName}</div>
      </div>
      <figure class="profile-circle" style="cursor: ${isAdmin ? 'default' : 'pointer'}">
        ${isAdmin ? '' : `<a href="${editProfilePath}" class="hidden-link">.</a>`}
      </figure>
      <div class="header-mobile">DOPAMING</div>
    `;

    const logoutBtn = Button({
      className: 'logout-btn',
      text: '로그아웃',
      color: 'white',
      shape: 'line',
      onClick: () => {
        clearStorage(); // 로그아웃 누르면 로컬 스토리지 정리
        Router();
      },
    });
    const headerItem = header.querySelector('.header-items');
    headerItem.append(logoutBtn);

    const profileImgPosition = header.querySelector('.profile-circle');
    if (isAdmin) {
      profileImgPosition.style.backgroundImage = `url(/assets/imgs/profile/profile_null.jpg)`; // 관리자는 프로필 고정
    } else {
      // 처음에 프로필 사진 적용
      applyProfileImage(profileImgPosition);
      // 업데이트 반영
      listenForProfileImageUpdate(profileImgPosition);
    }
  } catch (e) {
    console.error('사용자 데이터를 가져오는 중 오류 발생 ! :', e);
  }
}

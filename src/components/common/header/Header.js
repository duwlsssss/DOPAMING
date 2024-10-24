import Router from '../../../routes/Router';
import './Header.css';
import { Button } from '../../ui/button/Button';
import { clearStorage } from '../../../utils/storage';
import { getItem } from '../../../utils/storage';
import axios from 'axios';

export async function RenderHeader(header, isUser, editProfilePath = '') {
  try {
    if (!header) {
      console.error('header element is not found');
      return;
    }

    const logoutBtn = Button({
      text: '로그아웃',
      color: 'white',
      shape: 'line',
      onClick: () => {
        clearStorage(); // 로그아웃 누르면 로컬 스토리지 정리
        Router();
      },
    });
    header.innerHTML = `
      <div class="header-items">
        <div class="user-name">김아무</div>
      </div>
      <figure class="profile-circle" style="cursor: ${isUser ? 'pointer' : 'default'}">
        ${isUser ? `<a href="${editProfilePath}" class="hidden-link">.</a>` : ''}
      </figure>
      <div class="header-mobile">DOPAMING</div>
    `;

    const headerItem = header.querySelector('.header-items');
    headerItem.append(logoutBtn);

    const response = await axios.get('../../server/data/users.json');
    const users = response.data; // 응답 데이터

    // userId로 사용자 정보 가져오기
    const isAdmin = getItem('userRole') === 'admin' ? true : false;
    const userId = getItem('userID');
    const currUser = users.find(user => user.user_id === userId);

    const profileImg = header.querySelector('.profile-circle');

    if (isAdmin) {
      profileImg.style.backgroundImage = `url(/assets/imgs/profile/profile_null.jpg)`;
    } else {
      profileImg.style.backgroundImage = `url(${currUser.user_image})`;
    }
  } catch (e) {
    console.error('사용자 데이터를 가져오는 중 오류 발생 ! :', e);
  }
}

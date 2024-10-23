import Router from '../../../routes/Router';
import './Header.css';
import { clearStorage } from '../../../utils/storage';

export function RenderHeader(header, isUser, editProfilePath = '') {
  if (!header) {
    console.error('header element is not found');
    return;
  }

  header.innerHTML = `
    <div class="header-items">
      <div class="user-name">김아무</div>
        <button color="white" shape="line" class="logoutBtn">로그아웃</button>
    </div>
    <figure class="profile-circle" style="cursor: ${isUser ? 'pointer' : 'default'}">
      ${isUser ? `<a href="${editProfilePath}" class="hidden-link">.</a>` : ''}
    </figure>
    <div class="header-mobile">DOPAMING</div>
  `;

  document.querySelector('.logoutBtn').addEventListener('click', () => {
    clearStorage(); // 로그아웃 누르면 로컬 스토리지 정리
    Router();
  });
}

import Router from '../../../routes/Router';
import './Header.css';
import { Button } from '../../ui/button/Button';
import { clearStorage } from '../../../utils/storage';

export function RenderHeader(header, isUser, editProfilePath = '') {
  if (!header) {
    console.error('header element is not found');
    return;
  }

  const logoutBtn = Button({
    text: '로그아웃',
    color: 'white',
    shape: 'line',
    width: '70',
    height: '30',
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
}

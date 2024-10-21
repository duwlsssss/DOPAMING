import { ADMIN_PATH, USER_PATH, USER_TITLE } from '../../utils/constants';
import './Navbar.css';

const userMenus = [
  {
    path: USER_PATH.HOME,
    title: USER_TITLE.HOME,
  },
  { path: USER_PATH.MEMBER, title: USER_TITLE.MEMBER },
  { path: USER_PATH.VACATION, title: USER_TITLE.VACATION },
  { path: USER_PATH.ANNOUNCEMENTS, title: USER_TITLE.ANNOUNCEMENTS },
  { path: USER_PATH.STUDENT, title: USER_TITLE.STUDENT },
  { path: USER_PATH.EDUCATION, title: USER_TITLE.EDUCATION },
];
export default class Navbar {
  constructor(getUser) {
    const NAV_ELEMENT = document.querySelector('nav');
    this.$nav = NAV_ELEMENT;
    this.getUser = getUser;
    this.userMenu = userMenus;
    this.path = window.location.pathname;
    this.render();
    this.addActiveMenuClass();
  }

  isActiveMenu(path) {
    if (path === USER_PATH.HOME) {
      return true;
    }
    if (path === USER_PATH.HOME) {
      return false;
    }

    //return this._active.startsWith(path);
  }

  addActiveMenuClass() {
    const links = this.$nav.querySelectorAll('.menu-link'); // 모든 a 태그 선택
    // 각 링크에 클릭 이벤트 리스너 추가
    links.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault(); // 기본 페이지 이동 방지

        // 모든 링크에서 active 클래스 제거
        links.forEach(l => l.classList.remove('active'));

        // 클릭한 링크에 active 클래스 추가
        event.currentTarget.classList.add('active');

        // 페이지 이동 처리 (원하는 방식으로 적용)
        window.location.href = event.currentTarget.getAttribute('href');
      });
    });

    // 현재 페이지의 URL을 기준으로 active 클래스 추가
    const currentPath = window.location.pathname;
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  }
  render() {
    //admin
    if (this.getUser) {
      this.$nav.innerHTML = `
      <div class="menu-top">
        <div class="logo-circle"></div>      
        <h1>DOPAMING</h1>
      </div>
      <ul class="menu">        
        <li class="menu-item">
          <a href="${ADMIN_PATH.HOME}" class="menu-link">
              <span class="material-symbols-outlined">
                home
              </span>홈          
          </a>
        </li>
        <li class="menu-item">
          <a href="${ADMIN_PATH.MEMBER}" class="menu-link">
            <span class="material-symbols-outlined">
              account_circle
            </span>직원 관리
          </a>
        </li>
        <li class="menu-item">
          <a href="${ADMIN_PATH.VACATION}" class="menu-link">
            <span class="material-symbols-outlined">
              event_note
            </span>휴가/공가 관리
          </a>
        </li>
        <li class="menu-item">
          <a href="${ADMIN_PATH.ANNOUNCEMENTS}" class="menu-link">
            <span class="material-symbols-outlined">
              post
            </span>공지 관리</li>       
          </a>
      </ul>
      `;
    } else {
      const menuItemsHTML = this.userMenu
        .map(menu => {
          return `
          <ul class="menu">      
          <li class="menu-item">
            <a href="${menu.path}">
                <span class="material-symbols-outlined">
                  ${menu.title}
                </span>         
            </a>
          </li>         
        </ul>`;
        })
        .join('');
      this.$nav.innerHTML = `
      <div class="menu-top">
        <div class="logo-circle"></div>      
        <h1>DOPAMING</h1>
      </div>
      <ul class="menu">
        ${menuItemsHTML}
      </ul>
    `;
    }
  }
}

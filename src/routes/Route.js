import MembersPage from '../pages/membes/Member.js';
import { USER_TITLE, ADMIN_PATH, USER_PATH } from '../utils/constants.js';
import { getItem } from '../utils/storage.js';
import Layout from '../components/layouts/Layout.js'; // Layout 클래스 import
import HomePage from '../pages/home/Home.js';
import { matchRoute } from './matchRoute.js';
import NotFound from '../pages/notfound/NotFound.js';

export default class Route {
  constructor() {
    this.title = 'CubeIT ';
    this.currentPage = null;
    this.layout = new Layout(); // Layout 클래스 인스턴스 생성
    this.isLoggedIn = getItem('admin');
    this.setRoutes();
  }

  setRoutes() {
    this.routes = {
      [ADMIN_PATH.HOME]: { title: USER_TITLE.HOME, page: new HomePage() },
      [ADMIN_PATH.MEMBER]: {
        title: USER_TITLE.MEMBERS,
        page: new MembersPage(),
      },
    };
  }

  handleNavigatePage = event => {
    event.preventDefault();

    const anchor = event.target.closest('a');

    if (anchor && anchor.href) {
      window.history.pushState(null, null, anchor.href);
      this.route();
    }
  };

  route() {
    const path = window.location.pathname;
    console.log(path);
    // 페이지 접근 제어
    //원본 코드 if (!this.isLoggedIn) {
    if (this.isLoggedIn) {
      if (path !== USER_PATH.MEMBER) {
        window.history.pushState(null, null, USER_PATH.MEMBER);

        // active 클래스 추가
        const memberLink = this.$nav.querySelector(
          '.menu-link[href="' + USER_PATH.MEMBER + '"]',
        );
        if (memberLink) {
          memberLink.classList.add('active');
          console.log(memberLink.classList); // 현재 클래스 목록 출력- 추가
        }
        this.layout.setContent(this.rozutes[USER_PATH.MEMBER].page); // Member 페이지 렌더링
      }
    }
    const matchedRoute = matchRoute(path, this.routes);
    console.log(matchRoute);
    if (this.currentPage && this.currentPage.cleanUp) {
      this.currentPage.cleanUp();
    }

    if (matchedRoute && matchedRoute.page) {
      this.currentPage = matchedRoute.page;
      document.title = this.title + matchedRoute.title;
      this.currentPage.render();
    } else {
      this.NotFound.render();
    }

    // this.activeNavBar();
  }

  init() {
    window.addEventListener('popstate', () => this.route());
    document.body.addEventListener('click', this.handleNavigatePage);
    this.notFoundPage = new NotFound();

    this.route();
  }
}

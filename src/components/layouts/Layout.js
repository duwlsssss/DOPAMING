import Container from '../../Container';
import Header from '../headers/Header';
import Navbar from '../nav-bars/Navbar';

export default class Layout extends Container {
  constructor(getUserRole) {
    super('#root');
    this.getUser = getUserRole;
    this.contentContainer = document.getElementsByClassName('.content');

    this.render(); // 헤더와 네비게이션 바를 렌더링
  }
  renderHeader() {
    this.Header = new Header();
    this.Header.render();
  }

  renderNavbar() {
    this.NavBar = new Navbar();
    this.NavBar.render();
  }
  render() {
    this.$container.innerHTML = `
      <header class="header-container desktop-only"></header>
      <div class="main-container">
        <nav class="navbar"></nav>
        <main class="content"></main>
      </div>
    `;
    this.renderHeader();
    this.renderNavbar();
    this.updateActiveNavLink(window.location.pathname);
  }
  setContent(component) {
    this.contentContainer.innerHTML = '';
    component.render(this.contentContainer);
  }

  updateActiveNavLink(path) {
    this.NavBar.updateActiveLink(path);
  }
}

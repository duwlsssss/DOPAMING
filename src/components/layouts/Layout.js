import Header from '../headers/Header';
import Navbar from '../navbars/Navbar';

export default class Layout {
  constructor(getUserRole) {
    this.header = new Header();
    this.navBar = new Navbar();
    this.getUser = getUserRole;
    this.render(); // 헤더와 네비게이션 바를 렌더링
  }

  render() {
    const headerElement = document.getElementsByClassName('.header');
    const navbarElement = document.getElementsByClassName('.navbar');
    const contentContainer = document.getElementById('content');

    headerElement.innerHTML = ''; // 기존 헤더 내용 초기화
    navbarElement.innerHTML = ''; // 기존 네비게이션 바 내용 초기화
    contentContainer.innerHTML = ''; // 기존 내용 초기화

    this.header.render(); // 헤더 렌더링
    this.navBar.render(); // 네비게이션 바 렌더링
  }

  setContent(component) {
    const contentContainer = document.getElementById('content');
    contentContainer.innerHTML = ''; // 기존 내용을 초기화
    component.render(); // 새로운 내용을 렌더링
    contentContainer.appendChild(component.getElement()); // 컴포넌트를 추가
  }
}

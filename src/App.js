import Router from './routes/Router';
import './styles/global.css';

const navigate = event => {
  const anchor = event.target.closest('a');

  if (anchor?.href) {
    event.preventDefault();

    const newPath = new URL(anchor.href).pathname;

    // newPath가 현재 경로와 다를 때만 history.pushState와 Router를 호출
    if (newPath !== window.location.pathname) {
      history.pushState(null, null, newPath);
      Router(newPath);
    }
  }
};

function App() {
  window.addEventListener('popstate', () => Router(window.location.pathname)); //뒤로 가기 또는 앞으로 가기 버튼을 눌렀을 때 페이지를 렌더링함
  document.body.addEventListener('click', navigate); //navBar의 링크를 클릭할 때 이동 처리
  Router(); // 초기 로드 시 렌더링
}

document.addEventListener('DOMContentLoaded', App);

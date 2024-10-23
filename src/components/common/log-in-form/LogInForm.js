import { ADMIN_PATH, USER_PATH } from '../../../utils/constants';
import { setItem } from '../../../utils/storage';
import './LogInForm.css';

export const RenderLogInForm = (container, users) => {
  container.innerHTML = `
    <main class="login-container">
      <h2>도파밍 부트캠프에 오신 것을 환영합니다!</h2>
      <form id="loginForm" class="login-form">
        <fieldset class="input-group">
          <label for="email">이메일</label>
          <input type="email" id="email" placeholder="이메일을 입력해주세요." required>
        </fieldset>
        <fieldset class="input-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력해주세요." required>
        </fieldset>
        <button type="submit" class="login-btn">로그인</button>
        <nav class="forgot-password">
          <a href="#">회원가입이 되어 있지 않으신가요?</a>
        </nav>
      </form>
    </main>
  `;

  // 로그인 폼 이벤트 리스너
  const loginForm = container.querySelector('#loginForm');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // 이메일과 비밀번호가 일치하는 사용자를 찾음
    const user = users.find(
      user => user.user_email === email && user.user_password === password,
    );

    // 일치하는 사용자가 있을 경우
    if (user) {
      const userRole = user.user_type ? 'admin' : 'user';
      setItem('userRole', userRole);
      setItem('userID', user.user_id); // 유저 아이디 저장
      setItem('userBCName', user.user_bootcamp); // 부트캠프 이름 저장

      const redirectPath =
        user.role === 'admin' ? ADMIN_PATH.HOME : USER_PATH.HOME;
      window.location.replace(redirectPath); // 브라우저 히스토리에 저장하지 않음
    } else {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  });
};

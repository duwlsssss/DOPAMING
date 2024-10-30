import './LogInForm.css';
import { userLogin } from '../../../../server/api/user';
export const RenderLogInForm = container => {
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
    // user.js에서 로그인 관련 API호출
    userLogin(email, password);
  });
};

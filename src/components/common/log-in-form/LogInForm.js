import { ADMIN_PATH, USER_PATH } from '../../../utils/constants';
import { setItem } from '../../../utils/storage';
import './LogInForm.css';

export const RenderLogInForm = container => {
  const logInFormHTML = `
      <div class="login-container">
        <h2>도파밍 부트캠프에 오신 것을 환영합니다!</h2>
        <form id="loginForm" class="login-form">
          <div class="input-group">
            <label for="email">이메일</label>
            <input type="email" id="email" placeholder="이메일을 입력해주세요." required>
          </div>
          <div class="input-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" placeholder="비밀번호를 입력해주세요." required>
          </div>
          <button type="submit" class="login-btn">로그인</button>
          <div class="forgot-password">
            <a href="#">회원가입이 되어 있지 않으신가요?</a>
          </div>
        </form>
      </div>
    `;

  container.innerHTML = logInFormHTML;

  // 임시 사용자 데이터
  const users = [
    {
      email: 'admin@admin.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      email: 'user@user.com',
      password: 'user123',
      role: 'user',
    },
  ];

  // 로그인 폼 이벤트 리스너
  const loginForm = container.querySelector('#loginForm');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const user = users.find(
      user => user.email === email && user.password === password,
    );

    if (user) {
      setItem('userRole', user.role);

      const redirectPath =
        user.role === 'admin' ? ADMIN_PATH.HOME : USER_PATH.HOME;
      window.location.replace(redirectPath); // 브라우저 히스토리에 저장하지 않음.
    } else {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  });
};

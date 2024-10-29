import { ADMIN_PATH, USER_PATH } from '../../../utils/constants';
import { setItem } from '../../../utils/storage';
import './LogInForm.css';
import { Button } from '../../ui/button/Button';
import { validateLoginInput } from '../../../utils/validation';

export const RenderLogInForm = (container, users) => {
  container.innerHTML = `
    <main class="login-container">
      <h2>도파밍 부트캠프에 오신 것을 환영합니다!</h2>
      <form id="loginForm" class="login-form">
        <fieldset class="input-group">
          <label for="email">이메일</label>
          <input 
            type="email" 
            id="email" 
            placeholder="이메일을 입력해주세요." 
          >
          <p class="error-message" id="emailError"></p>
        </fieldset>
        <fieldset class="input-group">
          <label for="password">비밀번호</label>
          <div class="input-wrapper">
            <input 
              type="password" 
              id="password" 
              placeholder="비밀번호를 입력해주세요." 
            >
            <span class="material-symbols-rounded" id="toggle-password">visibility_off</span>
          </div>
          <p class="error-message" id="passwordError"></p>
        </fieldset>
        <div class="login-btn-container" id="loginBtnContainer"></div>
        <nav class="forgot-password">
          <a href=#>회원가입이 되어 있지 않으신가요?</a>
        </nav>
      </form>
    </main>
  `;

  // 비밀번호 눈 아이콘 토글
  const visibilityIcon = container.querySelector('#toggle-password');
  const passwordField = container.querySelector('#password');
  visibilityIcon.addEventListener('click', function () {
    const isPassword = this.textContent === 'visibility_off';
    passwordField.setAttribute('type', isPassword ? 'text' : 'password');
    this.textContent = isPassword ? 'visibility' : 'visibility_off';
  });

  // 로그인 버튼 추가
  const loginButton = new Button({
    className: 'login-btn',
    type: 'submit',
    text: '로그인',
    color: 'skyblue',
    shape: 'block',
    fontSize: 'var(--font-small)',
    padding: 'var(--space-medium) 0',
    disabled: true,
    onClick: e => {
      e.preventDefault();

      const email = container.querySelector('#email').value;
      const password = container.querySelector('#password').value;

      const user = users.find(
        user => user.user_email === email && user.user_password === password,
      );

      if (user) {
        const userRole = user.user_type ? 'admin' : 'user';
        setItem('userRole', userRole);
        setItem('userID', user.user_id);

        const redirectPath =
          userRole === 'admin' ? ADMIN_PATH.HOME : USER_PATH.HOME;
        window.location.replace(redirectPath);
      } else {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    },
  });

  const loginBtnPosition = container.querySelector('#loginBtnContainer');
  loginBtnPosition.append(loginButton);

  // 유효성 검사 후 버튼 활성화/비활성화 제어하는 함수
  const toggleLoginButtonState = () => {
    const email = container.querySelector('#email').value;
    const password = container.querySelector('#password').value;
    const isValid = validateLoginInput(container, email, password);

    loginButton.disabled = !isValid; // 버튼 활성화/비활성화
    loginButton.style.backgroundColor = isValid
      ? 'var(--color-skyblue)'
      : 'var(--color-regular-gray)';
    loginButton.style.cursor = isValid ? 'pointer' : 'not-allowed'; // 커서 변경
  };

  // 입력 필드의 변화에 따라 유효성 검사 수행
  container
    .querySelector('#email')
    .addEventListener('input', toggleLoginButtonState);
  container
    .querySelector('#password')
    .addEventListener('input', toggleLoginButtonState);
};

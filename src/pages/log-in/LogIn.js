import { RenderLogInForm } from '../../components';
import loginImage from '/assets/imgs/auth/login_page_test.png';
import './LogIn.css';

export const RenderLogIn = async container => {
  try {
    container.innerHTML = `
    <main class="login-page">
      <aside class="login-left">
        <img src="${loginImage}" alt="login" />
      </aside>
      <article class="login-right">
        <div class="login-form-container"></div>
      </article>
    </main>
  `;

    const formContainer = container.querySelector('.login-form-container');
    RenderLogInForm(formContainer);
  } catch (e) {
    console.error('로그인 페이지에서 users 가져오다 에러 발생:', e);
  }
};

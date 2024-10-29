import { RenderLogInForm } from '../../components/common/log-in-form/LogInForm';
import loginImage from '/assets/imgs/auth/login_page.png';
import './LogIn.css';

export const RenderLogIn = async container => {
  try {
    const loginHTML = `
    <main class="login-page">
      <section class="login-box">
        <aside class="login-left">
          <img src="${loginImage}" alt="login" />
        </aside>
        <article class="login-right">
          <div class="login-form-container"></div>
        </article>
      </section>
    </main>
  `;
    container.innerHTML = loginHTML;
    const formContainer = container.querySelector('.login-form-container');
    RenderLogInForm(formContainer);
  } catch (e) {
    console.error('로그린 페이지에서 users 가져오다 에러 발생:', e);
  }
};

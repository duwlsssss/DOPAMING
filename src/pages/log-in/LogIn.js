import { RenderLogInForm } from '../../components/common/log-in-form/LogInForm';
import loginImage from '../../assets/auth/login_page.png';
import './LogIn.css';

export const RenderLogIn = container => {
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
};

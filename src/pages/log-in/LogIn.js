import { RenderLogInForm } from '../../components/common/log-in-form/LogInForm';
import loginImage from '../../assets/auth/login_page.png';
import './LogIn.css';

export const RenderLogIn = container => {
  const loginHTML = `
    <div class="login-page">
      <div class="login-box">
        <div class="login-left">
          <img src="${loginImage}" alt="login" />
        </div>
        <div class="login-right">
          <div class="login-form-container"></div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = loginHTML;

  const formContainer = container.querySelector('.login-form-container');
  RenderLogInForm(formContainer);
};

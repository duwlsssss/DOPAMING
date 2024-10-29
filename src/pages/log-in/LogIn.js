import axios from 'axios';
import { RenderLogInForm } from '../../components';
import loginImage from '/assets/imgs/auth/login_page.png';
import './LogIn.css';

export const RenderLogIn = async container => {
  try {
    container.innerHTML = `
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

    // users.json 정보 가져옴
    const response = await axios.get('../../../server/data/users.json');
    const users = response.data;

    const formContainer = container.querySelector('.login-form-container');
    RenderLogInForm(formContainer, users);
  } catch (e) {
    console.error('로그인 페이지에서 users 가져오다 에러 발생:', e);
  }
};

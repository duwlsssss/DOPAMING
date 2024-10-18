import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import firebaseConfig from './firebaseConfig.js'; //파이어베이스 SDK 호출

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 로그인 폼 제출 이벤트
document
  .getElementById('signin-form')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // 기본 제출 방지

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Firebase 인증을 통한 로그인
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // 로그인 성공
        const user = userCredential.user;
        console.log('로그인 성공:', user);
        document.getElementById('error-message').innerText = ''; // 오류 메시지 초기화

        // 사용자 정보를 세션 스토리지에 저장 (예시)
        sessionStorage.setItem('userId', user.uid); // 사용자 ID 저장

        // 로그인 후 리다이렉션 (예: 메인 페이지)
        window.location.href = '../html/main.html'; // 메인 페이지로 이동
      })
      .catch(error => {
        const errorMessage = error.message;
        console.error('로그인 중 오류 발생:', errorMessage);
      });
  });

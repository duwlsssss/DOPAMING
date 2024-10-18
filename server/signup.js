import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';
import firebaseConfig from './firebaseConfig.js'; //파이어베이스 SDK 호출

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// 회원가입
function registerUser(email, password, username, profilePicture) {
  // 유효성 검증
  if (password.length < 6) {
    document.getElementById('error-message').innerText =
      '비밀번호는 6자리 이상이어야 합니다.';
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      const userId = user.uid;

      // 프로필 사진 저장
      const defaultImageUrl =
        'https://firebasestorage.googleapis.com/v0/b/toy-project1-team2.appspot.com/o/profile.png?alt=media&token=1c32dd51-55a1-4ef9-9af7-5c3b83427cf5'; // 기본 이미지 URL
      let imageUrl = defaultImageUrl; // 기본 이미지로 초기화

      if (profilePicture) {
        const storageReference = storageRef(
          storage,
          'profile/' + userId + '.png',
        );
        uploadBytes(storageReference, profilePicture).then(snapshot => {
          console.log('사진 업로드 완료:', snapshot);
          imageUrl = snapshot.metadata.fullPath; // 업로드된 이미지의 경로 저장
          saveUserData(userId, username, email, imageUrl); // 사용자 데이터 저장
        });
      } else {
        saveUserData(userId, username, email, imageUrl); // 기본 이미지 URL로 사용자 데이터 저장
      }
    })
    .catch(error => {
      console.error('회원가입 중 오류 발생:', error);
      document.getElementById('error-message').innerText = error.message; // 오류 메시지 표시
    });
}

// 사진 미리보기 기능
document
  .getElementById('profile-picture')
  .addEventListener('change', function (event) {
    const file = event.target.files[0]; // 선택된 파일
    const imagePreview = document.getElementById('image-preview');

    if (file) {
      const reader = new FileReader(); // FileReader 객체 생성
      reader.onload = function (e) {
        imagePreview.src = e.target.result; // 미리보기 이미지 설정
        imagePreview.style.display = 'block'; // 이미지 표시
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    } else {
      // 기본 이미지로 초기화
      imagePreview.src =
        'https://firebasestorage.googleapis.com/v0/b/toy-project1-team2.appspot.com/o/profile.png?alt=media&token=1c32dd51-55a1-4ef9-9af7-5c3b83427cf5';
      imagePreview.style.display = 'block'; // 기본 이미지 표시
    }
  });

// 데이터 저장
function saveUserData(userId, username, email, imageUrl) {
  set(ref(database, 'User/' + userId), {
    username: username,
    email: email,
    profilePicture: imageUrl, // 프로필 사진 URL 저장
  })
    .then(() => {
      console.log('회원가입 성공 및 데이터 저장 완료');
      document.getElementById('error-message').innerText = ''; // 성공 시 메시지 초기화
      window.history.back(); // 이전 페이지로 돌아가기
    })
    .catch(error => {
      console.error('데이터 저장 중 오류 발생:', error);
    });
}

// 회원가입 폼 제출 이벤트
document
  .getElementById('signup-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const profilePicture = document.getElementById('profile-picture').files[0]; // 파일 입력값

    registerUser(email, password, username, profilePicture);
  });

// 취소 버튼
document.getElementById('cancel-button').addEventListener('click', function () {
  window.location.href = 'index.html'; // index.html로 이동
});

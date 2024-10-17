import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import {
  getDatabase,
  ref,
  get,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js'; // Firebase Storage 모듈 추가
import firebaseConfig from './firebaseConfig.js'; //파이어베이스 SDK 호출

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app); // Firebase Storage 초기화

// 사용자 정보를 가져오는 함수
function fetchUserData() {
  const user = auth.currentUser; // 현재 로그인한 사용자 정보 가져오기

  if (user) {
    console.log('현재 로그인한 사용자 정보:', user); // 사용자 정보 콘솔 출력
    const userId = user.uid; // 사용자 ID

    // Firebase Realtime Database에서 사용자 데이터 가져오기
    const userRef = ref(database, 'User/' + userId);
    get(userRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          displayUserData(userData); // 사용자 데이터 표시 함수 호출
        } else {
          console.log('사용자 데이터가 존재하지 않습니다.');
        }
      })
      .catch(error => {
        console.error('데이터 가져오기 오류:', error);
      });
  } else {
    console.log('로그인한 사용자가 없습니다.');
  }
}

// 사용자 데이터를 화면에 표시하는 함수
function displayUserData(userData) {
  const outputId = document.getElementById('output_id');
  const outputEmail = document.getElementById('output_email');

  outputId.innerText = '사용자 이름: ' + userData.username; // 사용자 이름 출력
  outputEmail.innerText = '이메일: ' + userData.email; // 이메일 출력

  // 프로필 사진 출력
  const profilePicturePath = userData.profilePicture; // 데이터베이스에서 프로필 사진 경로 가져오기
  const profilePictureRef = storageRef(storage, profilePicturePath); // Firebase Storage 참조 생성

  // 다운로드 URL 가져오기
  getDownloadURL(profilePictureRef)
    .then(url => {
      const profilePicture = document.createElement('img');
      profilePicture.src = url; // 다운로드 URL을 이미지 소스로 설정
      console.log(url);
      profilePicture.alt = '프로필 사진';
      profilePicture.style.width = '300px'; // 크기 조정
      profilePicture.style.height = '300px'; // 크기 조정
      outputId.appendChild(profilePicture); // 사용자 이름 아래에 이미지 추가
    })
    .catch(error => {
      console.error('프로필 사진을 가져오는 중 오류 발생:', error);
    });
}

// 로그인 상태를 확인하는 리스너 추가
onAuthStateChanged(auth, user => {
  if (user) {
    console.log('로그인한 사용자:', user);
    fetchUserData(); // 사용자 데이터 가져오기
  } else {
    console.log('로그인한 사용자가 없습니다.');
  }
});

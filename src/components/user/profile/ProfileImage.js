import './ProfileImage.css';
import { Button } from '../../../components';

export const ProfileImage = () => {
  return `
    <section class="user-profileImg-container">
       <div class="profileImg-box">
        <div class="real-profileImg"></div>
        <div class="inside-circle" id="profileImage">
          <span class="circle-text">Upload</span>
          <span class="circle-text">Your</span>
          <span class="circle-text">Profile</span>
        </div>
        <p class="profile-description">
          프로필 이미지를 업로드 해주세요!
        </p>
        <p class="profile-description-constraint">
          (단, jpg/png/jpeg 확장자 파일만 적용됩니다.)
        </p>
      </div>
      <input type="file" id="fileInput" accept="image/jpeg, image/png"/>
    </section>
  `;
};

// 버튼 추가
export const attachProfileImageEvents = container => {
  const fileInput = container.querySelector('#fileInput');
  const profileImg = container.querySelector('.real-profileImg');
  const buttonPosition = container.querySelector('.user-profileImg-container'); // 업로드 버튼 선택

  const imgUploadBtn = Button({
    className: 'img-upload-btn',
    text: '사진 선택하기',
    color: 'transparent',
    shape: 'line',
    padding: 'var(--space-small)',
    onClick: e => {
      e.preventDefault();
      fileInput.click();
    },
  });

  buttonPosition.append(imgUploadBtn);

  // Change event 리스너를 설정
  fileInput.addEventListener('change', () => {
    const files = fileInput.files; // 선택한 파일들 가져오기
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader(); // FileReader 객체 생성

      // 파일 읽기가 완료되었을 때 실행되는 이벤트
      reader.onload = event => {
        // 선택된 파일의 데이터 URL을 사용하여 배경 이미지로 설정
        profileImg.style.backgroundImage = `url(${event.target.result})`;
      };

      // 파일 읽기 시작
      reader.readAsDataURL(file);
    } else {
      alert('파일을 선택해 주세요.');
    }
  });
};

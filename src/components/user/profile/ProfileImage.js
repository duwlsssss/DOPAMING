// ProfileImage.js
import './ProfileImage.css';

export const ProfileImage = () => {
  return `
    <section class="profile-panel">
      <div class="profile-picture">
        <div class="outside-box">
          <div class="inside-box">
            <div class="profile-box">
              <div class="inside-circle" id="profileImage" style="background-size: cover; background-position: center;">
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
          </div>
        </div>
        <button class="picture-button" id="uploadButton">사진 선택하기</button>
        <input type="file" id="fileInput" accept="image/jpeg, image/png" style="display: none;" />
      </div>
    </section>
  `;
};

export const attachProfileImageEvents = container => {
  const pictureButton = container.querySelector('#uploadButton');
  const fileInput = container.querySelector('#fileInput');
  const profileImageCircle = container.querySelector('#profileImage'); // 이미지가 들어갈 요소 선택
  const description = container.querySelector('.profile-description'); // 설명 텍스트 선택
  const descriptionConstraint = container.querySelector(
    '.profile-description-constraint',
  ); // 제약 조건 텍스트 선택

  // Change event 리스너를 설정
  fileInput.addEventListener('change', () => {
    const files = fileInput.files; // 선택한 파일들 가져오기
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader(); // FileReader 객체 생성

      // 파일 읽기가 완료되었을 때 실행되는 이벤트
      reader.onload = event => {
        // 선택된 파일의 데이터 URL을 사용하여 배경 이미지로 설정
        profileImageCircle.style.backgroundImage = `url(${event.target.result})`;
        profileImageCircle.style.backgroundSize = 'cover'; // 배경 이미지 크기 설정
        profileImageCircle.style.backgroundPosition = 'center'; // 배경 이미지 위치 설정

        // 기존 텍스트 지우기
        const circleTexts = profileImageCircle.querySelectorAll('.circle-text');
        circleTexts.forEach(text => {
          text.style.display = 'none'; // 텍스트를 숨김
        });

        // 설명 텍스트 변경
        if (description) {
          description.textContent = '사진이 선택되었습니다'; // 텍스트 변경
        }
        if (descriptionConstraint) {
          descriptionConstraint.style.display = 'none'; // 제약 조건 텍스트 숨김
        }
      };

      // 파일 읽기 시작
      reader.readAsDataURL(file);
    } else {
      alert('파일을 선택해 주세요.');
    }
  });

  pictureButton.addEventListener('click', event => {
    console.log('클릭'); // 클릭 로그 출력
    event.preventDefault(); // 기본 폼 제출 방지
    fileInput.click(); // 파일 선택 대화상자 열기
  });
};

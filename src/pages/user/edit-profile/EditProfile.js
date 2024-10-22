import './EditProfile.css';

export const RenderUserEditProfile = container => {
  container.innerHTML = `
  <div class="box-title">
    <div class="edit-title">내 정보 수정</div>
  </div>
  <div class="edit-box">
    <div class="profile-panel"> <!-- 새로운 클래스 추가 -->
      <div class="profile-picture">
        <div class="left-outside-box">
          <div class="left-inside-box">
            <div class="profile-box">
              <div class="inside-circle" id="profileImage">
                <span class="circle-text">Upload</span>
                <span class="circle-text">Your</span>
                <span class="circle-text">Profile</span>
              </div>
              <div class="profile-description">
                프로필 이미지를 업로드 해주세요!
              </div>
              <div class="profile-description-constraint">
                (단, jpg/png/jpeg 확장자 파일만 적용됩니다.)
              </div>
            </div>
          </div>
        </div>
        <button class="picture-button">사진 선택하기</button>
      </div>
      <div class="profile-inputs">
        <div class="input-box">
          <span class="user-input">직책</span>
          <select class="input-select">
            <option value="">선택하세요</option>
            <option value="student">수강생</option>
            <option value="manager">매니저</option>
          </select>
        </div>
        <div class="input-box">
          <span class="user-input">이름</span>
          <input class="input-field" type="text">
        </div>
        <div class="input-box">
          <span class="user-input">성별</span>
          <select class="input-select">
            <option value="">선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <div class="input-box">
          <span class="user-input">생년월일</span>
          <input class="input-field" type="date">
        </div>
        <div class="input-box">
          <span class="user-input">전화번호</span>
          <input class="input-field" type="text" id="phone">
        </div>
        <div class="input-box">
          <span class="user-input">이메일</span>
          <input class="input-field" type="text">
        </div>
        <div class="input-box">
          <span class="user-input">비밀번호</span>
          <input class="input-field" type="password" id="password">
        </div>
        <div class="input-box">
          <span class="user-input">비밀번호 확인</span>
          <input class="input-field" type="password" id="confirm-password">
        </div>
      </div>
    </div>
    <div class="button-wrapper"> 
      <button class="submit-button">수정하기</button>
    </div>
  </div>
  `;

  // 유효성 검사 함수
  const validateInput = () => {
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const name = document.querySelector(
      '.profile-inputs input[type="text"]',
    ).value;
    const role = document.querySelector(
      '.profile-inputs select.input-select',
    ).value;
    const gender = document.querySelectorAll(
      '.profile-inputs select.input-select',
    )[1].value;
    const birthDate = document.querySelector(
      '.profile-inputs input[type="date"]',
    ).value;
    const email = document.querySelectorAll(
      '.profile-inputs input[type="text"]',
    )[1].value;

    // 모든 값이 입력되었는지 확인
    if (
      !role ||
      !name ||
      !gender ||
      !birthDate ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert('모든 값을 입력해 주세요.');
      return false;
    }

    // 전화번호 형식 검사 (xxx-xxxx-xxxx)
    const phonePattern = /^\d{3}-\d{4}-\d{4}$/;
    if (!phonePattern.test(phone)) {
      alert('전화번호 형식이 올바르지 않습니다. 형식: xxx-xxxx-xxxx');
      return false;
    }

    // 비밀번호 길이 검사
    if (password.length < 6) {
      alert('비밀번호는 6자리 이상이어야 합니다.');
      return false;
    }

    // 비밀번호 확인 검사
    if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return false;
    }

    return true;
  };

  // 사진 선택 클릭 이벤트 리스너
  const pictureButton = container.querySelector('.picture-button');
  pictureButton.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.jpg, .jpeg, .png'; // jpg, jpeg, png 파일만 허용

    fileInput.addEventListener('change', event => {
      const file = event.target.files[0]; // 선택된 파일 가져오기
      if (file) {
        // 파일 확장자 검증
        const validExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = file.name.split('.').pop().toLowerCase(); // 파일 확장자 추출

        if (!validExtensions.includes(fileExtension)) {
          alert(
            '유효하지 않은 파일 형식입니다. jpg, jpeg, png 파일만 선택하세요.',
          );
          return; // 유효하지 않은 경우 종료
        }

        const reader = new FileReader();

        reader.onload = e => {
          const imageUrl = e.target.result; // 읽은 파일의 데이터 URL

          // 프로필 이미지 설정
          const profileBox = container.querySelector('.profile-box');
          profileBox.style.backgroundImage = `url(${imageUrl})`;
          profileBox.style.backgroundSize = 'cover';
          profileBox.style.maxWidth = '100%';
          profileBox.style.maxHeight = '100%';
          profileBox.innerHTML = '';
        };

        reader.readAsDataURL(file);
      }
    });

    fileInput.click();
  });

  // 수정 버튼 클릭 이벤트 리스너
  const submitButton = container.querySelector('.submit-button');
  submitButton.addEventListener('click', event => {
    event.preventDefault();
    if (validateInput()) {
      //alert('모든 입력이 유효합니다.');
    }
  });
};

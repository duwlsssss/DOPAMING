import './ProfileImage.css';
export const ProfileImage = () => {
  return `
    <section class="profile-panel">
      <div class="profile-picture">
        <div class="outside-box">
          <div class="inside-box">
            <div class="profile-box">
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
          </div>
        </div>
        <button class="picture-button" aria-label="사진 선택하기">사진 선택하기</button>
      </div>
    </section>
  `;
};

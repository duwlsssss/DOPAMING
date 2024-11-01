import './EditProfileForm.css';

export const EditProfileForm = () => {
  return `
    <fieldset class="user-profile-inputs">

      <div class="input-container">
        <label class="user-input" for="role">직책</label>
          <div class="input-box">
            <select class="input-select" id="role">
              <option value="">선택하세요</option>
              <option value="student">수강생</option>
              <option value="manager">매니저</option>
            </select>
          </div>
      </div>
      
      
      <div class="input-container">
        <label class="user-input" for="name">이름</label>
        <div class="input-box">
          <input class="input-field" type="text" id="name">
        </div>
      </div>
      
      
      <div class="input-container">
        <label class="user-input" for="gender">성별</label>
        <div class="input-box">
          <select class="input-select" id="gender">
            <option value="">선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
      </div>
      
      
      <div class="input-container">
        <label class="user-input" for="birthDate">생년월일</label>
        <div class="input-box">
          <input class="input-field" type="date" id="birthDate">
          </div>
      </div>
      
      
      <div class="input-container">
        <label class="user-input" for="phone">전화번호</label>
        <div class="input-box">
          <input class="input-field" type="text" id="phone">
          <p class="error-message" id="phoneError"></p>
        </div>
      </div>
      
      <div class="input-container">
        <label class="user-input" for="email">이메일</label>
        <div class="input-box">
          <input class="input-field" type="text" id="email">
          <p class="error-message" id="emailError"></p>
        </div>
      </div>
      
      
      <div class="input-container">
      <label class="user-input" for="password">비밀번호</label>
      <div class="input-box">
        <div class="input-wrapper">
          <input class="input-field" type="password" id="password">
          <span class="material-symbols-rounded" id="toggle-password">visibility_off</span>
        </div>
        <p class="error-message" id="passwordError"></p>
      </div>
    </div>
    

    <div class="input-container">
      <label class="user-input" for="confirm-password">비밀번호 확인</label>
      <div class="input-box">
        <div class="input-wrapper">
          <input class="input-field" type="password" id="confirm-password">
          <span class="material-symbols-rounded" id="toggle-confirm-password">visibility_off</span>
        </div>
        <p class="error-message" id="confirmPasswordError"></p>
      </div>
    </div>
    
    </fieldset>
  `;
};

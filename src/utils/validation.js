// 로그인 유효성 검사 함수
export const validateLoginInput = (container, email, password) => {
  const emailError = container.querySelector('#emailError');
  const passwordError = container.querySelector('#passwordError');

  // 이전 에러 메시지 초기화
  emailError.textContent = '';
  passwordError.textContent = '';

  let isValid = true;

  if (!email.trim()) {
    emailError.textContent = '이메일을 입력해주세요.';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    emailError.textContent = '유효한 이메일 주소를 입력해주세요.';
    isValid = false;
  }

  if (!password.trim()) {
    passwordError.textContent = '비밀번호를 입력해주세요.';
    isValid = false;
  } else if (password.trim().length < 4) {
    passwordError.textContent = '비밀번호는 4자리 이상이어야 합니다.';
    isValid = false;
  }

  return isValid;
};

// 프로필 수정 유효성 검사 함수
export const validateProfileInput = container => {
  const phone =
    container.querySelector('.user-profile-inputs input#phone')?.value ?? '';
  const password =
    container.querySelector('.user-profile-inputs input#password')?.value ?? '';
  const confirmPassword =
    container.querySelector('.user-profile-inputs input#confirm-password')
      ?.value ?? '';
  const email = container.querySelector('#email')?.value ?? '';

  // 각 오류 메시지 요소 선택
  const phoneError = container.querySelector('#phoneError');
  const passwordError = container.querySelector('#passwordError');
  const confirmPasswordError = container.querySelector('#confirmPasswordError');
  const emailError = container.querySelector('#emailError');

  // 오류 메시지 초기화
  phoneError.textContent = '';
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';
  emailError.textContent = '';

  let isValid = true;

  // 전화번호 검증
  if (!/^\d{3}-\d{4}-\d{4}$/.test(phone)) {
    phoneError.textContent =
      '전화번호 형식이 올바르지 않습니다. 형식: xxx-xxxx-xxxx';
    isValid = false;
  }

  // 비밀번호 검증
  if (password.trim()) {
    // 입력된 경우에만 검사
    if (password.length < 4) {
      passwordError.textContent = '비밀번호는 4자리 이상 입력해주세요.';
      isValid = false;
    } else if (password.length > 10) {
      passwordError.textContent = '비밀번호는 10자리 이하로 입력해주세요.';
      isValid = false;
    } else {
      passwordError.textContent = ''; // 오류가 없으면 메시지 초기화
    }
  }

  // 비밀번호 확인 검증
  if (password !== confirmPassword) {
    confirmPasswordError.textContent =
      '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
    isValid = false;
  }

  // 이메일 검증
  if (!/\S+@\S+\.\S+/.test(email)) {
    emailError.textContent = '유효한 이메일 주소를 입력해주세요.';
    isValid = false;
  }

  return isValid;
};

// 휴가 신청 유효성 검사 함수
export const validateVacationRequestInput = isEditMode => {
  const vcType =
    document.querySelector('.vacation-request-form-inputs select#vacation-type')
      ?.value ?? '';
  const vcTitle =
    document.querySelector('.vacation-request-form-inputs input#vacation-title')
      ?.value ?? '';
  const vcStart =
    document.querySelector(
      '.vacation-request-form-inputs input#vacation-start-date',
    )?.value ?? '';
  const vcEnd =
    document.querySelector(
      '.vacation-request-form-inputs input#vacation-end-date',
    )?.value ?? '';
  const vcContent =
    document.querySelector(
      '.vacation-request-form-inputs textarea#vacation-content',
    )?.value ?? '';
  const fileInput = document.querySelector(
    '.vacation-request-form-inputs input#fileInput',
  );
  const vcTypeError = document.querySelector('#vcTypeError');
  const vcTitleError = document.querySelector('#vcTitleError');
  const vcStartError = document.querySelector('#vcStartError');
  const vcEndError = document.querySelector('#vcEndError');
  const vcContentError = document.querySelector('#vcContentError');
  const vcFileError = document.querySelector('#vcFileError');

  vcTypeError.textContent = '';
  vcTitleError.textContent = '';
  vcStartError.textContent = '';
  vcEndError.textContent = '';
  vcContentError.textContent = '';
  vcFileError.textContent = '';

  let isValid = true;

  // 수정모드면 간단히 검사
  if (isEditMode) {
    if (vcContent.length > 2000) {
      vcContentError.textContent = '부재 사유는 최대 2,000자로 입력해주세요.';
      isValid = false;
    }
  } else {
    if (!vcType) {
      vcTypeError.textContent = '부재 종류를 선택해주세요.';
      isValid = false;
    }

    if (!vcTitle) {
      vcTitleError.textContent = '부재 제목을 입력해주세요.';
      isValid = false;
    }

    if (!vcStart) {
      vcStartError.textContent = '시작일을 입력해주세요.';
      isValid = false;
    }

    if (!vcEnd) {
      vcEndError.textContent = '종료일을 입력해주세요.';
      isValid = false;
    } else if (new Date(vcStart) > new Date(vcEnd)) {
      vcEndError.textContent = '종료일이 시작일보다 빠를 수 없습니다.';
      isValid = false;
    }

    if (!vcContent.trim()) {
      vcContentError.textContent = '부재 사유를 입력해주세요.';
      isValid = false;
    } else if (vcContent.length > 2000) {
      vcContentError.textContent = '부재 사유는 최대 2,000자로 입력해주세요.';
      isValid = false;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      vcFileError.textContent = '증명 파일을 첨부해주세요.';
      isValid = false;
    }
  }

  return isValid;
};

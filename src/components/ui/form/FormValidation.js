// edit-profile 유효성 검사 함수
const validInput = userPassword => {
  const inputs = {
    phone: document.getElementById('phone').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirm-password').value,
    name: document.querySelector('.user-profile-inputs input#name').value,
    role: document.querySelector('.user-profile-inputs select#role').value,
    gender: document.querySelector('.user-profile-inputs select#gender').value,
    birthDate: document.querySelector('.user-profile-inputs input#birthDate')
      .value,
    email: document.getElementById('email').value,
  };

  console.log(inputs);
  // 모든 값이 입력되었는지 확인
  for (const key in inputs) {
    if (!inputs[key]) {
      alert('모든 값을 입력해 주세요.');
      return false;
    }
  }

  // 전화번호 형식 검사 (xxx-xxxx-xxxx)
  const phonePattern = /^\d{3}-\d{4}-\d{4}$/;
  if (!phonePattern.test(inputs.phone)) {
    alert('전화번호 형식이 올바르지 않습니다. 형식: xxx-xxxx-xxxx');
    return false;
  }

  // 비밀번호가 사용자 것과 일치하지 않을 떄
  if (inputs.password !== userPassword) {
    alert('가입되지 않은 비밀번호입니다.');
    return false;
  }

  // 비밀번호 길이 검사
  if (inputs.password.length < 6) {
    alert('비밀번호는 6자리 이상이어야 합니다.');
    return false;
  }

  // 비밀번호 확인 검사
  if (inputs.password !== inputs.confirmPassword) {
    alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    return false;
  }
  //비밀번호 변경 로직 추가 필요

  return true;
};

export { validInput }; // 함수 내보내기

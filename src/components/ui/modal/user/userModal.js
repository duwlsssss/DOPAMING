import './userModal.css';

function getSuccessMessage(type) {
  const messages = {
    'punch-in-success': '출근이 정상적으로 처리되었습니다.<br>오늘도 힘내봐요!',
    'punch-out-success':
      '퇴근이 정상적으로 처리되었습니다.<br>오늘 하루도 고생했어요!',
    'break-out-success':
      '외출이 정상적으로 처리되었습니다.<br>잠시 쉬어볼까요!',
    'break-in-success': '복귀가 정상적으로 처리되었습니다.<br>다시 힘내봐요!',
    'edit-profile-success': '프로필 수정이 정상적으로 처리되었습니다!',
    'vacation-request-success': '휴가 신청이 정상적으로 처리되었습니다!',
  };
  return messages[type] || '저장되었습니다!';
}

function getErrorMessage(type) {
  const messages = {
    'punch-in-fail': '출근 절차에서 오류가 발생했어요!',
    'punch-out-fail': '퇴근 절차에서 오류가 발생했어요!',
    'break-out-fail': '외출 절차에서 오류가 발생했어요!',
    'break-in-fail': '복귀 절차에서 오류가 발생했어요!',
    'vacation-request-fail': '휴가 신청 절차에서 오류가 발생했어요!',
    'edit-profile-fail': '프로필 수정 절차에서 오류가 발생했어요!',
  };
  return messages[type] || '오류가 발생했습니다!';
}

// 확인 버튼 이벤트 리스너 추가
function addEventListeners(fragment, modalInstance) {
  const confirmButton = fragment.querySelector('.confirm-button');
  if (confirmButton) {
    confirmButton.addEventListener('click', () => {
      const actionType = confirmButton.getAttribute('data-type');
      modalInstance.handleConfirm(actionType); // 클릭 시 actionType 전달
    });
  }

  // 취소 버튼 이벤트 리스너 추가
  const cancelButton = fragment.querySelector('.cancel-button');
  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      modalInstance.handleCancel(); // Modal 인스턴스의 handleCancel 호출
    });
  }

  // 닫기 버튼 이벤트 리스너 추가
  const closeButton = fragment.querySelector('.close-button');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modalInstance.close(); // Modal 인스턴스의 close 메서드 호출
    });
  }

  // 다시 시도 버튼 이벤트 리스너 추가
  const retryButton = fragment.querySelector('.retry-button');
  if (retryButton) {
    retryButton.addEventListener('click', () => {
      const actionType = retryButton.getAttribute('data-type');
      modalInstance.handleConfirm(actionType); // 재시도 시 actionType 전달
    });
  }
}

export function userModalContent(type, modalInstance) {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }); // HH:mm 형식 (24시간제)

  let content;
  switch (type) {
    // QUESTION
    case 'punch-in':
      content = ` 
        <div class="modal-question-container">
          <p class="modal-title">출근 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button" data-type="punch-in">예</button>
            <button class="cancel-button">아니요</button>
          </div>
        </div>`;
      break;

    case 'punch-out':
      content = `
      <div class="modal-question-container">
          <p class="modal-title">퇴근 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button" data-type="punch-out">예</button>
            <button class="cancel-button">아니요</button>
          </div>
        </div>`;
      break;

    case 'break-out':
      content = `
      <div class="modal-question-container">
          <p class="modal-title">외출 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button" data-type="break-out">예</button>
            <button class="cancel-button">아니요</button>
          </div>
        </div>`;
      break;

    case 'break-in':
      content = `
      <div class="modal-question-container">
          <p class="modal-title">복귀 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button" data-type="break-in">예</button>
            <button class="cancel-button">아니요</button>
          </div>
        </div>`;
      break;

    // SUCCESS
    case 'punch-in-success':
    case 'punch-out-success':
    case 'break-out-success':
    case 'break-in-success':
    case 'edit-profile-success':
    case 'vacation-request-success':
      content = `
        <div class="success-message">
          <span class="material-symbols-rounded">check_circle</span>
          <p>${getSuccessMessage(type)}</p>
          <button class="close-button">닫기</button>
        </div>`;
      break;

    // FAIL
    case 'punch-in-fail':
    case 'punch-out-fail':
    case 'break-out-fail':
    case 'break-in-fail':
    case 'vacation-request-fail':
    case 'edit-profile-fail':
    case 'login-fail':
      content = `
        <div class="error-message">
          <span class="material-symbols-rounded">warning</span>
          <p>${getErrorMessage(type)}</p>
          <div class="user-modal-button-group">
            <button class="close-button">닫기</button>
          </div>
        </div>`;
      break;

    default:
      content = `
        <div class="error-message">
          <span class="material-symbols-rounded">error</span>
          <p>모달 절차에서 오류가 발생했어요!</p>
          <button class="close-button">닫기</button>
        </div>`;
      break;
  }

  const fragment = document.createElement('div');
  fragment.innerHTML = content;

  // 이벤트 리스너 추가
  addEventListeners(fragment, modalInstance);

  return fragment;
}

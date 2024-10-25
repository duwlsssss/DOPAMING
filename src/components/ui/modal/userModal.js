import './userModal.css';

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
    case 'punch-in':
      content = `
          <p class="modal-title">출근 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button" data-type="punch-in">예</button>
            <button class="cancel-button">아니요</button>
          </div>
          <button class="punch-in-fail">출근 실패</button>
        `;
      break;

    case 'punch-out':
      content = `
          <p class="modal-title">퇴근 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button" data-type="punch-out">예</button>
            <button class="cancel-button">아니요</button>
          </div>
          <button class="punch-out-fail">퇴근 실패</button>
        `;
      break;

    case 'break-out':
      content = `
          <p class="modal-title">외출 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button" data-type="break-out">예</button>
            <button class="cancel-button">아니요</button>
          </div>
          <button class="break-out-fail">외출 실패</button>
        `;
      break;

    case 'break-in':
      content = `
          <p class="modal-title">복귀 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button" data-type="break-in">예</button>
            <button class="cancel-button">아니요</button>
          </div>
          <button class="break-in-fail">복귀 실패</button>
        `;
      break;

    //p class=modal-time은 동일한 css를 갖고 있다고 생각하여
    //수정하지 않았습니다.
    case 'vacation':
      content = `
      <p class="modal-time">정말로 부재를 신청하시겠습니까?</p>
      <div class="button-container">
      <span class="material-symbols-rounded">Help</span>
        <button class="confirm-button" data-type="break-in">예</button>
        <button class="cancel-button">아니요</button>
      </div>
    `;
      break;

    // 성공 및 실패 모달 처리
    case 'punch-in-success':
      content = `
        <div class="success-message">
          <span class="material-symbols-rounded">check_circle</span>
          <p>출근이 정상적으로 처리 되었습니다.<br>오늘도 힘내봐요!</p>
          <button class="close-button">닫기</button>
        </div>`;
      break;

    case 'punch-out-success':
      content = `
        <div class="success-message">
          <span class="material-symbols-rounded">check_circle</span>
          <p>퇴근이 정상적으로 처리 되었습니다.<br>오늘 하루도 고생했어요!</p>
          <button class="close-button">닫기</button>
        </div>`;
      break;

    case 'break-out-success':
      content = `
        <div class="success-message">
          <span class="material-symbols-rounded">check_circle</span>
          <p>외출이 정상적으로 처리 되었습니다.<br>잠시 쉬어볼까요?</p>
          <button class="close-button">닫기</button>
        </div>`;
      break;

    case 'break-in-success':
      content = `
        <div class="success-message">
          <span class="material-symbols-rounded">check_circle</span>
          <p>복귀가 정상적으로 처리 되었습니다.<br>다시 힘내봐요!</p>
          <button class="close-button">닫기</button>
        </div>`;
      break;

    case 'punch-in-fail':
      content = `
          <div class="error-message">
            <span class="material-symbols-rounded">warning</span>
            <p>출근 절차에서 오류가 발생했어요!</p>
              <button class="retry-button">다시 시도</button>
              <button class="close-button">닫기</button>
          </div>`;
      break;

    case 'punch-out-fail':
      content = `
        <div class="error-message">
          <span class="material-symbols-rounded">warning</span>
          <p>퇴근 절차에서 오류가 발생했어요!</p>
          <button class="retry-button">다시 시도</button>
          <button class="close-button">닫기</button>
        </div>`;
      break;

    case 'break-out-fail':
      content = `
        <div class="error-message">
          <span class="material-symbols-rounded">warning</span>
          <p>외출 절차에서 오류가 발생했어요!</p>
          <button class="retry-button">다시 시도</button>
          <button class="close-button">닫기</button>
        </div>`;
      break;

    case 'break-in-fail':
      content = `
        <div class="error-message">
          <span class="material-symbols-rounded">warning</span>
          <p>복귀 절차에서 오류가 발생했어요!</p>
          <button class="retry-button">다시 시도</button>
          <button class="close-button">닫기</button>
        </div>`;
      break;

    case 'vacation-fail':
      content = `
        <div class="error-message">
          <span class="material-symbols-rounded">warning</span>
          <p>제재 절차에서 오류가 발생했어요!</p>
          <button class="retry-button">다시 시도</button>
          <button class="close-button">닫기</button>
        </div>`;
      break;

    case 'edit-profile-fail':
      content = `
        <div class="error-message">
          <span class="material-symbols-rounded">warning</span>
          <p>프로필 수정 절차에서 오류가 발생했어요!</p>
          <button class="retry-button">다시 시도</button>
          <button class="close-button">닫기</button>
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

  // 확인 이벤트 리스너 추가
  const confirmButton = fragment.querySelector('.confirm-button');
  if (confirmButton) {
    confirmButton.addEventListener('click', () => {
      const actionType = confirmButton.getAttribute('data-type');
      modalInstance.handleConfirm(actionType); // Modal 인스턴스의 handleConfirm 호출
    });
  }

  // 취소 버튼 이벤트 리스너 추가
  const cancelButton = fragment.querySelector('.cancel-button');
  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      modalInstance.handleCancel(); // Modal 인스턴스의 handleCancel 호출
    });
  }

  // 출근실패 버튼 이벤트 리스너 추가
  const punchInFailButton = fragment.querySelector('.punch-in-fail');
  if (punchInFailButton) {
    punchInFailButton.addEventListener('click', () => {
      modalInstance.handleConfirm('punch-in-fail'); // 출근 실패 처리
    });
  }

  // 퇴근실패 버튼 이벤트 리스너 추가
  const punchOutFailButton = fragment.querySelector('.punch-out-fail');
  if (punchOutFailButton) {
    punchOutFailButton.addEventListener('click', () => {
      modalInstance.handleConfirm('punch-out-fail'); // 퇴근 실패 처리
    });
  }

  // 외출실패 버튼 이벤트 리스너 추가
  const breakOutFailButton = fragment.querySelector('.break-out-fail');
  if (breakOutFailButton) {
    breakOutFailButton.addEventListener('click', () => {
      modalInstance.handleConfirm('break-out-fail'); // 외출 실패 처리
    });
  }

  // 복귀실패 버튼 이벤트 리스너 추가
  const breakInFailButton = fragment.querySelector('.break-in-fail');
  if (breakInFailButton) {
    breakInFailButton.addEventListener('click', () => {
      modalInstance.handleConfirm('break-in-fail'); // 복귀 실패 처리
    });
  }

  // 닫기 버튼 이벤트 리스너 추가
  const closeButton = fragment.querySelector('.close-button');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modalInstance.close(); // Modal 인스턴스의 close 메서드 호출
    });
  }

  return fragment;
}

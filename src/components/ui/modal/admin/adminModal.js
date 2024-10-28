import './adminModal.css';

export function adminModalContent(type, modalInstance) {
  let content;

  switch (type) {
    // QUESTION
    case 'employee-delete':
      content = `
            <div class="question-message">
                <span class="material-symbols-rounded">Help</span>
                <p>선택한 직원을 삭제하시겠습니까?</p>
                <button class="confirm-button" data-type="employee-delete">예</button>
                <button class="cancel-button">아니요</button>
            </div>
            `;
      break;

    case 'notice-delete':
      content = `
            <div class="question-message">
                <span class="material-symbols-rounded">Help</span>
                <p>선택한 공지를 삭제하시겠습니까?</p>
                <button class="confirm-button" data-type="employee-delete">예</button>
                <button class="cancel-button">아니요</button>
            </div>
            `;
      break;

    case 'vacation-permit':
      content = `
            <div class="question-message">
                <span class="material-symbols-rounded">Help</span>
                <p>선택한 부재 요청을 승인하시겠습니까?</p>
                <button class="confirm-button" data-type="employee-delete">예</button>
                <button class="cancel-button">아니요</button>
            </div>
            `;
      break;

    case 'vacation-permit-cancle':
      content = `
            <div class="question-message">
                <span class="material-symbols-rounded">Help</span>
                <p>선택한 부재 요청의 승인을 취소하시겠습니까?</p>
                <button class="confirm-button" data-type="employee-delete">예</button>
                <button class="cancel-button">아니요</button>
            </div>
            `;
      break;

    case 'vacation-reject':
      content = `
            <div class="question-message">
                <span class="material-symbols-rounded">Help</span>
                <p>선택한 부재 요청을 거부하시겠습니까?</p>
                <button class="confirm-button" data-type="employee-delete">예</button>
                <button class="cancel-button">아니요</button>
            </div>
            `;
      break;

    case 'vacation-reject-cancle':
      content = `
            <div class="question-message">
                <span class="material-symbols-rounded">Help</span>
                <p>선택한 부재 요청의 거부를 취소하시겠습니까?</p>
                <button class="confirm-button" data-type="employee-delete">예</button>
                <button class="cancel-button">아니요</button>
            </div>
            `;
      break;

    // SUCCESS
    case 'employee-delete-success':
      content = `
            <div class="success-message">
                <span class="material-symbols-rounded">check_circle</span>
                <p>직원이 성공적으로 삭제되었습니다!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'notice-delete-success':
      content = `
            <div class="success-message">
                <span class="material-symbols-rounded">check_circle</span>
                <p>공지가 성공적으로 삭제되었습니다!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'vacation-permit-success':
      content = `
            <div class="success-message">
                <span class="material-symbols-rounded">check_circle</span>
                <p>부재 요청이 승인되었습니다!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'vacation-permit-cancle-success':
      content = `
            <div class="success-message">
                <span class="material-symbols-rounded">check_circle</span>
                <p>부재 요청 승인이 취소되었습니다!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'vacation-reject-success':
      content = `
            <div class="success-message">
                <span class="material-symbols-rounded">check_circle</span>
                <p>부재 요청이 거절되었습니다!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'vacation-reject-cancle-success':
      content = `
            <div class="success-message">
                <span class="material-symbols-rounded">check_circle</span>
                <p>부재 요청 거부가 취소되었습니다!.</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'notice-upload-success':
      content = `
            <div class="success-message">
                <span class="material-symbols-rounded">check_circle</span>
                <p>공지가 성공적으로 업로드되었습니다!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'employee-registration-success':
      content = `
            <div class="success-message">
                <span class="material-symbols-rounded">check_circle</span>
                <p>직원이 성공적으로 업로드되었습니다!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    // FAIL
    case 'vacation-permit-fail':
      content = `
            <div class="error-message">
                <span class="material-symbols-rounded">error</span>
                <p>부재 요청 절차에서 오류가 발생했어요!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'vacation-permit-cancle-fail':
      content = `
            <div class="error-message">
                <span class="material-symbols-rounded">error</span>
                <p>부재 요청 승인 취소 절차에서 오류가 발생했어요!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'vacation-reject-fail':
      content = `
            <div class="error-message">
                <span class="material-symbols-rounded">error</span>
                <p>부재 요청 거부 절차에서 오류가 발생했어요!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'vacation-reject-cancle-fail':
      content = `
            <div class="error-message">
                <span class="material-symbols-rounded">error</span>
                <p>부재 요청 거부 취소 절차에서 오류가 발생했어요!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'notice-upload-fail':
      content = `
            <div class="error-message">
                <span class="material-symbols-rounded">error</span>
                <p>공지 업로드 중 오류가 발생했어요!</p>
                <button class="close-button">닫기</button>
            </div>`;
      break;

    case 'employee-registration-fail':
      content = `
            <div class="error-message">
                <span class="material-symbols-rounded">error</span>
                <p>직원 등록 중 오류가 발생했어요!</p>
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

  // 닫기 버튼 이벤트 리스너 추가
  const closeButton = fragment.querySelector('.close-button');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modalInstance.close(); // Modal 인스턴스의 close 메서드 호출
    });
  }

  return fragment; // DOM 노드를 반환
}

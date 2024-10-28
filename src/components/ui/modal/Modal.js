import { adminModalContent } from './admin/adminModal';
import './Modal.css';
import { userModalContent } from './user/userModal';

function createModalElement() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'none';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => closeModal(modal);

  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  modal.onclick = event => {
    if (event.target === modal) {
      closeModal(modal);
    }
  };

  return { modal, modalContent };
}

function Modal(type) {
  const { modal, modalContent } = createModalElement();
  document.body.appendChild(modal);

  modalContent.innerHTML = ''; // 이전 내용 초기화

  const modalInstance = {
    close: () => closeModal(modal),
    handleConfirm: actionType => {
      if (actionType.endsWith('-fail')) {
        // 실패 타입
        modalContent.innerHTML = ''; // 내용 초기화
        modalContent.appendChild(userModalContent(actionType, modalInstance)); // 실패 메시지 추가
      } else {
        // 성공 타입
        const successType = `${actionType}-success`; // 예: 'punch-in-success'
        modalContent.innerHTML = ''; // 내용 초기화
        modalContent.appendChild(userModalContent(successType, modalInstance)); // 성공 메시지 추가
      }
    },
    handleCancel: () => {
      console.log('Action canceled');
      closeModal(modal); // 모달을 닫습니다.
    },
  };

  switch (type) {
    // USER
    case 'punch-in':
    case 'punch-out':
    case 'break-out':
    case 'break-in':
      modalContent.appendChild(userModalContent(type, modalInstance));
      break;
    case 'edit-profile':
      // edit-profile의 경우 성공 처리를 수행
      modalInstance.handleConfirm('edit-profile-success'); // 성공 처리
      break;

    // ADMIN
    case 'employee-delete':
    case 'notice-delete':
      modalContent.appendChild(adminModalContent(type, modalInstance));
      break;

    default:
      modalContent.innerHTML = '<p>잘못된 요청입니다.</p>';
      break;
  }

  modal.style.display = 'flex'; // 모달 열기
}

function closeModal(modal) {
  modal.style.display = 'none'; // 모달을 숨김
  document.body.removeChild(modal); // 모달 요소 제거
}

// 기본 내보내기 추가
export default Modal;

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

  switch (type) {
    // USER
    case 'punch-in':
    case 'punch-out':
    case 'break-out':
    case 'break-in':
    case 'edit-profile':
    case 'punch-in-success':
    case 'punch-in-fail':
    case 'punch-out-success':
    case 'punch-out-fail':
    case 'break-out-success':
    case 'break-out-fail':
    case 'break-in-success':
    case 'break-in-fail':
    case 'vacation-success':
    case 'vacation-fail':
    case 'profile-edit-success':
    case 'profile-edit-fail':
      modalContent.appendChild(
        userModalContent(type, { close: () => closeModal(modal) }),
      );
      break;

    // ADMIN
    case 'employee-delete':
    case 'notice-delete':
    case 'vacation-permit':
    case 'vacation-permit-cancle':
    case 'vacation-reject':
    case 'vacation-reject-cancle':
    case 'notice-upload':
    case 'employee-registration':
    case 'employee-delete-success':
    case 'notice-delete-success':
    case 'vacation-permit-success':
    case 'vacation-permit-cancle-success':
    case 'vacation-reject-success':
    case 'vacation-reject-cancle-success':
    case 'notice-upload-success':
    case 'employee-registration-success':
    case 'employee-delete-fail':
    case 'notice-delete-fail':
    case 'vacation-permit-fail':
    case 'vacation-permit-cancle-fail':
    case 'vacation-reject-fail':
    case 'vacation-reject-cancle-fail':
    case 'notice-upload-fail':
    case 'employee-registration-fail':
      modalContent.appendChild(
        adminModalContent(type, { close: () => closeModal(modal) }),
      );
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

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

// USER
function isUserAction(actionType) {
  return [
    'punch-in',
    'punch-out',
    'break-out',
    'break-in',
    'vacation',
    'punch-in-success',
    'punch-out-success',
    'break-out-success',
    'break-in-success',
    'edit-profile-success',
    'vacation-success',
    'punch-in-fail',
    'punch-out-fail',
    'break-out-fail',
    'break-in-fail',
    'vacation-fail',
    'edit-profile-fail',
  ].includes(actionType);
}

// ADMIN
function isAdminAction(actionType) {
  return [
    'employee-delete',
    'notice-delete',
    'vacation-permit',
    'vacation-permit-cancle',
    'vacation-reject',
    'vacation-reject-cancle',
    'employee-delete-success',
    'notice-delete-success',
    'vacation-permit-success',
    'vacation-permit-cancle-success',
    'vacation-reject-success',
    'vacation-reject-cancle-success',
    'notice-upload-success',
    'employee-registration-success',
    'vacation-permit-fail',
    'vacation-permit-cancle-fail',
    'vacation-reject-fail',
    'vacation-reject-cancle-fail',
    'notice-upload-fail',
    'employee-registration-fail',
  ].includes(actionType);
}

function closeModal(modal) {
  if (modal.parentNode) {
    // modal이 DOM에 존재하는지 확인
    modal.style.display = 'none'; // 모달을 숨김
    document.body.removeChild(modal); // 모달 요소 제거
  }
}

export default function Modal(type) {
  const { modal, modalContent } = createModalElement();
  document.body.appendChild(modal);

  modalContent.innerHTML = ''; // 이전 내용 초기화

  const modalInstance = {
    close: () => closeModal(modal),
    handleConfirm: actionType => {
      modalContent.innerHTML = ''; // 내용 초기화

      // actionType에 따라 적절한 모달 콘텐츠 호출
      // Home.js에서 사용
      switch (actionType) {
        case 'punch-in':
          modalContent.appendChild(
            userModalContent('punch-in-success', modalInstance),
          );
          break;
        case 'punch-out':
          modalContent.appendChild(
            userModalContent('punch-out-success', modalInstance),
          );
          break;
        case 'break-out':
          modalContent.appendChild(
            userModalContent('break-out-success', modalInstance),
          );
          break;
        case 'break-in':
          modalContent.appendChild(
            userModalContent('break-in-success', modalInstance),
          );
          break;
        default:
          if (isUserAction(actionType)) {
            modalContent.appendChild(
              userModalContent(actionType, modalInstance),
            );
          } else if (isAdminAction(actionType)) {
            modalContent.appendChild(
              adminModalContent(actionType, modalInstance),
            );
          } else {
            modalContent.innerHTML = '<p>잘못된 요청입니다.</p>';
          }
          break;
      }

      // 모달을 다시 열어줍니다.
      modal.style.display = 'flex';
    },
    handleCancel: () => {
      closeModal(modal); // 모달을 닫습니다.
    },
  };

  // 모달 타입에 따라 내용 추가
  //userModal.js, adminModal.js에서 사용
  switch (type) {
    case 'punch-in':
    case 'punch-out':
    case 'break-out':
    case 'break-in':
    case 'vacation':
      modalContent.appendChild(userModalContent(type, modalInstance));
      break;
    case 'employee-delete':
    case 'notice-delete':
    case 'vacation-permit':
    case 'vacation-permit-cancle':
    case 'vacation-reject':
    case 'vacation-reject-cancle':
      modalContent.appendChild(adminModalContent(type, modalInstance));
      break;
    case 'punch-in-success':
    case 'punch-out-success':
    case 'break-out-success':
    case 'break-in-success':
    case 'edit-profile-success':
    case 'vacation-success':
      modalContent.appendChild(userModalContent(type, modalInstance));
      break;
    case 'employee-delete-success':
    case 'notice-delete-success':
    case 'vacation-permit-success':
    case 'vacation-permit-cancle-success':
    case 'vacation-reject-success':
    case 'vacation-reject-cancle-success':
    case 'notice-upload-success':
    case 'employee-registration-success':
      modalContent.appendChild(adminModalContent(type, modalInstance));
      break;
    case 'punch-in-fail':
    case 'punch-out-fail':
    case 'break-out-fail':
    case 'break-in-fail':
    case 'vacation-fail':
    case 'edit-profile-fail':
      modalContent.appendChild(userModalContent(type, modalInstance));
      break;
    case 'vacation-permit-fail':
    case 'vacation-permit-cancle-fail':
    case 'vacation-reject-fail':
    case 'vacation-reject-cancle-fail':
    case 'notice-upload-fail':
    case 'employee-registration-fail':
      modalContent.appendChild(adminModalContent(type, modalInstance));
      break;
    default:
      modalContent.innerHTML = '<p>잘못된 요청입니다.</p>';
      break;
  }
  modal.style.display = 'flex'; // 모달 열기
}

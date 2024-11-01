import { adminModalContent } from './admin/adminModal';
import './Modal.css';
import { userModalContent } from './user/userModal';
import {
  getUserIdName,
  saveTimePunchData,
  deleteUserAbsence,
} from '../../../../server/api/user';
import navigate from '../../../utils/navigation';
import {
  adminMemberListDelete,
  AbsenceAPI,
  noticeAPI,
} from '../../../../server/api/admin';
import { ADMIN_PATH } from '../../../utils/constants';

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
    'vacation-delete', //휴가 삭제 확인
    'punch-in-success',
    'punch-out-success',
    'break-out-success',
    'break-in-success',
    'edit-profile-success',
    'vacation-request-success', //휴가 신청
    'vacation-edit-success', //휴가 수정
    'vacation-delete-success', //휴가 삭재
    'punch-in-fail',
    'punch-out-fail',
    'break-out-fail',
    'break-in-fail',
    'vacation-request-fail',
    'edit-profile-fail',
    'vacation-edit-fail',
    'vacation-delete-fail',
  ].includes(actionType);
}

// ADMIN
function isAdminAction(actionType) {
  return [
    'employee-delete',
    'notice-delete',
    'vacation-permit',
    'vacation-permit-cancel',
    'vacation-reject',
    'vacation-reject-cancel',
    'employee-delete-success',
    'notice-delete-success',
    'vacation-permit-success',
    'vacation-permit-cancel-success',
    'vacation-reject-success',
    'vacation-reject-cancel-success',
    'notice-upload-success',
    'employee-registration-success',
    'vacation-permit-fail',
    'vacation-permit-cancel-fail',
    'vacation-reject-fail',
    'notice-edit-success',
    'vacation-reject-cancel-fail',
    'notice-upload-fail',
    'employee-registration-fail',
  ].includes(actionType);
}

function closeModal(modal, redirectUrl = '') {
  if (modal.parentNode) {
    // modal이 DOM에 존재하는지 확인
    modal.style.display = 'none';
    document.body.removeChild(modal);

    // 설정된 redirectUrl이 있으면 해당 URL로 이동
    if (redirectUrl) {
      navigate(redirectUrl);
    }
  }
}

export async function Modal(type, options = {}) {
  const { modal, modalContent } = createModalElement();
  document.body.appendChild(modal);

  modalContent.innerHTML = ''; // 이전 내용 초기화

  let modalInstance = {
    // userId: null,
    // userName: null,
    ...options,
    close: () => closeModal(modal, modalInstance.redirectPath), // 모달 닫힐 때 redirectPath 사용
    handleConfirm: async actionType => {
      modalContent.innerHTML = ''; // 내용 초기화
      try {
        // actionType에 따라 적절한 모달 콘텐츠 호출
        switch (actionType) {
          case 'punch-in':
            await saveTimePunchData(
              modalInstance.userId,
              'punch-in',
              modalInstance.userName,
            );
            modalContent.appendChild(
              userModalContent('punch-in-success', modalInstance),
            );
            break;
          case 'employee-delete':
            try {
              const { selectedIds } = modalInstance;
              const result = await adminMemberListDelete(selectedIds);
              if (result.length) {
                modalContent.appendChild(
                  adminModalContent('employee-delete-success', modalInstance),
                );
                navigate('/admin/member');
              }
            } catch (error) {
              console.error(error);
            }
            break;
          case 'punch-out':
            await saveTimePunchData(
              modalInstance.userId,
              'punch-out',
              modalInstance.userName,
            );
            modalContent.appendChild(
              userModalContent('punch-out-success', modalInstance),
            );
            break;

          case 'break-out':
            await saveTimePunchData(
              modalInstance.userId,
              'break-out',
              modalInstance.userName,
            );
            modalContent.appendChild(
              userModalContent('break-out-success', modalInstance),
            );
            break;

          case 'break-in':
            await saveTimePunchData(
              modalInstance.userId,
              'break-in',
              modalInstance.userName,
            );
            modalContent.appendChild(
              userModalContent('break-in-success', modalInstance),
            );
            break;

          case 'vacation-delete':
            try {
              const { userId, absId, vcId } = modalInstance;
              const result = await deleteUserAbsence(userId, absId);
              if (result) {
                //true면
                modalContent.appendChild(
                  userModalContent('vacation-delete-success', modalInstance),
                );
                const itemElement = document
                  .getElementById(vcId)
                  .closest('.accordion-item');
                itemElement.remove();
              } else {
                modalContent.appendChild(
                  userModalContent('vacation-delete-fail', modalInstance),
                );
              }
            } catch (error) {
              console.error('사용자 부재 삭제 중 오류 발생:', error);
              modalContent.appendChild(
                userModalContent('vacation-delete-fail', modalInstance),
              );
            }
            break;

          case 'notice-delete':
            try {
              const { postId } = modalInstance;
              const result = await noticeAPI.deleteNotice(postId);
              if (result.success) {
                modalContent.appendChild(
                  adminModalContent('notice-delete-success', modalInstance),
                );
                setTimeout(() => {
                  navigate(ADMIN_PATH.NOTICE);
                }, 1000);
              }
            } catch (error) {
              console.error('공지 삭제 중 오류 발생:', error);
            }
            break;

          // 승인
          case 'vacation-permit':
            try {
              const { userId, absenceId } = modalInstance;
              console.log('Modal에서 전달하는 값:', { userId, absenceId });
              const result = await AbsenceAPI.approveAbsence(userId, absenceId);
              if (result.success) {
                modalContent.appendChild(
                  adminModalContent('vacation-permit-success', modalInstance),
                );
                setTimeout(() => {
                  navigate(ADMIN_PATH.VACATION);
                  location.reload();
                }, 1000);
              }
            } catch (error) {
              console.error('휴가 승인 중 오류 발생: ', error);
              modalContent.appendChild(
                adminModalContent('vacation-permit-fail', modalInstance),
              );
            }
            break;

          // 승인 취소
          case 'vacation-permit-cancel':
            try {
              const { userId, absenceId } = modalInstance;
              const result = await AbsenceAPI.cancelApproval(userId, absenceId);
              if (result.success) {
                modalContent.appendChild(
                  adminModalContent(
                    'vacation-permit-cancel-success',
                    modalInstance,
                  ),
                );
                setTimeout(() => {
                  navigate(ADMIN_PATH.VACATION);
                  location.reload();
                }, 1000);
              }
            } catch (error) {
              console.error('휴가 승인 취소 중 오류 발생: ', error);
              modalContent.appendChild(
                adminModalContent('vacation-permit-cancel-fail', modalInstance),
              );
            }
            break;

          // 거부
          case 'vacation-reject':
            try {
              const { userId, absenceId } = modalInstance;
              const result = await AbsenceAPI.rejectAbsence(userId, absenceId);
              if (result.success) {
                modalContent.appendChild(
                  adminModalContent('vacation-reject-success', modalInstance),
                );
                setTimeout(() => {
                  navigate(ADMIN_PATH.VACATION);
                  location.reload();
                }, 1000);
              }
            } catch (error) {
              console.error('휴가 거부 중 오류 발생: ', error);
              modalContent.appendChild(
                adminModalContent('vacation-reject-fail', modalInstance),
              );
            }
            break;

          // 거부 취소
          case 'vacation-reject-cancel':
            try {
              const { userId, absenceId } = modalInstance;
              console.log('Modal에서 전달하는 값:', { userId, absenceId });
              const result = await AbsenceAPI.cancelRejection(
                userId,
                absenceId,
              );
              if (result.success) {
                modalContent.appendChild(
                  adminModalContent(
                    'vacation-reject-cancel-success',
                    modalInstance,
                  ),
                );
                setTimeout(() => {
                  navigate(ADMIN_PATH.VACATION);
                  location.reload();
                }, 1000);
              }
            } catch (error) {
              console.error('휴가 거부 취소 중 오류 발생: ', error);
              modalContent.appendChild(
                adminModalContent('vacation-reject-cancel-fail', modalInstance),
              );
            }
            break;

          default:
            console.log('잘못된 요청 처리:', actionType);
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
      } catch (error) {
        console.error('데이터 저장 중 오류 발생:', error);
        modalContent.innerHTML =
          '<p>데이터 저장에 실패했습니다. 다시 시도해 주세요.</p>';
      }
    },
    handleCancel: () => {
      closeModal(modal, modalInstance.redirectPath); // 모달을 닫습니다.
    },
  };

  // 현재 로그인한 사용자 정보 가져오기
  if (isUserAction(type)) {
    try {
      const userData = await getUserIdName();
      modalInstance.userId = userData.id;
      modalInstance.userName = userData.name;
    } catch (error) {
      console.error('사용자 정보 오류:', error);
      modalContent.innerHTML = '<p>사용자 정보를 가져오지 못했습니다.</p>';
      modal.style.display = 'flex';
      return;
    }
  }

  // 모달 타입에 따라 내용 추가
  switch (type) {
    case 'punch-in':
    case 'punch-out':
    case 'break-out':
    case 'break-in':
    case 'vacation-delete':
      modalContent.appendChild(userModalContent(type, modalInstance));
      break;
    case 'employee-delete':
    case 'notice-delete':
    case 'vacation-permit':
    case 'vacation-permit-cancel':
    case 'vacation-reject':
    case 'vacation-reject-cancel':
      modalContent.appendChild(adminModalContent(type, modalInstance));
      break;
    case 'punch-in-success':
    case 'punch-out-success':
    case 'break-out-success':
    case 'break-in-success':
    case 'edit-profile-success':
    case 'vacation-request-success':
    case 'vacation-delete-success':
    case 'vacation-edit-success':
      modalContent.appendChild(userModalContent(type, modalInstance));
      break;
    case 'employee-delete-success':
    case 'notice-delete-success':
    case 'vacation-permit-success':
    case 'vacation-permit-cancel-success':
    case 'vacation-reject-success':
    case 'vacation-reject-cancel-success':
    case 'notice-edit-success':
    case 'notice-upload-success':
    case 'employee-registration-success':
      modalContent.appendChild(adminModalContent(type, modalInstance));
      break;
    case 'punch-in-fail':
    case 'punch-out-fail':
    case 'break-out-fail':
    case 'break-in-fail':
    case 'vacation-request-fail':
    case 'edit-profile-fail':
    case 'vacation-delete-fail':
    case 'vacation-edit-fail':
      modalContent.appendChild(userModalContent(type, modalInstance));
      break;
    case 'vacation-permit-fail':
    case 'vacation-permit-cancel-fail':
    case 'vacation-reject-fail':
    case 'vacation-reject-cancel-fail':
    case 'notice-upload-fail':
    case 'employee-registration-fail':
      modalContent.appendChild(adminModalContent(type, modalInstance));
      break;
    default:
      modalContent.innerHTML =
        '<p class="error-request-message">잘못된 요청입니다.</p>';
      break;
  }
  modal.style.display = 'flex'; // 모달 열기
}

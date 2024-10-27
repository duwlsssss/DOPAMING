import { adminModalContent } from './admin/adminModal';
import './Modal.css';
import { userModalContent } from './user/userModal';
class Modal {
  constructor() {
    this.modalElement = this.createModalElement();
    document.body.appendChild(this.modalElement);
  }

  createModalElement() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'none';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => this.close();

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    modal.onclick = event => {
      if (event.target === modal) {
        this.close();
      }
    };

    return modal;
  }

  open(type) {
    const modalContent = this.modalElement.querySelector('.modal-content');
    modalContent.innerHTML = ''; // 이전 내용 초기화

    switch (type) {
      // user
      case 'punch-in':
        modalContent.appendChild(userModalContent('punch-in', this));
        break;
      case 'punch-out':
        modalContent.appendChild(userModalContent('punch-out', this));
        break;
      case 'break-out':
        modalContent.appendChild(userModalContent('break-out', this));
        break;
      case 'break-in':
        modalContent.appendChild(userModalContent('break-in', this));
        break;

      case 'edit-profile':
        modalContent.appendChild(userModalContent('edit-profile', this));
        break;
      //  case 'vaction-'
      // modalContent.appendChild(userModalContent('vacation-',this));
      // break;

      case 'punch-in-success':
        modalContent.appendChild(userModalContent('punch-in-success', this));
        break;
      case 'punch-in-fail':
        modalContent.appendChild(userModalContent('punch-in-fail', this));
        break;
      case 'punch-out-success':
        modalContent.appendChild(userModalContent('punch-out-success', this));
        break;
      case 'punch-out-fail':
        modalContent.appendChild(userModalContent('punch-out-fail', this));
        break;
      case 'break-out-success':
        modalContent.appendChild(userModalContent('break-out-success', this));
        break;
      case 'break-out-fail':
        modalContent.appendChild(userModalContent('break-out-fail', this));
        break;
      case 'break-in-success':
        modalContent.appendChild(userModalContent('break-in-success', this));
        break;
      case 'break-in-fail':
        modalContent.appendChild(userModalContent('break-in-fail', this));
        break;
      case 'vacation-success':
        modalContent.appendChild(userModalContent('vacation-success', this));
        break;
      case 'vacation-fail':
        modalContent.appendChild(userModalContent('vacation-fail', this));
        break;
      case 'profile-edit-success':
        modalContent.appendChild(
          userModalContent('profile-edit-success', this),
        );
        break;
      case 'profile-edit-fail':
        modalContent.appendChild(userModalContent('profile-edit-fail', this));
        break;

      // ADMIN

      // QUESTION

      case 'employee-delete':
        modalContent.appendChild(adminModalContent('employee-delete', this));
        break;
      case 'notice-delete':
        modalContent.appendChild(adminModalContent('notice-delete', this));
        break;
      case 'vacation-permit':
        modalContent.appendChild(adminModalContent('vacation-permit', this));
        break;
      case 'vacation-permit-cancle':
        modalContent.appendChild(
          adminModalContent('vacation-permit-cancle', this),
        );
        break;
      case 'vacation-reject':
        modalContent.appendChild(adminModalContent('vacation-reject', this));
        break;
      case 'vacation-reject-cancle':
        modalContent.appendChild(
          adminModalContent('vacation-reject-cancle', this),
        );
        break;

      // CHECK

      case 'notice-upload':
        modalContent.appendChild(adminModalContent('notice-upload', this));
        break;
      case 'employee-registration':
        modalContent.appendChild(
          adminModalContent('employee-registration', this),
        );
        break;

      // SUCCESS
      case 'employee-delete-success':
        modalContent.appendChild(
          adminModalContent('employee-delete-success', this),
        );
        break;
      case 'notice-delete-success':
        modalContent.appendChild(
          adminModalContent('notice-delete-success', this),
        );
        break;
      case 'vacation-permit-success':
        modalContent.appendChild(
          adminModalContent('vacation-permit-success', this),
        );
        break;
      case 'vacation-permit-cancle-success':
        modalContent.appendChild(
          adminModalContent('vacation-permit-cancle-success', this),
        );
        break;
      case 'vacation-reject-success':
        modalContent.appendChild(
          adminModalContent('vacation-reject-success', this),
        );
        break;
      case 'vacation-reject-cancle-success':
        modalContent.appendChild(
          adminModalContent('vacation-reject-cancle-success', this),
        );
        break;
      case 'notice-upload-success':
        modalContent.appendChild(
          adminModalContent('notice-upload-success', this),
        );
        break;
      case 'employee-registration-success':
        modalContent.appendChild(
          adminModalContent('employee-registration-success', this),
        );
        break;

      // FAIL

      case 'employee-delete-fail':
        modalContent.appendChild(
          adminModalContent('employee-delete-fail', this),
        );
        break;
      case 'notice-delete-fail':
        modalContent.appendChild(adminModalContent('notice-delete-fail', this));
        break;
      case 'vacation-permit-fail':
        modalContent.appendChild(
          adminModalContent('vacation-permit-fail', this),
        );
        break;
      case 'vacation-permit-cancle-fail':
        modalContent.appendChild(
          adminModalContent('vacation-permit-cancle-fail', this),
        );
        break;
      case 'vacation-reject-fail':
        modalContent.appendChild(
          adminModalContent('vacation-reject-fail', this),
        );
        break;
      case 'vacation-reject-cancle-fail':
        modalContent.appendChild(
          adminModalContent('vacation-reject-cancle-fail', this),
        );
        break;
      case 'notice-upload-fail':
        modalContent.appendChild(adminModalContent('notice-upload-fail', this));
        break;
      case 'employee-registration-fail':
        modalContent.appendChild(
          adminModalContent('employee-registration-fail', this),
        );
        break;

      default:
        modalContent.innerHTML = '<p>잘못된 요청입니다.</p>';
        break;
    }

    this.modalElement.style.display = 'flex'; // 모달 열기
  }

  handleConfirm(type) {
    switch (type) {
      // USER MAIN
      case 'punch-in':
        console.log('출근 확인됨');
        // 출근 성공 모달 띄우기
        this.open('punch-in-success');
        break;

      case 'punch-out':
        console.log('퇴근 확인됨');
        // 퇴근 성공 모달 띄우기
        this.open('punch-out-success');
        break;

      case 'break-out':
        console.log('외출 확인됨');
        // 외출 성공 모달 띄우기
        this.open('break-out-success');
        break;

      case 'break-in':
        console.log('복귀 확인됨');
        // 복귀 성공 모달 띄우기
        this.open('break-in-success');
        break;

      case 'punch-in-fail':
        this.open('punch-in-fail');
        break;
      case 'punch-out-fail':
        this.open('punch-out-fail');
        break;
      case 'break-in-fail':
        this.open('break-in-fail');
        break;
      case 'break-out-fail':
        this.open('break-out-fail');
        break;

      // USER VACATION

      case 'vacation':
        this.open('vacation');
        break;
      case 'vacation-success':
        this.open('vacation-success');
        break;
      case 'vacation-fail':
        this.open('vacation-fail');
        break;

      // USER EDIT-PROFILE

      case 'edit-profile-success':
        this.open('edit-profile-success');
        break;
      case 'edit-profile-fail':
        this.open('edit-profile-fail');
        break;

      // ADMIN

      case 'employee-delete':
        this.open('employee-delete');
        break;
      case 'notice-delete':
        this.open('notice-delete');
        break;
      case 'vacation-permit':
        this.open('vacation-permit');
        break;
      case 'vacation-permit-cancle':
        this.open('vacation-permit-cancle');
        break;
      case 'vacation-reject':
        this.open('vacation-reject');
        break;
      case 'vacation-reject-cancle':
        this.open('vacation-reject-cancle');
        break;

      // SUCCESS
      case 'employee-delete-success':
        this.open('employee-delete-success');
        break;
      case 'notice-delete-success':
        this.open('notice-delete-success');
        break;
      case 'vacation-permit-success':
        this.open('vacation-permit-success');
        break;
      case 'vacation-permit-cancle-success':
        this.open('vacation-permit-cancle-success');
        break;
      case 'vacation-reject-success':
        this.open('vacation-reject-success');
        break;
      case 'vacation-reject-cancle-success':
        this.open('vacation-reject-cancle-success');
        break;

      case 'notice-upload-success':
        this.open('notice-upload-success');
        break;
      case 'employee-registration-success':
        this.open('employee-registration-success');
        break;

      // FAIL
      case 'vacation-permit-fail':
        this.open('vacation-permit-fail');
        break;
      case 'vacation-permit-cancle-fail':
        this.open('vacation-permit-cancle-fail');
        break;
      case 'vacation-reject-fail':
        this.open('vacation-reject-fail');
        break;
      case 'vacation-reject-cancle-fail':
        this.open('vacation-reject-cancle-fail');
        break;
      case 'notice-upload-fail':
        this.open('notice-upload-fail');
        break;
      case 'employee-registration-fail':
        this.open('employee-registration-fail');
        break;

      default:
        console.log('알 수 없는 액션입니다.');
        break;
    }
  }

  handleCancel() {
    console.log('취소됨');
    this.close();
  }

  close() {
    this.modalElement.style.display = 'none'; // 모달을 숨김
  }
}

export default Modal;

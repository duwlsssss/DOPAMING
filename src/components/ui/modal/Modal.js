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

      default:
        modalContent.innerHTML = '<p>잘못된 요청입니다.</p>';
        break;
    }

    this.modalElement.style.display = 'flex'; // 모달 열기
  }

  handleConfirm(type) {
    switch (type) {
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

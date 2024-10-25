import './Modal.css';
import { icreateModalContent } from './timeModal';

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
    modalContent.appendChild(icreateModalContent(type, this)); // Modal 인스턴스 전달
    this.modalElement.style.display = 'flex'; // 모달 열기
  }

  handleConfirm(type) {
    console.log(`${type} 확인됨`);
    // 여기에 추가적인 확인 로직을 작성할 수 있습니다.
    this.close();
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

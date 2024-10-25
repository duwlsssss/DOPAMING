import './Modal.css';

class Modal {
  constructor() {
    this.modalElement = this.createModalElement();
    document.body.appendChild(this.modalElement);
  }

  createModalElement() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'none'; // 초기 상태는 숨김

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => this.close(); // 닫기 버튼 클릭 시 모달 닫기

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    // 모달 외부 클릭 시 모달 닫기
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
    modalContent.appendChild(this.createModalContent(type)); // 모달 내용 추가
    this.modalElement.style.display = 'flex'; // 모달 열기
  }

  createModalContent(type) {
    let content;
    switch (type) {
      case 'punch-in':
        content = `
          <h2>출근하시겠습니까?</h2>
          <p>출근 버튼을 클릭하여 출근을 확인하세요.</p>
          <button id="confirm-punch-in">확인</button>
          <button id="cancel-punch-in">취소</button>
        `;
        break;
      case 'punch-out':
        content = `
          <h2>퇴근하시겠습니까?</h2>
          <p>퇴근 버튼을 클릭하여 퇴근을 확인하세요.</p>
          <button id="confirm-punch-out">확인</button>
          <button id="cancel-punch-out">취소</button>
        `;
        break;
      case 'break-out':
        content = `
          <h2>외출하시겠습니까?</h2>
          <p>외출 버튼을 클릭하여 외출을 확인하세요.</p>
          <button id="confirm-break-out">확인</button>
          <button id="cancel-break-out">취소</button>
        `;
        break;
      case 'break-in':
        content = `
          <h2>복귀하시겠습니까?</h2>
          <p>복귀 버튼을 클릭하여 복귀를 확인하세요.</p>
          <button id="confirm-break-in">확인</button>
          <button id="cancel-break-in">취소</button>
        `;
        break;
      default:
        content = '<p>모달 내용이 없습니다.</p>';
    }

    const fragment = document.createElement('div');
    fragment.innerHTML = content;

    // 이벤트 리스너 추가
    const confirmButton = fragment.querySelector('button[id^="confirm"]');
    if (confirmButton) {
      confirmButton.addEventListener('click', () => {
        this.handleConfirm(type); // 확인 버튼 클릭 시 처리
      });
    }

    // 취소 버튼 이벤트 리스너 추가
    const cancelButton = fragment.querySelector('button[id^="cancel"]');
    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        this.handleCancel(); // 취소 버튼 클릭 시 처리
      });
    }

    return fragment;
  }

  handleConfirm(type) {
    console.log(`${type} 확인됨`);
    // 여기에 출근/퇴근 확인 로직 추가
    this.close(); // 모달 닫기
  }

  handleCancel() {
    console.log('취소됨');
    this.close(); // 모달 닫기
  }

  close() {
    this.modalElement.style.display = 'none'; // 모달을 숨김
  }
}

export default Modal;

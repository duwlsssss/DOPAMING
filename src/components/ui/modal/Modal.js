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
    const { date, time } = this.getCurrentDateTime(); // 현재 날짜 및 시간 가져오기
    let content;
    switch (type) {
      case 'punch-in':
        content = `
          <p class="modal-title">출근 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button punch-in">예</button>
            <button class="cancel-button">아니요</button>
          </div>
        `;
        break;
      case 'punch-out':
        content = `
          <p class="modal-title">퇴근 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button punch-out">예</button>
            <button class="cancel-button">아니요</button>
          </div>
        `;
        break;
      case 'break-out':
        content = `
          <p class="modal-title">외출 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button break-out">예</button>
            <button class="cancel-button">아니요</button>
          </div>
        `;
        break;
      case 'break-in':
        content = `
          <p class="modal-title">복귀 하시겠습니까?</p>
          <p class="modal-date">날짜: ${date}</p>
          <p class="modal-time">현재 시간: ${time}</p>
          <div class="button-container">
            <button class="confirm-button break-in">예</button>
            <button class="cancel-button">아니요</button>
          </div>
        `;
        break;
      default:
        content = '<p>모달 내용이 없습니다.</p>';
    }

    const fragment = document.createElement('div');
    fragment.innerHTML = content;

    // 이벤트 리스너 추가
    const confirmButton = fragment.querySelector('.confirm-button');
    if (confirmButton) {
      confirmButton.addEventListener('click', () => {
        const actionType = confirmButton.getAttribute('data-type');
        this.handleConfirm(actionType); // 확인 버튼 클릭 시 처리
      });
    }

    // 취소 버튼 이벤트 리스너 추가
    const cancelButton = fragment.querySelector('.cancel-button');
    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        this.handleCancel(); // 취소 버튼 클릭 시 처리
      });
    }

    return fragment;
  }

  getCurrentDateTime() {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    const time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }); // HH:mm 형식 (24시간제)
    return { date, time };
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

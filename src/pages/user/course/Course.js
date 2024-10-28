import Modal from '../../../components/ui/modal/Modal'; // Modal 클래스 임포트
import './Course.css';

export const RenderUserCourse = container => {
  container.innerHTML = `
    <div class="course-question">
      <button id="employee-delete-button">직원 삭제</button>
      <button id="notice-delete-button">공지 삭제</button>
      <button id="vacation-permit-button">부재 요청 승인</button>
      <button id="vacation-permit-cancle">부재 요청 승인 취소</button>
      <button id="vacation-reject-button">부재 요청 거부</button>
      <button id="vacation-reject-cancle-button">부재 요청 거부 취소</button>
    </div>
    <div class="course-success">
      <button id="employee-delete-success">직원 삭제 성공</button>
      <button id="notice-delete-success">공지 삭제 성공</button>
      <button id="vacation-permit-success">부재 요청 승인 성공</button>
      <button id="vacation-permit-cancle-success">부재 요청 승인 취소 성공</button>
      <button id="vacation-reject-success">부재 요청 거부 성공</button>
      <button id="vacation-reject-cancle-success">부재 요청 거부 취소 성공</button>
      <button id="notice-upload-success">공지 업로드</button>
      <button id="employee-registration-success">직원 등록</button>
    </div>
    <div class="course-fail">
      <button id="vacation-permit-fail">부재 요청 실패</button>
      <button id="vacation-permit-cancle-fail">부재 요청 승인 취소 실패</button>
      <button id="vacation-reject-fail">부재 요청 거부 실패</button>
      <button id="vacation-reject-cancle-fail">부재 요청 거부 취소 실패</button>
      <button id="notice-upload-fail">공지 업로드 실패</button>
      <button id="employee-registration-fail">직원 등록 실패</button>
    </div>
  `;

  const modal = new Modal(); // Modal 인스턴스 생성

  // 각 버튼에 대해 이벤트 리스너 추가
  document
    .getElementById('employee-delete-button')
    .addEventListener('click', () => {
      modal.open('employee-delete');
    });

  document
    .getElementById('notice-delete-button')
    .addEventListener('click', () => {
      modal.open('notice-delete');
    });

  document
    .getElementById('vacation-permit-button')
    .addEventListener('click', () => {
      modal.open('vacation-permit');
    });

  document
    .getElementById('vacation-permit-cancle')
    .addEventListener('click', () => {
      modal.open('vacation-permit-cancle');
    });

  document
    .getElementById('vacation-reject-button')
    .addEventListener('click', () => {
      modal.open('vacation-reject');
    });

  document
    .getElementById('vacation-reject-cancle-button')
    .addEventListener('click', () => {
      modal.open('vacation-reject-cancle');
    });

  // 성공 및 실패 버튼에 대한 이벤트 리스너 추가
  document
    .getElementById('employee-delete-success')
    .addEventListener('click', () => {
      modal.open('employee-delete-success');
    });

  document
    .getElementById('notice-delete-success')
    .addEventListener('click', () => {
      modal.open('notice-delete-success');
    });

  document
    .getElementById('vacation-permit-success')
    .addEventListener('click', () => {
      modal.open('vacation-permit-success');
    });

  document
    .getElementById('vacation-permit-cancle-success')
    .addEventListener('click', () => {
      modal.open('vacation-permit-cancle-success');
    });

  document
    .getElementById('vacation-reject-success')
    .addEventListener('click', () => {
      modal.open('vacation-reject-success');
    });

  document
    .getElementById('vacation-reject-cancle-success')
    .addEventListener('click', () => {
      modal.open('vacation-reject-cancle-success');
    });

  document
    .getElementById('notice-upload-success')
    .addEventListener('click', () => {
      modal.open('notice-upload-success');
    });

  document
    .getElementById('employee-registration-success')
    .addEventListener('click', () => {
      modal.open('employee-registration-success');
    });

  document
    .getElementById('vacation-permit-fail')
    .addEventListener('click', () => {
      modal.open('vacation-permit-fail');
    });

  document
    .getElementById('vacation-permit-cancle-fail')
    .addEventListener('click', () => {
      modal.open('vacation-permit-cancle-fail');
    });

  document
    .getElementById('vacation-reject-fail')
    .addEventListener('click', () => {
      modal.open('vacation-reject-fail');
    });

  document
    .getElementById('vacation-reject-cancle-fail')
    .addEventListener('click', () => {
      modal.open('vacation-reject-cancle-fail');
    });

  document
    .getElementById('notice-upload-fail')
    .addEventListener('click', () => {
      modal.open('notice-upload-fail');
    });

  document
    .getElementById('employee-registration-fail')
    .addEventListener('click', () => {
      modal.open('employee-registration-fail');
    });
};

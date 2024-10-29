import { Modal } from '../../../components';
import './Course.css'; // Modal 클래스 임포트

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

  const setupButtonListener = (buttonId, modalType) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', () => {
        Modal(modalType); // 모달 인스턴스 생성
      });
    } else {
      console.error(`Button with ID ${buttonId} not found.`);
    }
  };

  // 질문 버튼들에 대한 이벤트 리스너
  setupButtonListener('employee-delete-button', 'employee-delete');
  setupButtonListener('notice-delete-button', 'notice-delete');
  setupButtonListener('vacation-permit-button', 'vacation-permit');
  setupButtonListener('vacation-permit-cancle', 'vacation-permit-cancle');
  setupButtonListener('vacation-reject-button', 'vacation-reject');
  setupButtonListener(
    'vacation-reject-cancle-button',
    'vacation-reject-cancle',
  );

  // 성공 버튼들에 대한 이벤트 리스너
  setupButtonListener('employee-delete-success', 'employee-delete-success');
  setupButtonListener('notice-delete-success', 'notice-delete-success');
  setupButtonListener('vacation-permit-success', 'vacation-permit-success');
  setupButtonListener(
    'vacation-permit-cancle-success',
    'vacation-permit-cancle-success',
  );
  setupButtonListener('vacation-reject-success', 'vacation-reject-success');
  setupButtonListener(
    'vacation-reject-cancle-success',
    'vacation-reject-cancle-success',
  );
  setupButtonListener('notice-upload-success', 'notice-upload-success');
  setupButtonListener(
    'employee-registration-success',
    'employee-registration-success',
  );

  // 실패 버튼들에 대한 이벤트 리스너
  setupButtonListener('vacation-permit-fail', 'vacation-permit-fail');
  setupButtonListener(
    'vacation-permit-cancle-fail',
    'vacation-permit-cancle-fail',
  );
  setupButtonListener('vacation-reject-fail', 'vacation-reject-fail');
  setupButtonListener(
    'vacation-reject-cancle-fail',
    'vacation-reject-cancle-fail',
  );
  setupButtonListener('notice-upload-fail', 'notice-upload-fail');
  setupButtonListener(
    'employee-registration-fail',
    'employee-registration-fail',
  );
};

import './Home.css';
import { WorkInfo } from '../../../components/user/work-info/WorkInfo';
import Modal from '../../../components/ui/modal/Modal'; // Modal 함수 임포트
import {
  formatDate,
  formatUserTime,
  updateCurrentTime,
} from '../../../utils/currentTime'; // currentTime.js에서 함수 가져오기
import navigate from '../../../utils/navigation'; // navigate 함수 임포트

const USER_ID = '231231232'; // 실제 사용자 ID를 입력하세요.

const timePunchContainer = async () => {
  const today = formatDate(new Date());
  const { userInfo } = await WorkInfo(USER_ID, today);
  updateCurrentTime();

  return `
    <p class="punch-time-title">현재 시각</p>
    <div class="current-time-board">
        <span class="material-symbols-rounded">alarm</span>
        <p class="punch-time"></p>
    </div>
    <div class="punch-time-header">
        <p>출/퇴근 관리</p>
        <button class="punch-detail-button">상세보기</button>
    </div>
    <div class="punch-time-board">
        <div class="punch-time-board-box">
            <p class="punch-time-board-box-title">출근 시간</p>
            <span class="punch-time-board-box-content">${formatUserTime(userInfo?.punch_in)}</span>
            <button class="punch-in-button">출근하기</button>
        </div>
        <div class="punch-time-board-box">
            <p class="punch-time-board-box-title">퇴근 시간</p>
            <span class="punch-time-board-box-content">${formatUserTime(userInfo?.punch_out)}</span>
            <button class="punch-out-button">퇴근하기</button>
        </div>
        <div class="punch-time-board-box">
            <p class="punch-time-board-box-title">외출 시간</p>
            <span class="punch-time-board-box-content">${formatUserTime(userInfo?.break_out)}</span>
            <button class="break-out-button">외출하기</button>
        </div>
        <div class="punch-time-board-box">
            <p class="punch-time-board-box-title">복귀 시간</p>
            <span class="punch-time-board-box-content">${formatUserTime(userInfo?.break_in)}</span>
            <button class="break-in-button">복귀하기</button>
        </div>
    </div>
  `;
};

export const RenderUserHome = async container => {
  const userTimePunch = await timePunchContainer();
  container.innerHTML = `
    <div class="my-view">
      <div class="main-view">
        <div class="main-left">
          <section class="main-notice">메인뷰</section>
          <section class="main-notice-gallery">공지사항 갤러리</section>
        </div>
        <div class="main-right">
          <section class="main-time-punch">
            <div class="punch-info-container">
              ${userTimePunch}
            </div>
          </section>
          <section class="main-vaction">휴가 결재 현황</section>
        </div>
      </div>
    </div>
  `;

  // "상세보기" 버튼 클릭 이벤트 추가
  const punchDetailButton = container.querySelector('.punch-detail-button');
  if (punchDetailButton) {
    punchDetailButton.addEventListener('click', () => {
      navigate('/work-detail');
    });
  }

  // 각 버튼에 대한 클릭 이벤트 추가
  const buttons = {
    '.punch-in-button': 'punch-in',
    '.punch-out-button': 'punch-out',
    '.break-out-button': 'break-out',
    '.break-in-button': 'break-in',
  };

  for (const [selector, type] of Object.entries(buttons)) {
    const button = container.querySelector(selector);
    if (button) {
      button.addEventListener('click', () => {
        console.log(`${type} 버튼 클릭됨`);
        Modal(type); // 모달 열기
      });
    }
  }

  // 실시간 시간 반영하기 위해 DOM이 렌더링된 후에 호출
  setInterval(updateCurrentTime, 1000); // 1초마다 현재 시간 업데이트
};

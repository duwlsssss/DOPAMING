import './Home.css';
import { WorkInfo } from '../../../components/user/work-info/WorkInfo';
import Modal from '../../../components/ui/modal/Modal'; // Modal 클래스 임포트

const USER_ID = '231231232'; // 실제 사용자 ID를 입력하세요.

const formatDate = date => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

const formatTimeWithSeconds = date => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}시 ${minutes}분 ${seconds}초`;
};

const formatTimeWithoutSeconds = date => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}시 ${minutes}분`;
};

const formatUserTime = time => {
  return time ? formatTimeWithoutSeconds(new Date(time)) : '--시 --분';
};

const updateCurrentTime = () => {
  const now = new Date();
  const formattedDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
  const currentTime = `${formattedDate} ${formatTimeWithSeconds(now)}`;
  const punchTimeElement = document.querySelector('.punch-time');
  if (punchTimeElement) {
    punchTimeElement.innerText = currentTime; // 현재 시각 업데이트
  }
};

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

  const modal = new Modal(); // Modal 인스턴스 생성

  // "상세보기" 버튼 클릭 이벤트 추가
  const punchDetailButton = container.querySelector('.punch-detail-button');
  if (punchDetailButton) {
    punchDetailButton.addEventListener('click', () => {
      window.location.href = 'http://localhost:5173/work-detail';
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
        modal.open(type); // 모달 열기
      });
    }
  }

  // 실시간 시간 반영하기 위해 DOM이 렌더링된 후에 호출
  setInterval(updateCurrentTime, 1000); // 1초마다 현재 시간 업데이트
};

import './Home.css';
import { WorkInfo } from '../../../components/user/work-info/WorkInfo';

// 사용자 ID를 상수로 정의
const USER_ID = '231231232'; // 실제 사용자 ID를 입력하세요.

// 날짜 형식 변환 함수
const formatDate = date => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0'); // 1-12월을 2자리로
  const day = String(d.getDate()).padStart(2, '0'); // 1-31일을 2자리로
  return `${d.getFullYear()}-${month}-${day}`;
};

// 시간 형식 변환 함수
const formatTime = date => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}시 ${minutes}분 ${seconds}초`;
};

export const RenderUserHome = async container => {
  const today = formatDate(new Date()); // 오늘 날짜를 YYYY-MM-DD 형식으로 변환
  const { userInfo } = await WorkInfo(USER_ID, today); // 사용자 정보를 객체 형태로 가져옴

  // 현재 시간 가져오기
  const now = new Date(); // 현재 시간
  const formattedDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
  const currentTime = `${formattedDate} ${formatTime(now)}`; // 포맷된 현재 시간

  let userTimePunch = `
    <p class="punch-time-title">현재 시각</p>
    <div class="current-time-board">
        <span class="material-symbols-rounded">alarm</span>
        <p class="punch-time">${currentTime}</p>
    </div>
    <div class="punch-time-header">
        <p>출/퇴근 관리</p>
        <button class="punch-detail-button">상세보기</button>
    </div>
    <div class="punch-time-board">
        <div class="punch-time-board-box">
            <p class="punch-time-board-box-title">출근 시간</p>
            <span class="punch-time-board-box-content">
                ${
                  userInfo && userInfo.punch_in
                    ? `${new Date(userInfo.punch_in).getHours()}시 ${new Date(userInfo.punch_in).getMinutes()}분`
                    : '--시 --분'
                }
            </span>
            <button class="punch-in-button">출근하기</button>
        </div>
        <div class="punch-time-board-box">
            <p class="punch-time-board-box-title">퇴근 시간</p>
            <span class="punch-time-board-box-content">
                ${
                  userInfo && userInfo.punch_out
                    ? `${new Date(userInfo.punch_out).getHours()}시 ${new Date(userInfo.punch_out).getMinutes()}분`
                    : '--시 --분'
                }
            </span>
            <button class="punch-out-button">퇴근하기</button>
        </div>
        <div class="punch-time-board-box">
            <p class="punch-time-board-box-title">외출 시간</p> 
            <span class="punch-time-board-box-content">
                ${
                  userInfo && userInfo.break_out
                    ? `${new Date(userInfo.break_out).getHours()}시 ${new Date(userInfo.break_out).getMinutes()}분`
                    : '--시 --분'
                }
            </span>
            <button class="break-out-button">외출하기</button>
        </div>
        <div class="punch-time-board-box">
            <p class="punch-time-board-box-title">복귀 시간</p>
            <span class="punch-time-board-box-content">
                ${
                  userInfo && userInfo.break_in
                    ? `${new Date(userInfo.break_in).getHours()}시 ${new Date(userInfo.break_in).getMinutes()}분`
                    : '--시 --분'
                }
            </span>
            <button class="break-in-button">복귀하기</button>
        </div>
    </div>
`;

  // HTML 형식으로 추가하기 위해 DOM에 직접 추가
  const timePunchContainer = container.querySelector('.punch-info-container');
  if (timePunchContainer) {
    timePunchContainer.innerHTML = userTimePunch; // 해당 섹션의 내용만 업데이트
  } else {
    // 만약 해당 섹션이 없다면 새로 추가 (예: 처음 로드 시)
    container.innerHTML = `
        <div class="my-view">
          <div class="main-view">
            <div class="main-left">
              <section class="main-notice">
                메인뷰
              </section>
              <section class="main-notice-gallery">
                공지사항 갤러리
              </section>
            </div>
            <div class="main-right">
              <section class="main-time-punch">
                <div class="punch-info-container">
                  ${userTimePunch} <!-- 여기서 HTML 형식으로 추가 -->
                </div>
              </section>
              <section class="main-vaction">
                휴가 결재 현황
              </section>
            </div>
          </div>
        </div>
      `;
  }
};

const container = document.getElementById('root');
RenderUserHome(container);

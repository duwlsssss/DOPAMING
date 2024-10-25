import './Home.css';
import { WorkInfo } from '../../../components/user/work-info/WorkInfo';

// 사용자 ID를 상수로 정의
const USER_ID = '231231232'; // 실제 사용자 ID를 입력하세요.

// 날짜 형식 변환 함수
const formatDate = date => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

// 시간 형식 변환 함수 (초 포함)
const formatTimeWithSeconds = date => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}시 ${minutes}분 ${seconds}초`;
};

// 시간 형식 변환 함수 (초 제외)
const formatTimeWithoutSeconds = date => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}시 ${minutes}분`;
};

// 시간을 포맷하는 헬퍼 함수
const formatUserTime = time => {
  return time ? formatTimeWithoutSeconds(new Date(time)) : '--시 --분';
};

const timePunchContainer = async () => {
  const today = formatDate(new Date());
  const { userInfo } = await WorkInfo(USER_ID, today);

  const now = new Date();
  const formattedDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
  const currentTime = `${formattedDate} ${formatTimeWithSeconds(now)}`; // 포맷된 현재 시간

  return `
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
              ${userTimePunch}
            </div>
          </section>
          <section class="main-vaction">
            휴가 결재 현황
          </section>
        </div>
      </div>
    </div>
  `;
};

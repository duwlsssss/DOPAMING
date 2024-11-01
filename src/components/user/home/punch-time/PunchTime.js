import './PunchTime.css';
import { Button } from '../../../ui/button/Button';
import navigate from '../../../../utils/navigation';
import {
  formatTimeWithSeconds,
  formatUserTime,
} from '../../../../utils/currentTime';
import { USER_PATH } from '../../../../utils/constants';
import { Modal } from '../../../ui/modal/Modal';
import { formatDate } from '../../../../utils/currentTime';
import { getAuth } from 'firebase/auth'; // Firebase Authentication 가져오기
import {
  fetchUserData,
  fetchTimePunchData,
} from '../../../../../server/api/user'; // 사용자 및 출퇴근 데이터 가져오는 API

export const RenderPunchTime = async container => {
  container.classList.add('punch-time');
  const today = formatDate(new Date());

  const auth = getAuth(); // Firebase Authentication
  const user = auth.currentUser; // 현재 로그인한 사용자

  if (!user) {
    console.error('사용자가 로그인하지 않았습니다.');
    return;
  }

  const userId = user.uid; // 사용자 고유 ID
  const todayData = await fetchTimePunchData(userId); // 출퇴근 데이터 가져오기

  const todayPunchData = todayData.filter(data => {
    const punchDate = formatDate(new Date(data.punch_date)); // 데이터의 날짜 형식
    return punchDate === today;
  });

  const punchInTime =
    todayPunchData.length > 0
      ? formatUserTime(todayPunchData[0].punch_in)
      : '--시 --분';
  const punchOutTime =
    todayPunchData.length > 0
      ? formatUserTime(todayPunchData[0].punch_out)
      : '--시 --분';
  const breakOutTime =
    todayPunchData.length > 0
      ? formatUserTime(todayPunchData[0].break_out)
      : '--시 --분';
  const breakInTime =
    todayPunchData.length > 0
      ? formatUserTime(todayPunchData[0].break_in)
      : '--시 --분';

  container.innerHTML = `
    <div class="curr-time-title">현재 시각</div>
    <div class="curr-time-board">
      <span class="material-symbols-rounded">alarm</span>
      <p class="curr-date">${today}</p>
      <p class="curr-time">${formatTimeWithSeconds(new Date())}</p>
    </div>
    <div class="punch-time-header">
      <p>출/퇴근 관리</p>
    </div>
    <div class="punch-time-board">
      <div class="punch-time-board-box" id="punch-in">
        <p class="punch-time-board-box-title">출근 시간</p>
        <span class="punch-time-board-box-content">${punchInTime}</span>
      </div>
      <div class="punch-time-board-box" id="punch-out">
        <p class="punch-time-board-box-title">퇴근 시간</p>
        <span class="punch-time-board-box-content">${punchOutTime}</span>
      </div>
      <div class="punch-time-board-box" id="break-out">
        <p class="punch-time-board-box-title">외출 시간</p>
        <span class="punch-time-board-box-content">${breakOutTime}</span>
      </div>
      <div class="punch-time-board-box" id="break-in">
        <p class="punch-time-board-box-title">복귀 시간</p>
        <span class="punch-time-board-box-content">${breakInTime}</span>
      </div>
    </div>
  `;

  // 버튼
  const moreButton = new Button({
    className: 'punch-more-button',
    text: '상세 보기',
    color: 'gray',
    shape: 'block',
    fontSize: 'var(--font-small)',
    onClick: () => navigate(USER_PATH.WORK_DETAIL),
  });

  const createButton = (text, color, actionType) => {
    return new Button({
      className: `${actionType}-button`,
      text: text,
      color: color,
      shape: 'block',
      fontSize: 'var(--font-small)',
      onClick: async () => {
        const userData = await fetchUserData(userId);
        if (userData) {
          Modal(actionType); // 해당 모달 열기
        } else {
          console.error('사용자 데이터를 가져오지 못했습니다.');
        }
      },
    });
  };

  const punchInBtn = createButton('출근하기', 'green', 'punch-in');
  const punchOutBtn = createButton('퇴근하기', 'gray', 'punch-out');
  const breakOutBtn = createButton('외출하기', 'gray', 'break-out');
  const breakInBtn = createButton('복귀하기', 'green', 'break-in');

  const moreBtnContainer = container.querySelector('.punch-time-header');
  moreBtnContainer.appendChild(moreButton);

  const punchInBtnContainer = container.querySelector('#punch-in');
  punchInBtnContainer.appendChild(punchInBtn);

  const punchOutBtnContainer = container.querySelector('#punch-out');
  punchOutBtnContainer.appendChild(punchOutBtn);

  const breakOutBtnContainer = container.querySelector('#break-out');
  breakOutBtnContainer.appendChild(breakOutBtn);

  const breakInBtnContainer = container.querySelector('#break-in');
  breakInBtnContainer.appendChild(breakInBtn);

  // 현재 시간 업데이트 함수
  const startClock = () => {
    const timeElement = container.querySelector('.curr-time');
    setInterval(() => {
      timeElement.textContent = formatTimeWithSeconds(new Date());
    }, 1000);
  };
  startClock();
};

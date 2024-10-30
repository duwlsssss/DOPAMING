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
import { fetchUserData } from '../../../../../server/api/user'; // 사용자 데이터 가져오는 API

export const RenderPunchTime = (container, todayData) => {
  container.classList.add('punch-time');
  const today = formatDate(new Date());

  // 오늘 날짜에 해당하는 출퇴근 데이터를 가져옵니다.
  const punchInTime =
    todayData.length > 0 ? formatUserTime(todayData[0].punch_in) : '--시 --분';
  const punchOutTime =
    todayData.length > 0 ? formatUserTime(todayData[0].punch_out) : '--시 --분';
  const breakOutTime =
    todayData.length > 0 ? formatUserTime(todayData[0].break_out) : '--시 --분';
  const breakInTime =
    todayData.length > 0 ? formatUserTime(todayData[0].break_in) : '--시 --분';

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
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userData = await fetchUserData(user.uid);
          if (userData) {
            console.log('로그인된 사용자 ID:', userData.user_id); // 올바른 ID 로그
            Modal(actionType); // 해당 모달 열기
          } else {
            console.error('사용자 데이터를 가져오지 못했습니다.');
          }
        } else {
          console.log('사용자가 로그인하지 않았습니다.');
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

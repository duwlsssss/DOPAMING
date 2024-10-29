import './PunchTime.css';
import { Button } from '../../../ui/button/Button';
import navigate from '../../../../utils/navigation';
import {
  formatTimeWithSeconds,
  formatUserTime,
} from '../../../../utils/currentTime';
import { USER_PATH } from '../../../../utils/constants';
import { Modal } from '../../../ui/modal/Modal';
export const RenderPunchTime = (container, userInfo, today) => {
  container.classList.add('punch-time');
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
        <span class="punch-time-board-box-content">${formatUserTime(userInfo?.punch_in)}</span>
      </div>
      <div class="punch-time-board-box" id="punch-out">
        <p class="punch-time-board-box-title">퇴근 시간</p>
        <span class="punch-time-board-box-content">${formatUserTime(userInfo?.punch_out)}</span>
      </div>
      <div class="punch-time-board-box" id="break-out">
        <p class="punch-time-board-box-title">외출 시간</p>
        <span class="punch-time-board-box-content">${formatUserTime(userInfo?.break_out)}</span>
      </div>
      <div class="punch-time-board-box" id="break-in">
        <p class="punch-time-board-box-title">복귀 시간</p>
        <span class="punch-time-board-box-content">${formatUserTime(userInfo?.break_in)}</span>
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
  const punchInBtn = new Button({
    className: 'punch-in-button',
    text: '출근하기',
    color: 'green',
    shape: 'block',
    fontSize: 'var(--font-small)',
    onClick: () => {
      Modal('punch-in'); // 'punch-in' 모달 열기
    },
  });
  const punchOutBtn = new Button({
    className: 'punch-out-button',
    text: '퇴근하기',
    color: 'gray',
    shape: 'block',
    fontSize: 'var(--font-small)',
    onClick: () => {
      Modal('punch-out'); // 'punch-in' 모달 열기
    },
  });
  const breakOutBtn = new Button({
    className: 'break-out-btn',
    text: '외출하기',
    color: 'gray',
    shape: 'block',
    fontSize: 'var(--font-small)',
    onClick: () => {
      Modal('break-out'); // 'punch-in' 모달 열기
    },
  });

  const breakInBtn = new Button({
    className: 'break-in-btn',
    text: '복귀하기',
    color: 'green',
    shape: 'block',
    fontSize: 'var(--font-small)',
    onClick: () => {
      Modal('break-in'); // 'punch-in' 모달 열기
    },
  });

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

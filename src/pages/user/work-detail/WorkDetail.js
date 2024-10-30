import './WorkDetail.css';
import { WorkInfo } from '../../../../src/components/user/work-info/WorkInfo';
import { generateCalendar } from '../../../utils/generateCalendar';
import {
  fetchTimePunchData,
  getCurrentUserId,
} from '../../../../server/api/user';

let currentYear;
let currentMonth;
let filteredUsers = [];

const updatePunchInfo = (container, selectedDate) => {
  const punchInfoTime = container.querySelector('.punch-info-time');

  const selectedUserData = filteredUsers.find(
    user => user.punch_date === selectedDate,
  );

  if (selectedUserData) {
    const punchInTime = new Date(selectedUserData.punch_in);
    const punchOutTime = new Date(selectedUserData.punch_out);
    const breakOutTime = selectedUserData.break_out
      ? new Date(selectedUserData.break_out)
      : null;
    const breakInTime = selectedUserData.break_in
      ? new Date(selectedUserData.break_in)
      : null;

    punchInfoTime.innerHTML = `
      <p class="punch-in-time">${punchInTime.getHours()}시 ${punchInTime.getMinutes()}분</p>
      <p class="punch-out-time">${punchOutTime.getHours()}시 ${punchOutTime.getMinutes()}분</p>
      ${breakOutTime ? `<p class="break-outtime">${breakOutTime.getHours()}시 ${breakOutTime.getMinutes()}분</p>` : `<p class="break-outtime">--시 --분</p>`}
      ${breakInTime ? `<p class="break-in-time">${breakInTime.getHours()}시 ${breakInTime.getMinutes()}분</p>` : `<p class="break-in-time">--시 --분</p>`}
    `;
  } else {
    punchInfoTime.innerHTML = `
      <p class="punch-in-time">--시 --분</p>
      <p class="punch-out-time">--시 --분</p>
      <p class="break-outtime">--시 --분</p>
      <p class="break-in-time">--시 --분</p>
    `;
  }
};

export const RenderUserWorkDetail = async container => {
  const today = new Date();
  currentYear = today.getFullYear();
  currentMonth = today.getMonth();

  // 현재 로그인한 사용자 ID 가져오기
  getCurrentUserId(async userId => {
    if (!userId) {
      console.error('사용자가 로그인하지 않았습니다.');
      return;
    }

    // WorkInfo 컴포넌트 호출 및 사용자 데이터 삽입
    const { html: workInfoHTML } = await WorkInfo(userId, today);
    filteredUsers = await fetchTimePunchData(userId); // Firebase에서 사용자 데이터 가져오기

    container.innerHTML = `
      ${workInfoHTML}
      <div class="work-calendar-box">
        <div class="title-content"> 
          <span class="material-symbols-rounded calendar-before">arrow_circle_left</span>
          <p class="calendar-title">${currentYear}년 ${currentMonth + 1}월</p>
          <span class="material-symbols-rounded calendar-after">arrow_circle_right</span>
        </div>
        <div class="work-calendar"></div>
        <div class="punch-info-time"></div>
      </div>
    `;

    generateCalendar(container, currentYear, currentMonth, filteredUsers);
    updatePunchInfo(container, today.toISOString().split('T')[0]);

    // 아이콘 클릭
    container
      .querySelector('.calendar-before')
      .addEventListener('click', () => {
        if (currentMonth === 0) {
          currentYear -= 1;
          currentMonth = 11;
        } else {
          currentMonth -= 1;
        }
        generateCalendar(container, currentYear, currentMonth, filteredUsers);
        updatePunchInfo(
          container,
          container.querySelector('.punch-date').value,
        );
      });

    container.querySelector('.calendar-after').addEventListener('click', () => {
      if (currentMonth === 11) {
        currentYear += 1;
        currentMonth = 0;
      } else {
        currentMonth += 1;
      }
      generateCalendar(container, currentYear, currentMonth, filteredUsers);
      updatePunchInfo(container, container.querySelector('.punch-date').value);
    });

    // 날짜 선택
    container.querySelector('.punch-date').addEventListener('change', event => {
      const selectedDate = event.target.value;
      updatePunchInfo(container, selectedDate);
    });
  });
};

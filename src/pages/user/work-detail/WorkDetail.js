import './WorkDetail.css';
import axios from 'axios';

let currentYear; // 현재 연도
let currentMonth; // 현재 월
let users = []; // 사용자 데이터
let filteredUsers = []; // 필터링된 사용자 데이터

const generateCalendar = (container, year, month) => {
  const calendarContainer = container.querySelector('.work-calendar');
  const calendarTitle = container.querySelector('.calendar-title');
  calendarContainer.innerHTML = '';

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  daysOfWeek.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    calendarContainer.appendChild(dayElement);
  });

  const date = new Date(year, month, 1);
  const firstDay = date.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyElement = document.createElement('div');
    emptyElement.className = 'calendar-day';
    calendarContainer.appendChild(emptyElement);
  }

  for (let i = 1; i <= totalDays; i++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = i;

    const userDataForDate = filteredUsers.filter(user => {
      const punchDate = new Date(user.punch_date);
      return (
        punchDate.getDate() === i &&
        punchDate.getMonth() === month &&
        punchDate.getFullYear() === year
      );
    });

    // 사용자 데이터가 있을 경우
    if (userDataForDate.length > 0) {
      dayElement.innerHTML += `
        <p class="cal-punch-in-time">출근</p>
        <p class="cal-punch-out-time">퇴근</p>
      `;
    }

    calendarContainer.appendChild(dayElement);
  }

  calendarTitle.textContent = `${year}년 ${month + 1}월`;
};

const updatePunchInfo = (container, selectedDate) => {
  const punchInfoTime = container.querySelector('.punch-info-time');

  // 선택된 날짜에 해당하는 사용자 데이터 찾기
  const selectedUserData = filteredUsers.find(user => {
    const punchDate = new Date(user.punch_date);

    // selectedDate에서 하루 전날 계산
    const dayBeforeSelectedDate = new Date(selectedDate);
    dayBeforeSelectedDate.setDate(dayBeforeSelectedDate.getDate() - 1);

    return (
      punchDate.toISOString().split('T')[0] ===
      dayBeforeSelectedDate.toISOString().split('T')[0]
    ); // ISO 형식으로 비교
  });

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
      ${breakOutTime ? `<p class="break-outtime">${breakOutTime.getHours()}시 ${breakOutTime.getMinutes()}분</p>` : ''}
      ${breakInTime ? `<p class="break-in-time">${breakInTime.getHours()}시 ${breakInTime.getMinutes()}분</p>` : ''}
    `;
  } else {
    punchInfoTime.innerHTML = `
      <p class="punch-in-time">--시 --분</p>
      <p class="punch-out-time">--시 --분</p>
      <p class="break-ot-time">--시 --분</p>
      <p class="break-in-time">--시 --분</p>
    `;
  }
};

export const RenderUserWorkDetail = container => {
  const today = new Date();
  currentYear = today.getFullYear();
  currentMonth = today.getMonth();

  container.innerHTML = `
    <div class="work-header">
      <div class="work-title">
      <p class="work-title-text">출/퇴근 상세정보</p>
      <input type="date" class="punch-date" value="${today.toISOString().split('T')[0]}" />
      </div>
      <div class="work-content">
        <p class="work-desc">오늘 하루도 파이팅 하세요!<br>~님의 매일을 응원합니다</p>
        <div class="punch-info">
          <div class="punch-info-title">
            <p class="punch-in">출근</p>
            <p class="punch-out">퇴근</p>
            <p class="break-out">외출</p>
            <p class="break-in">복귀</p>
          </div>
          <div class="punch-info-time">
            <p class="punch-in-time">09시 02분</p>
            <p class="punch-out-time">17시 30분</p>
            <p class="break-outtime">12시 00분</p>
            <p class="break-in-time">12시 30분</p>
          </div>
        </div>
      </div>
    </div>
    <div class="work-calendar-box">
      <div class="title-content"> 
        <span class="material-symbols-rounded" id="calendar-befor">arrow_circle_right</span>
        <p class="calendar-title"></p>
        <span class="material-symbols-rounded" id="calendar-after">arrow_circle_right</span>
      </div>
      <div class="work-calendar"></div>
    </div>
  `;

  const jsonFilePath = '../../../../server/data/time_punch.json';

  const fetchUserData = async jsonFilePath => {
    try {
      const response = await axios.get(jsonFilePath);
      if (Array.isArray(response.data)) {
        users = response.data;

        const specificUserId = '231231232';
        filteredUsers = users.filter(user => user.user_id === specificUserId);

        generateCalendar(container, currentYear, currentMonth);
        updatePunchInfo(container, today.toISOString().split('T')[0]); // 오늘 날짜로 초기화

        // 버튼 클릭 이벤트 리스너 추가
        container
          .querySelector('#calendar-befor')
          .addEventListener('click', () => {
            if (currentMonth === 0) {
              currentYear -= 1;
              currentMonth = 11;
            } else {
              currentMonth -= 1;
            }
            generateCalendar(container, currentYear, currentMonth);
            updatePunchInfo(
              container,
              container.querySelector('.punch-date').value,
            ); // 날짜 업데이트
          });

        container
          .querySelector('#calendar-after')
          .addEventListener('click', () => {
            if (currentMonth === 11) {
              currentYear += 1;
              currentMonth = 0;
            } else {
              currentMonth += 1;
            }
            generateCalendar(container, currentYear, currentMonth);
            updatePunchInfo(
              container,
              container.querySelector('.punch-date').value,
            ); // 날짜 업데이트
          });
      }
    } catch (error) {
      console.error('사용자 데이터를 가져오는 중 오류 발생! :', error);
    }
  };

  fetchUserData(jsonFilePath);

  // 날짜 선택 이벤트 리스너 추가
  container.querySelector('.punch-date').addEventListener('change', event => {
    const selectedDate = event.target.value; // 선택된 날짜
    updatePunchInfo(container, selectedDate); // 해당 날짜의 정보 업데이트
  });
};

import './WorkDetail.css';

const generateCalendar = (container, year, month) => {
  const calendarContainer = container.querySelector('.work-calendar');
  calendarContainer.innerHTML = ''; // 기존 내용 초기화

  // 요일 추가
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  daysOfWeek.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    calendarContainer.appendChild(dayElement);
  });

  // 날짜 계산
  const date = new Date(year, month, 1);
  const firstDay = date.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // 빈 칸 추가
  for (let i = 0; i < firstDay; i++) {
    const emptyElement = document.createElement('div');
    emptyElement.className = 'calendar-day';
    calendarContainer.appendChild(emptyElement);
  }

  // 날짜 추가
  for (let i = 1; i <= totalDays; i++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = i;
    calendarContainer.appendChild(dayElement);
  }
};

export const RenderUserWorkDetail = container => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 현재 월 (0부터 시작)

  container.innerHTML = `
    <div class="work-header">
      <p class="work-title">출/퇴근 상세정보</p>
      <input type="date" class="punch-date" value="${today.toISOString().split('T')[0]}" />
    </div>

    <div class="work-content">
      <p class="work-desc">오늘 하루도 파이팅하세요!<br>~님의 매일을 응원합니다</p>
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

    <div class="work-calendar-box">
      <div class="title-content"> 
      <span class="material-symbols-outlined">arrow_circle_right</span>
        <p class="calendar-date"></p>
        <span class="material-symbols-outlined">arrow_circle_right</span>
        </div>
      <div class="work-calendar">
      </div>
    </div>
  `;

  // 동적 달력 생성
  generateCalendar(container, year, month);

  // calendar-title의 값을 변경
  const calendarTitle = container.querySelector('.calendar-date');
  calendarTitle.textContent = `${year}년 ${month + 1}월`;
};

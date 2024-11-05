export const RenderUserVacationSummary = (container, userData) => {
  const { user_name, user_totalHoliday, user_leftHoliday } = userData;
  const userUsedVc = user_totalHoliday - user_leftHoliday;

  container.innerHTML = `
    <div class="user-info-container">
      <div class="user-info-text">
        <div class="explain1"><span class="strong">${user_name}</span>님의</div>
        <div class="explain2">휴가 목록입니다.</div>
      </div>
      <div class="material-symbols-rounded icon">surfing</div>
    </div>
    <div class="user-vc-container" id="totalHoliday">
      <div class="user-vc-title" id="totalHolidayTitle">총 휴가 개수</div>
      <div class="user-vc-number" id="totalHolidayNumber">${user_totalHoliday}</div>
    </div>
    <div class="user-vc-container" id="used-holiday">
      <div class="user-vc-title" id="usedHolidayTitle">사용 휴가 개수</div>
      <div class="user-vc-number" id="usedHolidayNumber">${userUsedVc}</div>
    </div>
    <div class="user-vc-container" id="left-holiday">
      <div class="user-vc-title" id="totalHolidayTitle">잔여 휴가 개수</div>
      <div class="user-vc-number" id="totalHolidayNumber">${user_leftHoliday}</div>
    </div>
  `;
};

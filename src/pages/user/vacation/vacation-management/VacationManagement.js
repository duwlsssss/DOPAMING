import './VacationManagement.css';
import {
  RenderUserVacationHeader,
  RenderUserVacationList,
  RenderTitle,
  Button,
} from '../../../../components';
import { getUserAbs, fetchUserData } from '../../../../../server/api/user';
import { getItem } from '../../../../utils/storage';
import { USER_PATH } from '../../../../utils/constants';
import navigate from '../../../../utils/navigation';

export const RenderUserVacationManagement = async container => {
  if (!container) {
    console.error('Container가 준비되지 않음');
    return;
  }
  container.innerHTML = `<div class="loading">휴가 정보를 가져오는 중입니다.</div>`;

  try {
    // 현재 사용자 ID
    const userID = getItem('userID');

    // 사용자 정보+부재 정보 가져오기
    const userAbsDatas = await getUserAbs(userID);
    const userData = await fetchUserData(userID);

    // 사용자 이름 추출
    const userName = userData?.user_name;
    // 총 휴가 개수
    const userTotalVc = userData?.user_totalHoliday;
    // 남은 휴가 개수
    const userLeftVc = userData?.user_leftHoliday;
    // 사용 휴가 개수
    const userUsedVc =
      userTotalVc - userLeftVc >= 0 ? userTotalVc - userLeftVc : 0;

    container.innerHTML = `
      <div class="user-vaction-management-title-container"></div>
      <div class="vacation-management-explain-container">
        <div class="user-info-container">
          <div class="user-info-text">
            <div class="explain1"><span class="strong">${userName}</span>님의</div>
            <div class="explain2">휴가 목록입니다.</div>
          </div>
          <div class="material-symbols-rounded icon">
            surfing
          </div>
        </div>
        <div class="user-vc-container" id="totalHoliday">
            <div class="user-vc-title" id="totalHolidayTitle">총 휴가 개수</div>
            <div class="user-vc-number" id="totalHolidayNumber">${userTotalVc}</div>
        </div>
        <div class="user-vc-container" id="used-holiday">
            <div class="user-vc-title" id="usedHolidayTitle">사용 휴가 개수</div>
            <div class="user-vc-number" id="usedHolidayNumber">${userUsedVc}</div>
        </div>
        <div class="user-vc-container" id="left-holiday">
            <div class="user-vc-title" id="totalHolidayTitle">잔여 휴가 개수</div>
            <div class="user-vc-number" id="totalHolidayNumber">${userLeftVc}</div>
        </div>
      </div>
      <div id="userVacationHeaderSection"></div>
      <div id="userVacationListSection"></div>
    `;

    const uploadBtn = new Button({
      className: 'vc-upload-btn',
      text: '부재 신청',
      color: 'skyblue',
      shape: 'block',
      fontSize: 'var(--font-small)',
      onClick: () => navigate(USER_PATH.VACATIONREQUSET),
    });

    const titleContainer = container.querySelector(
      '.user-vaction-management-title-container',
    );
    RenderTitle(titleContainer, '잔여 휴가');

    const buttonPosition = container.querySelector(
      '.user-vaction-management-title-container',
    );
    buttonPosition.appendChild(uploadBtn);

    const headerSection = container.querySelector('#userVacationHeaderSection');
    const vacationListSection = container.querySelector(
      '#userVacationListSection',
    );
    RenderUserVacationHeader(headerSection, userAbsDatas);
    RenderUserVacationList(vacationListSection, userAbsDatas);
  } catch (error) {
    let errorMessage = '데이터를 불러오는 중 오류가 발생했습니다.';

    console.error('오류 내용:', error);

    container.innerHTML = `
      <div class="admin-vacation-section error">
        ${errorMessage}
      </div>
    `;
  }
};

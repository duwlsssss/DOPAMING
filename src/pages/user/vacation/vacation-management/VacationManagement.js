import './VacationManagement.css';
import {
  RenderUserVacationHeader,
  RenderUserVacationList,
  RenderTitle,
  RenderUserVacationSummary,
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
    const userID = getItem('userID');

    const userAbsDatas = await getUserAbs(userID);
    const userData = await fetchUserData(userID);

    container.innerHTML = `
      <div class="user-vaction-management-title-container" id="userVacationTitleSection"></div>
      <div class="vacation-management-explain-container" id="userVacationSummary"></div>
      <div id="userVacationHeaderSection"></div>
      <div id="userVacationListSection"></div>
    `;

    const titleContainer = container.querySelector('#userVacationTitleSection');
    RenderTitle(titleContainer, '잔여 휴가');

    const summaryContainer = container.querySelector('#userVacationSummary');
    RenderUserVacationSummary(summaryContainer, userData);

    const uploadBtn = new Button({
      className: 'vc-upload-btn',
      text: '부재 신청',
      color: 'skyblue',
      shape: 'block',
      fontSize: 'var(--font-small)',
      disabled: userData.user_leftHoliday === 0,
      onClick: () => navigate(USER_PATH.VACATIONREQUEST),
    });
    titleContainer.appendChild(uploadBtn);

    const headerSection = container.querySelector('#userVacationHeaderSection');
    RenderUserVacationHeader(headerSection, userAbsDatas);

    const vacationListSection = container.querySelector(
      '#userVacationListSection',
    );
    RenderUserVacationList(vacationListSection, userAbsDatas);
  } catch (error) {
    console.error('오류 발생:', error);
    container.innerHTML = `
      <div class="user-vacation-management-error">
        데이터 불러오는 중 오류 발생.
      </div>
    `;
  }
};

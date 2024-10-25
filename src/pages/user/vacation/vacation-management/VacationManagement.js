import './VacationManagement.css';
import {
  RenderUserVacationHeader,
  RenderUserVacationList,
  RenderTitle,
  Button,
} from '../../../../components';
import axios from 'axios';
import { getItem } from '../../../../utils/storage';
import { USER_PATH } from '../../../../utils/constants';
import navigate from '../../../../utils/navigation';

export const RenderUserVacationManagement = async container => {
  try {
    // 사용자 정보, 부재 정보 가져오기
    const userAbsDatas = await fetchAbsData();

    const userAbsData = userAbsDatas.filter(
      data => data.user_id === getItem('userID'),
    );

    const userAbsDatafirst = userAbsData[0];

    // 사용자 이름 추출
    const userName = userAbsDatafirst.user_name;
    // 총 휴가 개수
    const userTotalVc = userAbsDatafirst.user_totalHoliday;
    // 남은 휴가 개수
    const userLeftVc = userAbsDatafirst.user_leftHoliday;
    // 사용 휴가 개수
    let userUsedVc = 0;
    if (userTotalVc - userLeftVc >= 0) {
      userUsedVc = userTotalVc - userLeftVc;
    } else {
      console.log('휴가 계산 잘못됨');
    }

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
      onClick: () => navigate(USER_PATH.VACATIONREQUEST),
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
    RenderUserVacationHeader(headerSection);
    RenderUserVacationList(vacationListSection, userAbsData);
  } catch (error) {
    let errorMessage = '데이터를 불러오는 중 오류가 발생했습니다.';

    console.error('오류 내용:', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || errorMessage}`;
      } else if (error.request) {
        errorMessage = '서버로부터 응답을 받지 못했습니다.';
      }
    }

    container.innerHTML = `
      <div class="admin-vacation-section error">
        ${errorMessage}
      </div>
    `;
  }
};

const fetchAbsData = async () => {
  const [absencesResponse, usersResponse] = await Promise.all([
    axios.get('../../server/data/absences.json'),
    axios.get('../../server/data/users.json'),
  ]);

  const absences = absencesResponse.data;
  const users = usersResponse.data;

  return absences.map(absence => {
    const user = users.find(user => user.user_id === absence.user_id);
    return {
      ...absence,
      user_name: user.user_name,
      user_phone: user.user_phone,
      user_position: user.user_position,
      user_leftHoliday: user.user_leftHoliday,
      user_totalHoliday: user.user_totalHoliday,
    };
  });
};

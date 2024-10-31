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

// 사용자 데이터 가져오기
const fetchUserData = async userID => {
  console.log('fetchUserData 함수 호출됨');
  try {
    const db = getDatabase();
    const usersRef = ref(db, 'Users');
    const usersSnapshot = await get(usersRef);
    const users = usersSnapshot.exists() ? usersSnapshot.val() : {};
    return users[userID] || null;
  } catch (error) {
    console.error('사용자 데이터 가져오기 실패:', error);
    return null;
  }
};

// 부재 데이터 가져오기
const fetchAbsData = async userID => {
  console.log('fetchAbsData 함수 호출됨');
  try {
    const db = getDatabase();
    const absencesRef = ref(db, 'absences');
    const absencesSnapshot = await get(absencesRef);
    const absences = absencesSnapshot.exists() ? absencesSnapshot.val() : [];

    console.log('전체 부재 데이터:', absences); // 전체 부재 데이터 확인

    // Object.values로 부재 데이터 배열 생성
    const userAbsences = Object.values(absences).flatMap(absenceGroup =>
      Object.values(absenceGroup).filter(absence => absence.user_id === userID),
    );

    console.log('사용자 부재 데이터:', userAbsences); // 필터링된 부재 데이터 확인

    return userAbsences; // 필터링된 부재 데이터 반환
  } catch (error) {
    console.error('부재 데이터 가져오기 실패:', error);
    return null; // 실패 시 null 반환
  }
};

// 사용자 휴가 관리 렌더링
export const RenderUserVacationManagement = async container => {
  if (!container) {
    console.error('Container가 준비되지 않음');
    return;
  }

  container.innerHTML = `<div class="loading">휴가 정보를 가져오는 중입니다.</div>`;

  try {
    // 현재 사용자 ID
    const userID = getItem('userID');
    const userData = await fetchUserData(userID);

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

    // 초기 HTML 설정
    container.innerHTML = `
      <div class="user-vaction-management-title-container"></div>
      <div class="vacation-management-explain-container">
        <div class="user-info-container">
          <div class="user-info-text">
            <div class="explain1"><span class="strong">${userName}</span>님의</div>
            <div class="explain2">휴가 목록입니다.</div>
          </div>
          <div class="material-symbols-rounded icon">surfing</div>
        </div>
        <div class="user-vc-container" id="totalHoliday">
            <div class="user-vc-title">총 휴가 개수</div>
            <div class="user-vc-number">${userTotalVc}</div>
        </div>
        <div class="user-vc-container" id="used-holiday">
            <div class="user-vc-title">사용 휴가 개수</div>
            <div class="user-vc-number">${userUsedVc}</div>
        </div>
        <div class="user-vc-container" id="left-holiday">
            <div class="user-vc-title">잔여 휴가 개수</div>
            <div class="user-vc-number">${userLeftVc}</div>
        </div>
      </div>
      <div id="userVacationHeaderSection"></div>
      <div id="userVacationListSection"></div>
      <div class="absence-message" id="absenceMessage"></div>
    `;

    // 부재 신청 버튼
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
    titleContainer.appendChild(uploadBtn);

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

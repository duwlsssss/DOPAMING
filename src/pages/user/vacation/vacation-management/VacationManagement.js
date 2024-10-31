import './VacationManagement.css';
import {
  RenderUserVacationHeader,
  RenderUserVacationList,
  RenderTitle,
  Button,
} from '../../../../components';
import { getDatabase, ref, get } from 'firebase/database';
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
    const userID = getItem('userID');
    const userData = await fetchUserData(userID);

    // 사용자 데이터가 없으면 기본값 설정
    const userName = userData ? userData.user_name : '알 수 없음';
    const userTotalVc = userData ? userData.user_totalHoliday : 0;
    const userLeftVc = userData ? userData.user_leftHoliday : 0;
    const userUsedVc = Math.max(userTotalVc - userLeftVc, 0); // 잔여 휴가가 0 이상이 되도록

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

    // 부재 데이터 가져오기
    const absenceData = await fetchAbsData(userID);
    if (!absenceData || absenceData.length === 0) {
      const absenceMessage = container.querySelector('#absenceMessage');
      absenceMessage.textContent = '부재가 존재하지 않습니다.';
    } else {
      RenderUserVacationHeader(headerSection, absenceData);
      RenderUserVacationList(vacationListSection, absenceData);
    }
  } catch (error) {
    console.error('오류 내용:', error);
    const absenceMessage = container.querySelector('#absenceMessage');
    absenceMessage.textContent = '데이터를 가져오는 중 오류가 발생했습니다.';
  }
};

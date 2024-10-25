import { RenderTitle } from '../../../common/title/Title';
import './VacationHeader.css';
import { RenderUserVacationList } from '../vacation-list/VacationList';
import { sortByName } from '../../../../utils/sortByName';

export const RenderUserVacationHeader = (container, UserAbsData) => {
  container.innerHTML = `
    <header class="user-vacation-management-header">
      <div id="userVactionTitleContainer"></div>
      <div class="user-vacation-management-header-controls">
        <select class="user-vacation-management-filter" id="typeFilter">
          <option value="vacation-all">전체</option>
          <option value="vacation">휴가</option>
          <option value="sick">병가</option>
          <option value="official">공가</option>
        </select>
        <select class="user-vacation-management-filter" id="statusFilter">
          <option value="approved-all">전체</option>
          <option value="approved">승인</option>
          <option value="rejected">거부</option>
          <option value="pending">대기</option>
        </select>
      </div>
    </header>
  `;

  const typeFilter = container.querySelector('#typeFilter');
  const statusFilter = container.querySelector('#statusFilter');
  const vacationListContainer = document.querySelector(
    '#userVacationListSection',
  ); //dom에서 찾아야 함

  const filteredList = () => {
    const filters = {
      type: typeFilter.value,
      status: statusFilter.value,
    };

    let sortedAbsenceUsersData = sortByName(UserAbsData);

    if (filters.type !== 'vacation-all') {
      const absType = {
        vacation: '휴가',
        sick: '병가',
        official: '공가',
      };
      sortedAbsenceUsersData = sortedAbsenceUsersData.filter(
        absence => absence.abs_type === absType[filters.type],
      );
    }

    if (filters.status !== 'approved-all') {
      const statusType = {
        approved: '승인',
        rejected: '거부',
        pending: '대기',
      };
      sortedAbsenceUsersData = sortedAbsenceUsersData.filter(
        absence => absence.abs_status === statusType[filters.status],
      );
    }
    // 필터링된 데이터를 RenderUserVacationList에 전달해 렌더링
    RenderUserVacationList(vacationListContainer, sortedAbsenceUsersData);
  };

  typeFilter.addEventListener('change', filteredList);
  statusFilter.addEventListener('change', filteredList);

  const titleContainer = document.querySelector('#userVactionTitleContainer');
  RenderTitle(titleContainer, '휴가/공가 관리');
  // 초기 렌더링
  filteredList();
};

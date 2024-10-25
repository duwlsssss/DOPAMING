import { RenderTitle } from '../../common/title/Title';
import './VacationHeader.css';
import { RenderAdminVacationManagementList } from './VacationList';

export const RenderAdminVacationManagementHeader = container => {
  container.innerHTML = `
    <header class="admin-vacation-management-header">
      <div id="adminVactionTitleContainer"></div>
      <div class="admin-vacation-management-header-controls">
        <select class="admin-vacation-management-filter" id="typeFilter">
          <option value="vacation-all">전체</option>
          <option value="vacation">휴가</option>
          <option value="sick">병가</option>
          <option value="official">공가</option>
        </select>
        <select class="admin-vacation-management-filter" id="statusFilter">
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

  const filteredList = () => {
    const filters = {
      type: typeFilter.value,
      status: statusFilter.value,
    };
    const vacationListContainer = document.querySelector(
      '#adminVacationMangementListSection',
    );
    RenderAdminVacationManagementList(vacationListContainer, filters);
  };

  typeFilter.addEventListener('change', filteredList);
  statusFilter.addEventListener('change', filteredList);

  const titleContainer = document.querySelector('#adminVactionTitleContainer');
  RenderTitle(titleContainer, '휴가/공가 관리');
};

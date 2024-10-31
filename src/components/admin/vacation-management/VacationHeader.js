import { RenderTitle } from '../../common/title/Title';
import './VacationHeader.css';
import { RenderAdminVacationManagementList } from './VacationList';
import { vacationStore } from '../../../utils/vacationStore';

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

  const handleFilterChange = async () => {
    vacationStore.setFilter({
      type: typeFilter.value,
      status: statusFilter.value,
    });

    const vacationListContainer = document.querySelector(
      '#adminVacationMangementListSection',
    );
    await RenderAdminVacationManagementList(vacationListContainer);
  };

  typeFilter.addEventListener('change', handleFilterChange);
  statusFilter.addEventListener('change', handleFilterChange);

  const titleContainer = container.querySelector('#adminVactionTitleContainer');
  RenderTitle(titleContainer, '휴가/공가 관리');
};

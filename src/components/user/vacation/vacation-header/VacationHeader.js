import { RenderTitle } from '../../../common/title/Title';
import './VacationHeader.css';

export const RenderUserVacationHeader = container => {
  container.innerHTML = `
    <header class="user-vacation-management-header">
      <div id="userVactionTitleContainer"></div>
      <div class="user-vacation-management-header-controls">
        <select class="user-vacation-management-filter">
          <option value="vacation-all">전체</option>
          <option value="vacation">휴가</option>
          <option value="sick">병가</option>
          <option value="official">공가</option>
        </select>
        <select class="user-vacation-management-filter">
          <option value="approved-all">전체</option>
          <option value="approved">승인</option>
          <option value="rejected">거부</option>
          <option value="pending">대기</option>
        </select>
      </div>
    </header>
  `;

  const titleContainer = document.querySelector('#userVactionTitleContainer');
  RenderTitle(titleContainer, '휴가/공가 관리');
};

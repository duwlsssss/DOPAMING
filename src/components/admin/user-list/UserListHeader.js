import { RenderTitle } from '../../common/title/Title';
import './UserListHeader.css';

export const RenderUserListHeader = container => {
  container.innerHTML = `
      <header class="member-header">
        <div id="titleContainer"></div>
        <div class="header-controls">
          <select class="member-filter">
            <option value="all">전체</option>
            <option value="student">수강생</option>
            <option value="manager">매니저</option>
          </select>
          <button color="gray" shape="block" class="more-btn">더 보기</button>
      </div>
    </header>
    `;

  const titleContainer = document.querySelector('#titleContainer');
  RenderTitle(titleContainer, '직원 목록');
};

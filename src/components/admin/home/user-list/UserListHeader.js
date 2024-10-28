import { RenderTitle } from '../../../common/title/Title';
import { RenderUserList } from './UserList';
import { ADMIN_PATH } from '../../../../utils/constants';
import { Button } from '../../../ui/button/Button';
import navigate from '../../../../utils/navigation';
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
          <div class="admin-main-user-list-more-button"></div>
      </div>
    </header>
    `;

  const memberFilter = container.querySelector('.member-filter');
  memberFilter.addEventListener('change', e => {
    const selectedFilter = e.target.value;
    const userListContainer = document.querySelector(
      '#adminMainUserListSection',
    );
    RenderUserList(userListContainer, selectedFilter);
  });

  // 더 보기 버튼 클릭 시
  const moreButtonContainer = container.querySelector(
    '.admin-main-user-list-more-button',
  );
  const moreButton = new Button({
    text: '더 보기',
    color: 'gray',
    shape: 'block',
    padding: '6px 12px',
    fontSize: 'var(--font-small)',
    onClick: () => navigate(ADMIN_PATH.MEMBER),
  });

  moreButtonContainer.appendChild(moreButton);

  const titleContainer = document.querySelector('#titleContainer');
  RenderTitle(titleContainer, '직원 목록');
};

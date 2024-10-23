import { RenderTitle } from '../../common/title/Title';
import { RenderUserList } from './UserList';
import { ADMIN_PATH } from '../../../utils/constants';
import navigate from '../../../utils/navigation';
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

  const memberFilter = container.querySelector('.member-filter');
  memberFilter.addEventListener('change', e => {
    const selectedFilter = e.target.value;
    const userListContainer = document.querySelector('#userListSection');
    RenderUserList(userListContainer, selectedFilter);
  });

  // 더 보기 버튼 클릭 시
  const moreButton = container.querySelector('.more-btn');
  moreButton.addEventListener('click', e => {
    e.preventDefault();
    navigate(ADMIN_PATH.MEMBER);
  });

  const titleContainer = document.querySelector('#titleContainer');
  RenderTitle(titleContainer, '직원 목록');
};

import { RenderUserListHeader } from '../../../components/admin/user-list/UserListHeader';
import { RenderUserList } from '../../../components/admin/user-list/UserList';
import './Home.css';

export const RenderAdminHome = container => {
  container.innerHTML = `
    <main class="admin-container">
      <div id="headerSection"></div>
      <div id="userListSection"></div>
    </main>
  `;

  const headerSection = document.querySelector('#headerSection');
  const userListSection = document.querySelector('#userListSection');

  RenderUserListHeader(headerSection);
  RenderUserList(userListSection);
};

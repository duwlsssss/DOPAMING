import { RenderUserListHeader } from '../../../components/admin/home/user-list/UserListHeader';
import { RenderUserList } from '../../../components/admin/home/user-list/UserList';
import { RenderAdminHomeNoticeHeader } from '../../../components/admin/home/notice/NoticeHeader';
import { RenderAdminHomeNotice } from '../../../components/admin/home/notice/Notice';

import './Home.css';

export const RenderAdminHome = container => {
  container.innerHTML = `
    <main class="admin-container">
      <section>
        <div id="adminMainUserHeaderSection"></div>
        <div id="adminMainUserListSection"></div>
      </section>

      <section>
        <div id="adminMainNoticeHeaderSection"></div>
        <div id="adminMainNoticeListSection"></div>
      </section>
    </main>
  `;

  const headerSection = document.querySelector('#adminMainUserHeaderSection');
  const userListSection = document.querySelector('#adminMainUserListSection');
  const noticeHeaderSection = document.querySelector(
    '#adminMainNoticeHeaderSection',
  );
  const noticeListSection = document.querySelector(
    '#adminMainNoticeListSection',
  );

  RenderUserListHeader(headerSection);
  RenderUserList(userListSection);
  RenderAdminHomeNoticeHeader(noticeHeaderSection);
  RenderAdminHomeNotice(noticeListSection);
};

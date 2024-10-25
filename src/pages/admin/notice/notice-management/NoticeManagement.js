import { RenderAdminNoticeManagementHeader } from '../../../../components/admin/notice-management/NoticeManagementHeader';
import { RenderAdminNoticeManagementList } from '../../../../components/admin/notice-management/NoticeManagementList';

import './NoticeManagement.css';

export const RenderAdminNoticeManagement = container => {
  container.innerHTML = `
    <main class="admin-notice-management-container">
      <div id="adminNoticeManagementHeaderSection"></div>
      <div id="adminNoticeManagementListSection"></div>
    </main>
  `;

  const headerSection = document.querySelector(
    '#adminNoticeManagementHeaderSection',
  );
  const noticeListSection = document.querySelector(
    '#adminNoticeManagementListSection',
  );

  RenderAdminNoticeManagementHeader(headerSection);
  RenderAdminNoticeManagementList(noticeListSection);
};

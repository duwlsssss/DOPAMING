import { RenderAdminNoticeManagementHeader } from '../../../../components/admin/notice-management/NoticeManagementHeader';
import { RenderAdminNoticeManagementList } from '../../../../components/admin/notice-management/NoticeManagementList';
import { RenderTitle } from '../../../../components/common/title/Title';

import './NoticeManagement.css';

export const RenderAdminNoticeManagement = container => {
  container.innerHTML = `
    <main class="admin-notice-management-container">
      <div id="adminNoticeManagementHeaderSection"></div>
      <div id="adminNoticeManagementListSection"></div>
    </main>
  `;

  const updateTotalCount = count => {
    const titleContainer = document.querySelector('#adminNoticeTitleContainer');
    RenderTitle(titleContainer, `공지사항 (${count}개)`);
  };

  const headerSection = document.querySelector(
    '#adminNoticeManagementHeaderSection',
  );
  const noticeListSection = document.querySelector(
    '#adminNoticeManagementListSection',
  );

  RenderAdminNoticeManagementHeader(headerSection);
  RenderAdminNoticeManagementList(noticeListSection, updateTotalCount);
};

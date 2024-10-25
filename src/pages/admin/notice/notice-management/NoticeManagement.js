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

  const headerSection = document.querySelector(
    '#adminNoticeManagementHeaderSection',
  );
  const noticeListSection = document.querySelector(
    '#adminNoticeManagementListSection',
  );

  // 공지사항 개수를 업데이트
  const updateTotalCount = count => {
    const titleContainer = document.querySelector('#adminNoticeTitleContainer');
    RenderTitle(titleContainer, `공지사항 (${count}개)`);
  };

  // 검색어 입력 시 공지사항 목록을 필터링
  const handleSearch = searchInput => {
    RenderAdminNoticeManagementList(
      noticeListSection,
      updateTotalCount,
      searchInput,
    );
  };

  RenderAdminNoticeManagementHeader(headerSection, handleSearch);
  RenderAdminNoticeManagementList(noticeListSection, updateTotalCount);
};

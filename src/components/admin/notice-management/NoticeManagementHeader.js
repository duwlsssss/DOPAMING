import navigate from '../../../utils/navigation';
import { RenderTitle } from '../../common/title/Title';
import { Button } from '../../ui/button/Button';
import { ADMIN_PATH } from '../../../utils/constants';
import './NoticeManagementHeader.css';

export const RenderAdminNoticeManagementHeader = container => {
  container.innerHTML = `
        <header class="admin-notice-management-header">
            <div id="adminNoticeTitleContainer"></div>
            <div class="admin-notice-management-header-controls">
              <div class="admin-notice-search">
                <input type="text" class="admin-notice-search-input" placeholder="Search"/>
                <span class="material-symbols-rounded">search</span> 
              </div>
              <div class="admin-notice-management-more-button"></div>
            </div>
        </header>
    `;

  const moreBtnContainer = document.querySelector(
    '.admin-notice-management-more-button',
  );
  const moreButton = new Button({
    text: '업로드',
    color: 'skyblue',
    shape: 'block',
    padding: '6px var(--space-medium)',
    cursor: 'pointer',
    onClick: () => navigate(ADMIN_PATH.NOTICE_UPLOAD),
  });

  moreBtnContainer.appendChild(moreButton);

  const titleContainer = document.querySelector('#adminNoticeTitleContainer');
  RenderTitle(titleContainer, '공지사항 (0개)');
};

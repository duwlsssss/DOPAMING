import { RenderTitle } from '../../../common/title/Title';
import navigate from '../../../../utils/navigation';
import { ADMIN_PATH } from '../../../../utils/constants';
import { Button } from '../../../ui/button/Button';
import './NoticeHeader.css';

export const RenderAdminHomeNoticeHeader = container => {
  container.innerHTML = `
    <header class="notice-header">
      <div id="noticeTitleContainer"></div>
      <div class="header-controls">
        <div class="admin-main-notice-more-button"></div>
      </div>
    </header>
  `;

  const moreBtnContainer = document.querySelector(
    '.admin-main-notice-more-button',
  );
  const moreButton = new Button({
    text: '더 보기',
    color: 'gray',
    shape: 'block',
    fontSize: 'var(--font-small)',
    padding: '6px 12px',
    onClick: () => navigate(ADMIN_PATH.NOTICE),
  });

  moreBtnContainer.appendChild(moreButton);

  const noticeTitleContainer = document.querySelector('#noticeTitleContainer');
  RenderTitle(noticeTitleContainer, '공지 게시판');
};

import { RenderTitle } from '../../../common/title/Title';
import { navigate } from '../../../../utils/navigation';
import { ADMIN_PATH } from '../../../../utils/constants';
import './NoticeHeader.css';

export const RenderAdminHomeNoticeHeader = container => {
  container.innerHTML = `
    <header class="notice-header">
      <div id="noticeTitleContainer"></div>
      <div class="header-controls">
        <button color="gray" shape="block" class="notice-more-btn">더 보기</button>
      </div>
    </header>
  `;

  const moreBtn = document.querySelector('.notice-more-btn');
  moreBtn.addEventListener('click', e => {
    e.preventDefault();
    navigate(ADMIN_PATH.NOTICE);
  });

  const noticeTitleContainer = document.querySelector('#noticeTitleContainer');
  RenderTitle(noticeTitleContainer, '공지 게시판');
};

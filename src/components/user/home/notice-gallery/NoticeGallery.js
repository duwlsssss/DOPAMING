import './NoticeGallery.css';
import { Button } from '../../../ui/button/Button';
import { RenderNoticeItem } from '../../../common/notice/NoticeItem';
import navigate from '../../../../utils/navigation';
import { USER_PATH } from '../../../../utils/constants';

export const RenderNoticeGallery = (container, noticeData) => {
  container.classList.add('notice-gallery');

  // 공지사항 목록
  const noticeItems = noticeData
    .map(
      post => `
        <div class="notice-item-container" id="notice-${post.post_id}" post-id="${post.post_id}">
          ${RenderNoticeItem(null, post)}
        </div>
      `,
    )
    .join('');

  container.innerHTML = `
    <div class="notice-gallery-header">
      <p>공지 게시판</p>
    </div>
    <div class="notice-list">
      ${noticeItems}
    </div>
  `;

  const moreButton = new Button({
    className: 'notice-more-button',
    text: '더보기',
    color: 'gray',
    shape: 'block',
    fontSize: 'var(--font-small)',
    onClick: () => navigate(USER_PATH.NOTICE),
  });

  const moreBtnContainer = container.querySelector('.notice-gallery-header');
  moreBtnContainer.appendChild(moreButton);

  // 공지사항 클릭 시 notice-detail 페이지로 이동
  const attachClickHandlersToNotices = () => {
    const noticeItems = container.querySelectorAll('.notice-item-container');
    noticeItems.forEach(item => {
      item.addEventListener('click', () => {
        const postId = item.getAttribute('post-id');
        navigate(`/notice/${postId}`);
      });
    });
  };

  attachClickHandlersToNotices();
};

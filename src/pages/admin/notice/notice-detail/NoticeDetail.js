import { RenderAdminNoticeDetailItem } from '../../../../components/admin/notice-detail/NoticeDetailItem';

export const RenderAdminNoticeDetail = (container, noticeId) => {
  container.innerHTML = `
      <div class="notice-detail-container"></div>
    `;

  const noticeDetailContainer = container.querySelector(
    '.notice-detail-container',
  );
  RenderAdminNoticeDetailItem(noticeDetailContainer, noticeId);
};

import { RenderAdminNoticeItem } from '../../common/notice/AdminNoticeItem';
import './NoticeManagementItem.css';

export const RenderAdminNoticeManagementItem = post => {
  return RenderAdminNoticeItem({
    post,
    itemContainerClassName: 'notice-manage-item',
    imageClassName: 'notice-manage-image',
    contentContainerClassName: 'notice-manage-content',
    contentTitleClassName: 'notice-manage-title',
    contentDescriptionClassName: 'notice-manage-description',
    contentDateClassName: 'notice-manage-date',
  });
};

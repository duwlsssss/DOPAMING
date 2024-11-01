import { RenderAdminNoticeItem } from '../../../common/notice/AdminNoticeItem';
import './NoticeItem.css';

export const RenderNoticeItem = post => {
  return RenderAdminNoticeItem({
    post,
    itemContainerClassName: 'notice-item',
    imageClassName: 'notice-image',
    contentContainerClassName: 'notice-content',
    contentTitleClassName: 'notice-title',
    contentDescriptionClassName: 'notice-description',
    contentDateClassName: 'notice-date',
  });
};

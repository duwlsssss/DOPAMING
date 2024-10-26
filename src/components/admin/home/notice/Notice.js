import { RenderAdminNoticeList } from '../../../common/notice/AdminNoticeList';
import { RenderNoticeItem } from './NoticeItem';
import './Notice.css';

export const RenderAdminHomeNotice = async container => {
  await RenderAdminNoticeList({
    container,
    renderItemComponent: RenderNoticeItem,
    containerClassName: 'admin-notice-list',
    itemClassName: 'admin-notice-container',
    itemIdPrefix: 'admin-notice',
  });
};

import { RenderAdminNoticeList } from '../../common/notice/AdminNoticeList';
import { RenderAdminNoticeManagementItem } from './NoticeManagementItem';
import './NoticeManagementList.css';

export const RenderAdminNoticeManagementList = async (
  container,
  onDataLoad,
) => {
  await RenderAdminNoticeList({
    container,
    renderItemComponent: RenderAdminNoticeManagementItem,
    containerClassName: 'admin-notice-manage-list',
    itemClassName: 'admin-notice-manage-container',
    itemIdPrefix: 'admin-notice-manage',
    onDataLoad,
  });
};

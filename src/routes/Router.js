import { RenderHeader, RenderNavbar } from '../components';
import RenderLayout from '../layout/Layout';
import extractParams from '../utils/extractParams';
import {
  RenderAdminHome,
  RenderAdminMemberManagement,
  RenderUserHome,
  RenderUserNoticeList,
  RenderUserNoticeDetail,
  RenderUserEditProfile,
  RenderUserVacationRequest,
  RenderUserPeer,
  RenderUserCourse, // 추가
  RenderNotFound,
  RenderLogIn,
  RenderAdminVacationManagement,
  RenderUserWorkDetail,
  RenderAdminMemberDetail,
  RenderUserVacationManagement,
  RenderAdminNoticeManagement,
  RenderAdminUploadMember,
  RenderAdminEditNotice,
  RenderAdminUploadNotice,
} from '../pages';
import {
  ADMIN_PATH,
  USER_PATH,
  ADMIN_TITLE,
  USER_TITLE,
  ADMIN_ICON,
  USER_ICON,
  // ICONS,
} from '../utils/constants';

import { getIsMobile } from '../utils/responsive';
import { getItem } from '../utils/storage';
import { RenderAdminNoticeDetail } from '../pages/admin/notice/notice-detail/NoticeDetail';

export default function Router() {
  const path = window.location.pathname;

  const isMobile = getIsMobile();
  const role = getItem('userRole');

  const root = document.querySelector('#root');

  // 로그인하지 않은 사용자
  if (!role) {
    // 로그인 페이지가 아닌 다른 페이지에 접근하려고 할 때
    if (path !== '/login') {
      window.location.replace('/login');
      return;
    }

    RenderLogIn(root, '../../server/data/users.json');
    return;
  }

  // 로그인한 사용자의 권한에 맞지 않는 경로로 접근하려고 할 때
  if (role === 'admin' && !path.startsWith(ADMIN_PATH.HOME)) {
    window.location.replace(ADMIN_PATH.HOME);
    return;
  } else if (role === 'user' && path.startsWith(ADMIN_PATH.HOME)) {
    window.location.replace(USER_PATH.HOME);
    return;
  }

  RenderLayout(root);

  const headerEl = document.querySelector('header');
  const navbarEl = document.querySelector('nav');
  const contentEl = document.querySelector('.content');

  if (role === 'admin') {
    RenderHeader(headerEl);
    RenderNavbar(navbarEl, false, [
      { path: ADMIN_PATH.HOME, title: ADMIN_TITLE.HOME, icon: ADMIN_ICON.HOME },
      {
        path: ADMIN_PATH.MEMBER,
        title: ADMIN_TITLE.MEMBER,
        icon: ADMIN_ICON.MEMBER,
      },
      {
        path: ADMIN_PATH.VACATION,
        title: ADMIN_TITLE.VACATION,
        icon: ADMIN_ICON.VACATION,
      },
      {
        path: ADMIN_PATH.NOTICE,
        title: ADMIN_TITLE.NOTICE,
        icon: ADMIN_ICON.NOTICE,
      },
    ]);
  } else {
    RenderHeader(headerEl, USER_PATH.EDIT_PROFILE);
    if (isMobile) {
      RenderNavbar(navbarEl, true, [
        { path: USER_PATH.NOTICE, title: '공지목록', icon: USER_ICON.NOTICE },
        {
          path: USER_PATH.VACATION,
          title: '휴가/공가',
          icon: USER_ICON.VACATION,
        },
        { path: USER_PATH.HOME, title: USER_TITLE.HOME, icon: USER_ICON.HOME },
        { path: USER_PATH.PEER, title: '수강생', icon: USER_ICON.PEER },
        {
          path: USER_PATH.COURSE,
          title: USER_TITLE.COURSE,
          icon: USER_ICON.COURSE,
        },
      ]);
    } else {
      RenderNavbar(navbarEl, true, [
        { path: USER_PATH.HOME, title: USER_TITLE.HOME, icon: USER_ICON.HOME },
        {
          path: USER_PATH.EDIT_PROFILE,
          title: USER_TITLE.EDIT_PROFILE,
          icon: USER_ICON.EDIT_PROFILE,
        },
        {
          path: USER_PATH.WORK_DETAIL,
          title: USER_TITLE.WORK_DETAIL,
          icon: USER_ICON.WORK_DETAIL,
        },
        {
          path: USER_PATH.VACATION,
          title: USER_TITLE.VACATION,
          icon: USER_ICON.VACATION,
        },
        {
          path: USER_PATH.NOTICE,
          title: USER_TITLE.NOTICE,
          icon: USER_ICON.NOTICE,
        },
        { path: USER_PATH.PEER, title: USER_TITLE.PEER, icon: USER_ICON.PEER },
        {
          path: USER_PATH.COURSE,
          title: USER_TITLE.COURSE,
          icon: USER_ICON.COURSE,
        },
      ]);
    }
  }
  // 경로에서 동적 매개변수 추출

  //postId 추출
  const paramsFormNotice = extractParams(`${USER_PATH.NOTICE}/:postId`, path);
  const paramsFormAdminNotice = extractParams(
    `${ADMIN_PATH.NOTICE}/:noticeId`,
    path,
  );

  const paramsFormAdminNoticeEdit = extractParams(
    `${ADMIN_PATH.NOTICE_EDIT}/:noticeId`,
    path,
  );
  //memberId 추출
  const paramsFormMember = extractParams(
    `${ADMIN_PATH.MEMBER}/:memberId`,
    path,
  );
  const postId = paramsFormNotice ? paramsFormNotice.postId : null;
  const noticeId = paramsFormAdminNotice
    ? paramsFormAdminNotice.noticeId
    : null;

  const editNoticeId = paramsFormAdminNoticeEdit
    ? paramsFormAdminNoticeEdit.noticeId
    : null;
  const memberId = paramsFormMember ? paramsFormMember.memberId : null;

  if (path === ADMIN_PATH.HOME) {
    RenderAdminHome(contentEl);
  } else if (path === ADMIN_PATH.MEMBER) {
    RenderAdminMemberManagement(contentEl);
  } else if (path === ADMIN_PATH.MEMBER_UPLOAD) {
    RenderAdminUploadMember(contentEl);
  } else if (memberId && ADMIN_PATH.MEMBER) {
    RenderAdminMemberDetail(contentEl, memberId);
  } else if (noticeId !== 'upload' && noticeId && ADMIN_PATH.NOTICE) {
    RenderAdminNoticeDetail(contentEl, noticeId);
  } else if (editNoticeId && ADMIN_PATH.NOTICE_EDIT) {
    RenderAdminEditNotice(contentEl, editNoticeId);
  } else if (path === ADMIN_PATH.VACATION) {
    RenderAdminVacationManagement(contentEl);
  } else if (path === ADMIN_PATH.NOTICE) {
    RenderAdminNoticeManagement(contentEl);
  } else if (path === ADMIN_PATH.NOTICE_UPLOAD) {
    RenderAdminUploadNotice(contentEl);
  } else if (path === USER_PATH.HOME) {
    RenderUserHome(contentEl);
  } else if (path === USER_PATH.NOTICE) {
    RenderUserNoticeList(contentEl);
  } else if (postId) {
    // postId가 있는 경우(동적 경로가 매칭된 경우)
    RenderUserNoticeDetail(contentEl, postId);
  } else if (path === USER_PATH.EDIT_PROFILE) {
    RenderUserEditProfile(contentEl);
  } else if (path === USER_PATH.VACATION) {
    RenderUserVacationManagement(contentEl);
  } else if (path === USER_PATH.VACATIONREQUSET) {
    RenderUserVacationRequest(contentEl);
  } else if (path === USER_PATH.PEER) {
    RenderUserPeer(contentEl);
  } else if (path === USER_PATH.WORK_DETAIL) {
    RenderUserWorkDetail(contentEl);
  } else if (path === USER_PATH.COURSE) {
    RenderUserCourse(contentEl);
  } else {
    RenderNotFound(root);
  }
}

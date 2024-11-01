import { RenderNoticeItem } from '../../../../components';
import {
  getAllNotices,
  getUserIdName,
  fetchUserData,
} from '../../../../../server/api/user';
import navigate from '../../../../utils/navigation';
import './NoticeList.css';

export const RenderUserNoticeList = async container => {
  container.innerHTML = `<div class="loading">공지 정보를 가져오는 중입니다.</div>`;

  try {
    const posts = await getAllNotices();

    const userInfo = await getUserIdName();

    const user = await fetchUserData(userInfo.id);

    const bcName = user.user_bootcamp;

    const renderNoticeItems = filteredPosts => {
      return filteredPosts
        .map(
          post => `
          <div class="user-notice-item-container" id="notice-${post.post_id}" post-id="${post.post_id}"></div> 
        `,
        )
        .join('');
    };

    container.innerHTML = `
      <header class="user-notice-list-header">
        <div class="user-notice-title"></div> 
        <div class="user-notice-search">
          <input type="text" class="user-notice-search-input" placeholder="Search"/>
          <span class="material-symbols-rounded">search</span> 
        </div>
      </header>
      <div class="user-notice-list">
        ${renderNoticeItems(posts)}
      </div>
    `;

    // MEDIA
    const NoticeListTitle = container.querySelector('.user-notice-title');
    const updateNoticeTitleText = () => {
      if (window.innerWidth <= 767) {
        NoticeListTitle.innerHTML = '공지 목록';
      } else {
        NoticeListTitle.innerHTML = `<span class="strong">${bcName}</span>의 공지목록입니다.`;
      }
    };
    updateNoticeTitleText();
    window.addEventListener('resize', updateNoticeTitleText);

    //notice-item-container클릭시 notice-detail 페이지로 이동하게 함
    //모든 notice-item-container에 클릭 이벤트 핸들러 연결함
    const attachClickHandlersToNotices = () => {
      const noticeItems = container.querySelectorAll(
        '.user-notice-item-container',
      );
      noticeItems.forEach(item => {
        item.addEventListener('click', () => {
          const postId = item.getAttribute('post-id');
          navigate(`/notice/${postId}`);
        });
      });
    };

    // 필터링 결과에 따라 DOM 업데이트할 함수
    const updateNotices = filteredPosts => {
      const noticeList = document.querySelector('.user-notice-list');
      if (filteredPosts.length === 0) {
        //검색 결과 없으면
        noticeList.innerHTML = `
         <div class="user-notice-filter-error-message">찾으시는 공지가 없습니다.</div>
        `;
      } else {
        noticeList.innerHTML = renderNoticeItems(filteredPosts);
        filteredPosts.forEach(post => {
          const postContainer = document.getElementById(
            `notice-${post.post_id}`,
          );
          if (postContainer) {
            //해당 id를 가진 post가 있으면
            RenderNoticeItem(postContainer, post); //각 공지 렌더링
          }
        });
      }
      attachClickHandlersToNotices();
    };

    // 검색 함수
    const searchInput = document.querySelector('.user-notice-search-input');
    searchInput.addEventListener('input', e => {
      const searchTerm = e.target.value.toLowerCase(); //소문자로 맞춰서 검색할 거임
      const filteredPosts = posts.filter(post => {
        const titleMatch = post.post_title.toLowerCase().includes(searchTerm);
        const descriptionMatch = post.post_description
          .toLowerCase()
          .includes(searchTerm);
        const dateMatch = new Date(post.updated_at)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchTerm);
        return titleMatch || descriptionMatch || dateMatch;
      });

      //검색 결과 업데이트에 따라 필터링된 공지 렌더링
      updateNotices(filteredPosts);
    });

    updateNotices(posts); //처음엔 전체 공지 렌더링
  } catch (error) {
    console.error('공지 리스트 렌더링 중 에러가 발생했습니다:', error);
  }
};

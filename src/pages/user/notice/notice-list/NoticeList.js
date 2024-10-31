import axios from 'axios';
import { RenderNoticeItem } from '../../../../components';
// import { getItem } from '../../../../utils/storage';
import navigate from '../../../../utils/navigation';
import './NoticeList.css';

// RenderNoticeItem을 정의 (또는 import)
const RenderNoticeItem = (container, post) => {
  container.innerHTML = `
    <div class="notice-item">
      <img src="${post.post_image}" alt="${post.post_title}" />
      <h3>${post.post_title}</h3>
      <p>${post.post_description}</p>
      <span>${new Date(post.updated_at).toLocaleString()}</span>
    </div>
  `;
};

export const RenderUserNoticeList = async container => {
  try {
    const response = await axios.get('../../server/data/company_posts.json');
    const posts = response.data.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    ); //업데이트 일자 기준 내림차순 정렬

    const usersResponse = await axios.get('../../server/data/users.json');
    let users = usersResponse.data;
    // const userId = getItem('userID');
    const userId = '231231232'; // 임의로 설정
    const bcName = users.find(user => user.user_id === userId).user_bootcamp;

    // Firebase에서 공지 데이터 가져오기
    const noticesRef = ref(db, 'Notices'); // Notices 경로 참조
    onValue(noticesRef, snapshot => {
      const posts = [];
      snapshot.forEach(childSnapshot => {
        const post = childSnapshot.val();
        posts.push({ post_id: childSnapshot.key, ...post });
      });

      // 업데이트 일자 기준 내림차순 정렬
      posts.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      // 사용자 정보 가져오기
      const usersRef = ref(db, 'users'); // 사용자 데이터 경로 참조
      onValue(usersRef, userSnapshot => {
        const users = [];
        userSnapshot.forEach(userChildSnapshot => {
          users.push(userChildSnapshot.val());
        });

        // 현재 사용자 찾기
        const currentUser = users.find(user => user.user_id === userId);
        const headerTitle = currentUser
          ? '공지목록입니다.'
          : '사용자 정보 없음';

        // 공지 항목 렌더링
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
            <div class="user-notice-title"><span class="strong">${headerTitle}</span></div> 
            <div class="user-notice-search">
              <input type="text" class="user-notice-search-input" placeholder="Search"/>
              <span class="material-symbols-rounded">search</span> 
            </div>
          </header>
          <div class="user-notice-list">
            ${renderNoticeItems(posts)}
          </div>
        `;

        // 공지 항목 클릭 핸들러
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
                RenderNoticeItem(postContainer, post); // 각 공지 렌더링
              }
            });
          }
          attachClickHandlersToNotices();
        };

        // 검색 기능
        const searchInput = document.querySelector('.user-notice-search-input');
        searchInput.addEventListener('input', e => {
          const searchTerm = e.target.value.toLowerCase();
          const filteredPosts = posts.filter(post => {
            const titleMatch = post.post_title
              .toLowerCase()
              .includes(searchTerm);
            const descriptionMatch = post.post_description
              .toLowerCase()
              .includes(searchTerm);
            const dateMatch = new Date(post.updated_at)
              .toLocaleDateString()
              .toLowerCase()
              .includes(searchTerm);
            return titleMatch || descriptionMatch || dateMatch;
          });
          updateNotices(filteredPosts);
        });

        updateNotices(posts); // 처음엔 전체 공지 렌더링
      });
    });
  } catch (error) {
    console.error('공지 리스트 렌더링 중 에러가 발생했습니다:', error);
  }
};

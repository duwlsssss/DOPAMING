import './Peer.css';
import { setupSearch } from '../../../components/user/peer-list/PeerList';

export const RenderUserPeer = container => {
  container.innerHTML = `
    <div class="peer-header">
      <p class="peer-title">여러분들의 동료 수강생 목록입니다.</p>
      <div class="search-bar">
        <input type="text" placeholder="Search" id="searchInput">
        <button id="searchButton">검색</button>
      </div>
    </div>
    <div class="peer-box"></div>
  `;

  // 더미데이터 생성
  const users = Array.from({ length: 50 }, (_, index) => ({
    name: `수강생 ${index + 1}`,
    email: `N${index + 1}@naver.com`,
  }));

  let currentIndex = 0;
  const initialItems = 15; // 처음 보여줄 항목 수
  const itemsPerPage = 5; // 스크롤 시 추가로 불러올 항목 수
  let filteredUsers = users; // 필터링된 사용자 목록

  const renderUsers = (container, startIndex, endIndex) => {
    const userMarkup = filteredUsers
      .slice(startIndex, endIndex)
      .map(
        user => `
      <div class="peer-frame">
        <div class="image-circle">
          <img src="/assets/imgs/profile/profile_null.jpg" />
        </div>
        <p class="peer-name">${user.name}</p>
        <p class="peer-email">${user.email}</p>
      </div>
    `,
      )
      .join('');

    container.innerHTML += userMarkup;
  };

  const peerBox = container.querySelector('.peer-box');
  renderUsers(peerBox, currentIndex, initialItems);
  currentIndex += initialItems;

  peerBox.addEventListener('scroll', () => {
    if (peerBox.scrollTop + peerBox.clientHeight >= peerBox.scrollHeight) {
      // 스크롤을 아래로 내릴 경우 기존 사용자 목록에서 5개씩 추가로 불러오기
      if (currentIndex < filteredUsers.length) {
        renderUsers(peerBox, currentIndex, currentIndex + itemsPerPage);
        currentIndex += itemsPerPage;
      }
    }
  });

  // 검색 기능 설정
  setupSearch(
    container,
    peerBox,
    users,
    renderUsers,
    initialItems,
    newFilteredUsers => {
      filteredUsers = newFilteredUsers;
    },
  ); // 검색 기능을 설정
};

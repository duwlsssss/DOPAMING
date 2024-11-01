import { setupSearch } from '../../../components/user/peer-list/PeerList';
import { fetchAllUsersData } from '../../../../server/api/user'; // 모든 사용자 데이터 가져오는 함수

export const RenderUserPeer = async container => {
  container.innerHTML = `
    <div class="peer-header">
      <p class="peer-title">여러분들의 동료 수강생 목록입니다.</p>
      <div class="peer-search-bar">
        <input type="text" placeholder="Search" class="peer-search-input">
        <span class="material-symbols-rounded peer-search-icon">search</span>
      </div>
    </div>
    <div class="peer-box"></div>
  `;

  const peerTitle = container.querySelector('.peer-title'); // .peer-title 요소 선택

  let users = []; // 사용자 데이터를 담을 배열
  let filteredUsers = []; // 필터링된 사용자 목록

  const renderUsers = container => {
    const userMarkup = filteredUsers
      .map(
        user => `
        <div class="peer-frame">
          <div class="image-circle">
            <img src='${user.user_image || '/assets/imgs/profile/profile_null.jpg'}'/>
          </div>
          <p class="peer-name">${user.user_name}</p>
          <p class="peer-email">${user.user_email}</p>
        </div>
        `,
      )
      .join('');
    container.innerHTML = userMarkup; // 모든 사용자 렌더링
  };

  const peerBox = container.querySelector('.peer-box');

  // 사용자 데이터 가져오기
  const fetchUserData = async () => {
    users = await fetchAllUsersData(); // 모든 사용자 데이터 가져오기
    filteredUsers = users;

    // 모든 사용자 렌더링
    renderUsers(peerBox);
  };

  // 사용자 데이터 가져오기 후 검색 기능 설정
  await fetchUserData();

  // 검색 기능 설정
  setupSearch(
    container,
    peerBox,
    users,
    renderUsers,
    null, // 초기 항목 수 필요 없음
    newFilteredUsers => {
      filteredUsers = newFilteredUsers;
      renderUsers(peerBox); // 필터링된 사용자 렌더링
    },
  );

  // MEDIA
  const updatePeerTitleText = () => {
    if (window.innerWidth <= 767) {
      peerTitle.textContent = '수강생 목록';
    } else {
      peerTitle.textContent = '여러분들의 동료 수강생 목록입니다.';
    }
  };

  updatePeerTitleText();
  window.addEventListener('resize', updatePeerTitleText);
};

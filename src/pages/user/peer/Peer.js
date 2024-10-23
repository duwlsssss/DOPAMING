import './Peer.css';

const users = Array.from({ length: 50 }, (_, index) => ({
  name: `조병찬 ${index + 1}`,
  email: `whqudcks${index + 1}@naver.com`,
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
      <div class="image-circle">이미지</div>
      <p class="peer-name">${user.name}</p>
      <p class="peer-email">${user.email}</p>
    </div>
  `,
    )
    .join('');

  container.innerHTML += userMarkup; // 기존 내용에 추가
};

const handleSearch = (input, peerBox) => {
  // 입력값에 기반하여 사용자를 필터링
  filteredUsers = users.filter(
    user => user.name.includes(input) || user.email.includes(input),
  );

  currentIndex = 0; // 인덱스 초기화

  // peer-box 내의 모든 peer-frame 제거
  const peerFrames = peerBox.querySelectorAll('.peer-frame');
  peerFrames.forEach(frame => frame.remove()); // 모든 peer-frame 제거

  // 필터링된 목록 렌더링
  renderUsers(
    peerBox,
    currentIndex,
    Math.min(initialItems, filteredUsers.length),
  );
  currentIndex += Math.min(initialItems, filteredUsers.length);
};

export const RenderUserPeer = container => {
  container.innerHTML = `
    <div class="peer-header">
      <div class="peer-title">여러분들의 동료 수강생 목록입니다.</div>
      <div class="search-bar">
        <input type="text" placeholder="Search" id="searchInput">
        <button id="searchButton">검색</button>
      </div>
    </div>
    <div class="peer-box"></div>
  `;

  const peerBox = container.querySelector('.peer-box');
  renderUsers(peerBox, currentIndex, initialItems); // 처음 15개 렌더링
  currentIndex += initialItems;

  peerBox.addEventListener('scroll', () => {
    if (peerBox.scrollTop + peerBox.clientHeight >= peerBox.scrollHeight) {
      // 스크롤을 아래로 내릴 경우 기존 사용자 목록에서 5개씩 추가로 불러오기
      if (currentIndex < filteredUsers.length) {
        renderUsers(peerBox, currentIndex, currentIndex + itemsPerPage); // 5개씩 추가
        currentIndex += itemsPerPage;
      }
    }
  });

  // 검색 기능
  const searchButton = container.querySelector('#searchButton');
  const searchInput = container.querySelector('#searchInput');

  searchButton.addEventListener('click', () => {
    handleSearch(searchInput.value, peerBox); // 검색 버튼 클릭 시 검색 수행
  });
};

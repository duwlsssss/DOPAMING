import './PeerList.css';

export const handleSearch = (
  input,
  peerBox,
  users,
  renderUsers,
  initialItems,
  setFilteredUsers,
) => {
  // 입력값에 기반하여 사용자를 필터링
  const filteredUsers = users.filter(
    user => user.name.includes(input) || user.email.includes(input),
  );

  // peer-box 내의 모든 peer-frame 제거
  const peerFrames = peerBox.querySelectorAll('.peer-frame');
  peerFrames.forEach(frame => frame.remove()); // 모든 peer-frame 제거

  // 필터링된 목록 렌더링
  if (filteredUsers.length > 0) {
    peerBox.innerHTML = '';
    setFilteredUsers(filteredUsers); // 필터링된 사용자 목록 업데이트
    renderUsers(peerBox, 0, Math.min(initialItems, filteredUsers.length));
  } else {
    // 사용자가 존재하지 않음을 알리는 메시지 출력
    peerBox.innerHTML = '<p class="no-results">사용자가 존재하지 않습니다.</p>';
  }
};

export const setupSearch = (
  container,
  peerBox,
  users,
  renderUsers,
  initialItems,
  setFilteredUsers,
) => {
  const searchButton = container.querySelector('#searchButton');
  const searchInput = container.querySelector('#searchInput');

  searchButton.addEventListener('click', () => {
    handleSearch(
      searchInput.value,
      peerBox,
      users,
      renderUsers,
      initialItems,
      setFilteredUsers,
    ); // 검색 버튼 클릭 시 검색 수행
  });
};

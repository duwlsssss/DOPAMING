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
    user =>
      user.user_name.toLowerCase().includes(input.toLowerCase()) ||
      user.user_email.toLowerCase().includes(input.toLowerCase()),
  );

  // peer-box 초기화
  const peerFrames = peerBox.querySelectorAll('.peer-frame');
  peerFrames.forEach(frame => frame.remove());

  // 필터링된 목록 렌더링
  if (filteredUsers.length > 0) {
    peerBox.innerHTML = '';
    setFilteredUsers(filteredUsers); // 필터링된 사용자 목록 업데이트
    renderUsers(peerBox, 0, Math.min(initialItems, filteredUsers.length));
  } else {
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
  const searchInput = container.querySelector('.peer-search-input');
  const searchIcon = container.querySelector('.peer-search-icon');

  // 아이콘 클릭시..
  searchIcon.addEventListener('click', () => {
    handleSearch(
      searchInput.value,
      peerBox,
      users,
      renderUsers,
      initialItems,
      setFilteredUsers,
    );
  });
};

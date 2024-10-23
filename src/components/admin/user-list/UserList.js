import axios from 'axios';
import './UserList.css';

export const RenderUserList = async (container, filter = 'all') => {
  container.innerHTML =
    '<div class="loading">직원 정보를 가져오는 중입니다.</div>';

  try {
    const response = await axios.get('../../../../server/data/users.json');
    const users = response.data;

    // 필터링
    const filteredUsers =
      filter === 'all'
        ? users
        : users.filter(user => {
            switch (filter) {
              case 'student':
                return user.user_position === '수강생';
              case 'manager':
                return user.user_position === '매니저';
              default:
                return true;
            }
          });

    const displayUsers = filteredUsers.slice(0, 10);

    container.innerHTML = `
      <section class="member-section">
        <div class="member-list">
          <ul class="member-grid">
            ${displayUsers
              .map(
                user => `
                <li class="member-item">
                  <div class="member-info">
                    <div class="status-dot active"></div>
                    <img src="${user.user_image}" alt="${user.user_name}" class="member-avatar">
                    <span class="role">${user.user_position}</span>
                    <span class="name">${user.user_name}</span>
                    <span class="email">${user.user_email}</span>
                    <span class="phone">${user.user_phone}</span>
                  </div>
                  <button color="skyblue" shape="block" class="detail-btn">상세 보기</button>
                </li>
              `,
              )
              .join('')}
          </ul>
        </div>
      </section>
    `;

    const detailButtons = container.querySelectorAll('.detail-btn');
    detailButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        handleDetailClick(displayUsers[index]);
      });
    });
  } catch (error) {
    let errorMessage = '데이터를 불러오는 중 오류가 발생했습니다.';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || errorMessage}`;
      } else if (error.request) {
        errorMessage = '서버로부터 응답을 받지 못했습니다.';
      }
    }

    container.innerHTML = `
      <div class="member-section error">
        ${errorMessage}
      </div>
    `;
    console.error('Error fetching users:', error);
  }

  const handleDetailClick = user => {
    console.log('선택된 직원 정보: ', user);
  };
};

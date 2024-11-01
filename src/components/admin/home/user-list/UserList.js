import axios from 'axios';

import navigate from '../../../../utils/navigation';
import { sortByName } from '../../../../utils/sortByName';
import { Button } from '../../../ui/button/Button';
import { ADMIN_PATH } from '../../../../utils/constants';
import './UserList.css';
import { adminFetchMeber } from '../../../../../server/api/admin';

export const RenderUserList = async (container, filter = 'all') => {
  container.innerHTML = `<div class="admin-loading">직원 정보를 가져오는 중입니다.</div>`;

  try {
    const response = await adminFetchMeber();
    const users = response;
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
    const sortedDisplayUsers = sortByName(displayUsers);

    container.innerHTML = `
      <section class="admin-member-section">
        <div class="admin-member-list">
          <ul class="admin-member-grid">
            ${sortedDisplayUsers
              .map(
                (user, index) => `
                <li class="admin-member-item">
                  <div class="admin-member-info">
                    <div class="admin-status-dot active"></div>
                    <img src="${user.user_image}" alt="${user.user_name}" class="admin-member-avatar">
                    <span class="admin-role">${user.user_position}</span>
                    <span class="admin-name">${user.user_name}</span>
                    <span class="admin-email">${user.user_email}</span>
                    <span class="admin-phone">${user.user_phone}</span>
                  </div>
                  <div class="admin-main-user-list-detail-button-container" data-index="${index}"></div>
                </li>
              `,
              )
              .join('')}
          </ul>
        </div>
      </section>
    `;

    // 상세 보기 버튼 처리
    const handleDetailClick = user => {
      navigate(`${ADMIN_PATH.MEMBER}/${user.user_id}`);
    };

    // 각 detail-button-container에 버튼 추가
    const buttonContainers = container.querySelectorAll(
      '.admin-main-user-list-detail-button-container',
    );
    buttonContainers.forEach((container, index) => {
      const detailButton = Button({
        text: '상세 보기',
        color: 'skyblue',
        shape: 'block',
        width: 200,
        onClick: () => handleDetailClick(sortedDisplayUsers[index]),
      });

      container.appendChild(detailButton);
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
      <div class="admin-member-section error">
        ${errorMessage}
      </div>
    `;
    console.error('Error fetching users:', error);
  }
};

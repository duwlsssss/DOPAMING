import { ApiClient } from '../../../../apis/ApiClient';
import { Button } from '../../../../components';
import { Pagenation } from '../../../../components/common/pagenation/Pagenation';
import './MemberManagement.css';

export const RenderAdminMemberManagement = async container => {
  let currentPage = 1; // 현재 페이지
  const itemsPerPage = 6; // 페이지당 보여줄 아이템 수

  const deleteButton = Button({
    width: 80,
    text: '삭제',
    color: 'coral',
    shape: 'block',
  });
  const uploadButton = Button({
    width: 80,
    text: '업로드',
    color: 'skyblue-light',
    shape: 'block',
  });

  const USER_URL = '../../../../../server/data/users.json';
  async function fetchUsers() {
    try {
      const userData = await ApiClient(USER_URL);
      return userData;
    } catch (e) {
      console.error(e);
    }
  }

  const users = await fetchUsers();

  //데이터, 총 데이터 수, 보여주고자 하는 갯수
  const paginateUsers = (users, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  };

  // 페이지 변경 시 사용자 목록을 업데이트하는 함수
  const updateUserList = page => {
    const paginatedUsers = paginateUsers(users.data, page, itemsPerPage);
    const userList = renderUserList(paginatedUsers);
    container.querySelector('.user-section').innerHTML = userList;
  };

  // 초기 렌더링
  const initialUsers = paginateUsers(users.data, currentPage, itemsPerPage);
  const userList = renderUserList(initialUsers);

  function renderUserList(users) {
    return users
      .map(user => {
        const detailButton = Button({
          width: 150,
          text: '상세보기',
          color: 'skyblue',
          id: user.user_id,
          shape: 'block',
        });
        return `
        <div class="user-wrapper">
          <label>
            <input type="checkbox" id=${user.user_id}>
            <span class="custom-checkbox">
            </span>        
          </label>
          <div class="user-item">
            <div class="circle1">              
            </div>
            <div class="circle">      
              <img src="${user.user_image}" alt="프로필 이미지"/>        
            </div>
            <div class="user-list">
              <p>${user.user_position}</p>
              <p>${user.user_name}</p>
              <p>${user.user_email}</p>
              <p>${user.user_phone}</p>
              ${detailButton.outerHTML}
            </div>

          </div>
        </div>
      `;
      })
      .join('');
  }

  container.innerHTML = `
    <div class="user-container">
      <div class="user-top">
        <h1>직원 목록</h1>    
        <div class="user-update">
          <select>
            <option>수강생</option>
            <option>매니저</option>
          </select>
          <input type="text" placeholder="Search"/>
          <button>
            <span class="material-symbols-rounded">
              search
            </span> 
          </button>
        </div>
      </div>
      <section class="user-section">
          ${userList}
      </section>
      <div class="pagination">
      
    </div>
    </div>
  `;
  const paginationContainer = Pagenation(
    users.data.length,
    itemsPerPage,
    currentPage,
    page => {
      // 현재 페이지 몇번째 페이지인지 확인
      currentPage = page;
      // 모든 버튼의 활성화 상태를 제거하고 새로운 페이지 버튼을 활성화
      const allButtons = container.querySelectorAll('.pagination-btn');
      allButtons.forEach(button => button.classList.remove('active'));

      const activeButton = container.querySelector(`[data-page="${page}"]`);
      if (activeButton) {
        activeButton.classList.add('active');
      }

      updateUserList(page);
    },
  );

  container.querySelector('.pagination').appendChild(paginationContainer);

  const userTop = container.querySelector('.user-update');
  userTop.appendChild(deleteButton);
  userTop.appendChild(uploadButton);
  fetchUsers();
};

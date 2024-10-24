import { ApiClient } from '../../../../apis/ApiClient';
import { Button } from '../../../../components';
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

  // 페이지네이션 버튼 생성
  const renderPaginationButtons = (totalUsers, itemsPerPage) => {
    const totalPages = Math.ceil(totalUsers / itemsPerPage);
    const paginationContainer = document.createElement('div'); // 페이지네이션 버튼들을 담을 컨테이너

    for (let i = 1; i <= totalPages; i++) {
      const paginationButton = Button({
        width: 50, // 너비는 필요에 맞게 조정
        text: `${i}`, // 버튼에 페이지 번호 표시
        color: 'transparent', // 필요에 따라 색상 설정
        id: `page-${i}`, // 페이지 번호를 id로 설정
        shape: 'white', // 버튼 모양 지정
      });
      if (i === 1) {
        paginationButton.classList.add('active');
      }
      // 페이지 번호를 data 속성에 추가
      paginationButton.setAttribute('data-page', i);
      paginationButton.classList.add('pagination-btn'); // 버튼 클릭을 처리할 클래스를 추가

      // 페이지네이션 컨테이너에 버튼 추가
      paginationContainer.appendChild(paginationButton);
    }
    return paginationContainer; // HTML 요소를 반환
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
  const paginationButtons = renderPaginationButtons(
    users.data.length,
    itemsPerPage,
  );

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
  // 페이지네이션 버튼을 추가
  container.querySelector('.pagination').appendChild(paginationButtons);

  // 페이지네이션 버튼 클릭 이벤트 처리
  container.querySelector('.pagination').addEventListener('click', e => {
    if (e.target.classList.contains('pagination-btn')) {
      currentPage = parseInt(e.target.dataset.page);

      const allButtons = container.querySelectorAll('.pagination-btn');
      allButtons.forEach(button => button.classList.remove('active'));

      e.target.classList.add('active');

      updateUserList(currentPage);
    }
  });

  const userTop = container.querySelector('.user-update');
  userTop.appendChild(deleteButton);
  userTop.appendChild(uploadButton);
  fetchUsers();
};

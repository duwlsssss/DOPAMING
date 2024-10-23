import './UserList.css';

export const RenderUserList = container => {
  container.innerHTML = `
    <section class="member-section">
      <div class="member-list">
        <ul class="member-grid">
          <li class="member-item">
            <div class="member-info">
              <div class="status-dot active"></div>
              <img src="https://placeimg.com/100/100/people" alt="직원 프로필" class="member-avatar">
              <span class="role">조병찬</span>
              <span class="name">수강생</span>
              <span class="email">email@email.com</span>
              <span class="phone">010-1234-5678</span>
            </div>
            <button color="skyblue" shape="block" class="detail-btn">상세 보기</button>
          </li>
        </ul>
      </div>
    </section>
    `;
};

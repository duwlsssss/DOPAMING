import './NoticeForm.css';

export const NoticeForm = () => {
  return /*html */ `
    <div class="notice-form-container">
      <div class="notice-from-title">
        <p>공지 제목</p>
        <input type="text" placeholder="원하시는 공지 제목을 입력해주세요!" class="notice-from-title-input" />
      </div>      
      <div class="notice-from-description">
        <p>공지 설명</p>
        <input type="text" placeholder="공지의 내용을 간략히 설명해주세요!" class="notice-from-description-input"/>
      </div>
      <div class="notice-from-content">
        <p>공지 내용</p>
        <input type="text" placeholder="원하시는 공지의 내용을 작성해주세요!" class="notice-from-content-input"/>
      </div>      
    </div>
  `;
};

import { Accordion } from '../../../ui/accordion/Accordion';
import { Button } from '../../../ui/button/Button';
import './VacationList.css';

export const RenderUserVacationList = async (container, userAbsData) => {
  console.log(userAbsData);

  // 다운로드 버튼
  const downloadButton = new Button({
    text: '다운로드',
    color: 'skyblue',
    shape: 'block',
    padding: 'var(--space-xsmall) var(--space-small)',
  });

  // 승인, 거부, 대기 버튼
  const renderButtons = status => {
    switch (status) {
      case '승인': {
        const cancelApproveButton = new Button({
          text: '승인 취소',
          color: 'gray',
          shape: 'block',
          padding: 'var(--space-small) var(--space-large)',
        });

        return `
          <div class="approval-button-group">
            ${cancelApproveButton.outerHTML}
          </div>
        `;
      }
      case '거부': {
        const cancelDenyButton = new Button({
          text: '거부 취소',
          color: 'gray',
          shape: 'block',
          padding: 'var(--space-small) var(--space-large)',
        });

        return `
          <div class="approval-button-group">
            ${cancelDenyButton.outerHTML}
          </div>
        `;
      }
      case '대기': {
        const approveButton = new Button({
          text: '승인하기',
          color: 'skyblue-light',
          shape: 'block',
          padding: 'var(--space-small) var(--space-large)',
        });

        const rejectButton = new Button({
          text: '거부하기',
          color: 'coral',
          shape: 'block',
          padding: 'var(--space-small) var(--space-large)',
        });

        return `
          <div class="approval-button-group">
            ${approveButton.outerHTML}
            ${rejectButton.outerHTML}
          </div>
        `;
      }
      default:
        return '';
    }
  };

  // 아코디언 헤더
  const renderHeader = item => `
    <header class="user-vacation-info">
      <div class="user-vacation-status-dot active"></div>
      <img src="${item.user_image}" alt="${item.user_name}" class="user-vacation-avatar">
      <span class="user-vacation-abs-type">${item.abs_type}</span>
      <span class="user-vacation-name">${item.user_name}</span>
      <span class="user-vacation-position">${item.user_position}</span>
      <span class="user-vacation-phone">${item.user_phone}</span>
      <time class="user-vacation-create-date">${item.abs_created_at}</time>
      <span class="user-vacation-status status-${item.abs_status}">${item.abs_status}</span>
    </header>
  `;

  // 아코디언 컨텐츠
  const renderContent = (item, index) => `
    <article class="detail-content">
      <div class="detail-grid">
        <section class="detail-item">
          <h3 class="detail-label">휴가 제목</h3>
          <div class="detail-value">${item.abs_title}</div>
        </section>
        
        <div class="detail-item">
          <h3 class="detail-label">휴가 기간</h3>
          <div class="detail-value">
            <time class="date">${item.abs_start_date}</time>
            <span class="date-separator">~</span>
            <time class="date">${item.abs_end_date}</time>
          </div>
        </div>

        <section class="detail-item">
          <h3 class="detail-label">첨부 파일</h3>
          <div class="download-file">
            <p class="detail-value">FE_${item.user_name}_${item.abs_type}.pdf</p>
            ${downloadButton.outerHTML}
          </div>
        </section>

        <section class="detail-item detail-content-box">
          <h3 class="detail-label">휴가 내용</h3>
          <p class="detail-value content-box" data-index="${index}">${item.abs_content}</p>
        </section>
      </div>

      ${renderButtons(item.abs_status)}
    </article>
  `;

  // 아코디언 렌더링
  container.innerHTML = `
    <section class="user-vacation-list-section">
      <div class="user-vacation-list">
          ${Accordion({
            items: userAbsData,
            renderHeader,
            renderContent,
          })}
      </div>
    </section>
  `;
};

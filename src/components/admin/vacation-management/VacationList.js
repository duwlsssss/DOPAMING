import { Accordion } from '../../ui/accordion/Accordion';
import { Button } from '../../ui/button/Button';
import { Pagenation } from '../../common/pagenation/Pagenation';
import { Modal } from '../../ui/modal/Modal';
import { vacationStore } from '../../../utils/vacationStore';
import './VacationList.css';

export const RenderAdminVacationManagementList = async container => {
  container.innerHTML = `<div class="loading">휴가 정보를 가져오는 중입니다.</div>`;

  try {
    await vacationStore.initialize();
    const sortedVacations = vacationStore.getFilteredVacations();

    // 다운로드 버튼
    const downloadButton = new Button({
      text: '다운로드',
      color: 'skyblue',
      shape: 'block',
      padding: 'var(--space-xsmall) var(--space-small)',
    });

    // 승인, 거부, 대기 버튼
    const renderButtons = (status, item) => {
      switch (status) {
        case '승인': {
          const cancelApproveButton = new Button({
            text: '승인 취소',
            color: 'gray',
            shape: 'block',
            padding: 'var(--space-small) var(--space-large)',
            onClick: () => {
              Modal('vacation-permit-cancel', {
                absenceId: item.absences_id,
                userId: item.user_id,
              });
            },
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
            onClick: () => {
              Modal('vacation-reject-cancel', {
                absenceId: item.absences_id,
                userId: item.user_id,
              });
            },
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
            onClick: () => {
              Modal('vacation-permit', {
                absenceId: item.absences_id,
                userId: item.user_id,
              });
            },
          });
          const rejectButton = new Button({
            text: '거부하기',
            color: 'coral',
            shape: 'block',
            padding: 'var(--space-small) var(--space-large)',
            onClick: () => {
              Modal('vacation-reject', {
                absenceId: item.absences_id,
                userId: item.user_id,
              });
            },
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
      <header class="admin-vacation-info">
        <div class="admin-vacation-status-dot active"></div>
        <img src="${item.user_image}" alt="${item.user_name}" class="admin-vacation-avatar">
        <span class="admin-vacation-abs-type">${item.abs_type}</span>
        <span class="admin-vacation-name">${item.user_name}</span>
        <span class="admin-vacation-position">${item.user_position}</span>
        <span class="admin-vacation-phone">${item.user_phone}</span>
        <time class="admin-vacation-create-date">${item.abs_created_at}</time>
        <span class="admin-vacation-status status-${item.abs_status}">${item.abs_status}</span>
      </header>
    `;

    // 아코디언 컨텐츠
    const renderContent = (item, index) => `
      <article class="detail-content" data-absence-id="${item.absences_id}" data-user-id="${item.user_id}">
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
        ${renderButtons(item.abs_status, item)}
      </article>
    `;

    const itemsPerPage = 6;
    const startIndex = (vacationStore.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedVacations = sortedVacations.slice(startIndex, endIndex);

    // 아코디언 렌더링
    container.innerHTML = `
      <section class="admin-vacation-list-section">
        <div class="admin-vacation-list">
          ${Accordion({
            items: displayedVacations,
            renderHeader,
            renderContent,
          })}
        </div>
      </section>
    `;

    // 페이지네이션 컨테이너
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';

    const handlePageChange = newPage => {
      vacationStore.setPage(newPage);
      RenderAdminVacationManagementList(container);
    };

    const paginationElement = Pagenation(
      sortedVacations.length,
      itemsPerPage,
      vacationStore.currentPage,
      handlePageChange,
    );

    paginationContainer.appendChild(paginationElement);
    container.appendChild(paginationContainer);

    // 버튼 이벤트 리스너
    container.addEventListener('click', async e => {
      const button = e.target.closest('button');
      if (!button) return;

      const article = button.closest('.detail-content');
      if (!article) return;

      const absenceId = article.dataset.absenceId;
      const userId = article.dataset.userId;

      if (!absenceId || !userId) return;

      try {
        switch (button.textContent) {
          case '승인하기':
            await Modal('vacation-permit', { userId, absenceId });
            break;
          case '거부하기':
            await Modal('vacation-reject', { userId, absenceId });
            break;
          case '승인 취소':
            await Modal('vacation-permit-cancel', { userId, absenceId });
            break;
          case '거부 취소':
            await Modal('vacation-reject-cancel', { userId, absenceId });
            break;
        }
      } catch (error) {
        console.error('휴가 상태 변경 중 오류 발생:', error);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    container.innerHTML = `
      <div class="admin-vacation-section error">
        ${error.message || '데이터를 불러오는 중 오류가 발생했습니다.'}
      </div>
    `;
  }
};

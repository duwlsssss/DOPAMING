import { Accordion } from '../../../ui/accordion/Accordion';
import { Button } from '../../../ui/button/Button';
import './VacationList.css';
import { VacationRequestForm } from '../../../user/form/vacation-request-form/VacationRequestForm';

// 다운로드 버튼
const downloadButton = new Button({
  className: 'user-vcDownload-btn',
  text: '다운로드',
  color: 'skyblue',
  shape: 'block',
  padding: 'var(--space-xsmall) var(--space-small)',
});

// 수정 모드 토글 함수
const toggleEditMode = vcId => {
  console.log('선택된 부재 id: ', vcId);
  const contentContainer = document.getElementById(vcId);
  const contentElement = contentContainer.querySelector('.user-detail-content');
  const buttonGroup = contentContainer.querySelector(
    '.user-approval-button-group',
  );
  const detail = contentContainer
    .closest('.accordion-item')
    .querySelector('.accordion-detail'); // 아코디언 detail 요소

  const isEditMode = contentElement.classList.contains('edit-mode');

  if (!isEditMode) {
    // 수정 모드로 전환
    contentElement.classList.add('edit-mode');

    // 기존 버튼 숨김
    buttonGroup
      .querySelectorAll('.user-vcEdit-button, .user-vcDelete-button')
      .forEach(btn => (btn.style.display = 'none'));

    // 원래 내용을 백업
    const originalContent = contentElement.innerHTML;
    contentElement.dataset.originalContent = originalContent;

    // VacationRequestForm을 HTML 문자열로 가져와 DOM 요소로 변환해 삽입
    const formComponent = VacationRequestForm();
    formComponent.renderForm(contentElement);

    // 수정 완료 버튼 추가
    const submitButton = new Button({
      className: 'user-vcSubmit-button',
      text: '수정 완료',
      color: 'skyblue-light',
      shape: 'block',
      padding: 'var(--space-small) var(--space-large)',
      onClick: () => {
        // 수정 완료 시, 원래 내용 복구 및 수정 모드 종료
        contentElement.innerHTML = contentElement.dataset.originalContent;
        contentElement.classList.remove('edit-mode'); // 수정 모드 클래스 제거

        // 버튼 그룹에서 수정 완료 버튼 제거
        buttonGroup.removeChild(submitButton);
        detail.style.maxHeight = 'none'; // 높이 초기화
        buttonGroup
          .querySelectorAll('.user-vcEdit-button, .user-vcDelete-button')
          .forEach(btn => (btn.style.display = 'block'));
      },
    });
    buttonGroup.appendChild(submitButton);

    detail.style.maxHeight = `${detail.scrollHeight}px`; // 높이 업데이트
  } else {
    // 수정 모드를 비활성화하고 원래 내용 복구
    contentElement.innerHTML = contentElement.dataset.originalContent;
    contentElement.classList.remove('edit-mode'); // 수정 모드 클래스 제거

    // 수정 완료 버튼 제거하고 원래 버튼 복원
    buttonGroup.querySelector('.skyblue-light')?.remove();
    buttonGroup
      .querySelectorAll('.user-vcEdit-button, .user-vcDelete-button')
      .forEach(btn => (btn.style.display = 'block'));

    detail.style.maxHeight = 'none'; // 높이 초기화
  }
};

// 수정하기, 삭제 버튼
const renderButtons = (status, vcId) => {
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'user-approval-button-group';

  if (status === '대기') {
    const editBtn = new Button({
      className: 'user-vcEdit-button',
      text: '수정하기',
      color: 'green-light',
      shape: 'block',
      padding: 'var(--space-small) var(--space-large)',
      onClick: () => toggleEditMode(vcId), // 수정 모드 토글
    });

    const deleteBtn = new Button({
      className: 'user-vcDelete-button',
      text: '삭제',
      color: 'coral',
      shape: 'block',
      padding: 'var(--space-small) var(--space-large)',
    });

    buttonGroup.append(editBtn, deleteBtn);
  }
  return buttonGroup;
};

// 아코디언 헤더
const renderHeader = item => `
  <header class="user-vacation-info">
    <span class="user-vacation-abs-type">${item.abs_type}</span>
    <span class="user-vacation-name">${item.user_name}</span>
    <span class="user-vacation-position">${item.user_position}</span>
    <span class="user-vacation-phone">${item.user_phone}</span>
    <time class="user-vacation-create-date">${item.abs_created_at}</time>
    <span class="user-vacation-status status-${item.abs_status}">${item.abs_status}</span>
  </header>
`;

// 아코디언 콘텐츠
const renderContent = item => {
  const vcId = `content-${item.abs_id}`;
  return `
    <article class="user-detail-content-container" id="${vcId}">
      <div class="user-detail-content">
        <section class="user-detail-item">
          <h3 class="user-detail-label">휴가 제목</h3>
          <div class="user-detail-value">${item.abs_title}</div>
        </section>
        
        <div class="user-detail-item">
          <h3 class="user-detail-label">휴가 기간</h3>
          <div class="user-detail-value">
            <time class="user-date">${item.abs_start_date}</time>
            <span class="user-date-separator">~</span>
            <time class="user-date">${item.abs_end_date}</time>
          </div>
        </div>

        <section class="user-detail-item">
          <h3 class="user-detail-label">첨부 파일</h3>
          <div class="user-download-file">
            <p class="user-detail-value">FE_${item.user_name}_${item.abs_type}.pdf</p>
            ${downloadButton.outerHTML}
          </div>
        </section>

        <section class="user-detail-item detail-content-box">
          <h3 class="user-detail-label">휴가 내용</h3>
          <p class="user-detail-value content-box">${item.abs_content}</p>
        </section>
      </div>

      <div class="user-approval-button-group-placeholder"></div>
      
    </article>
  `;
};

// 사용자 휴가 리스트 렌더링
export const RenderUserVacationList = async (container, userAbsData) => {
  if (!container) {
    console.error('Container가 준비되지 않음');
    return;
  }

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

  userAbsData.forEach(item => {
    const vcId = `content-${item.abs_id}`;
    const contentContainer = container.querySelector(`#${vcId}`);
    const buttonGroupPlaceholder = contentContainer.querySelector(
      '.user-approval-button-group-placeholder',
    );
    const buttonGroup = renderButtons(item.abs_status, vcId);
    buttonGroupPlaceholder.replaceWith(buttonGroup);
  });

  if (userAbsData.length === 0) {
    const inner = container.querySelector('.user-vacation-list-section');
    inner.innerHTML = ` <div class="user-vacation-filter-error-message">찾으시는 부재 신청 내역이 없습니다.</div>`;
  }
};

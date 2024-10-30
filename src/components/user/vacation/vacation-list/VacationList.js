import { Accordion } from '../../../ui/accordion/Accordion';
import { Button } from '../../../ui/button/Button';
import './VacationList.css';
import { VacationRequestForm } from '../../../user/form/vacation-request-form/VacationRequestForm';
import { getDatabase, ref, onValue } from 'firebase/database'; // 필요한 함수들 임포트
import { getAuth } from 'firebase/auth'; // Firebase 인증 임포트

// 다운로드 버튼 생성 함수
const createDownloadButton = fileName => {
  return new Button({
    className: 'user-vcDownload-btn',
    text: '다운로드',
    color: 'skyblue',
    shape: 'block',
    padding: 'var(--space-xsmall) var(--space-small)',
    onClick: () => {
      console.log(`Downloading ${fileName}`);
    },
  });
};

// 수정 모드 토글 함수
const toggleEditMode = vcId => {
  const contentContainer = document.getElementById(vcId);
  const contentElement = contentContainer.querySelector('.user-detail-content');
  const buttonGroup = contentContainer.querySelector(
    '.user-approval-button-group',
  );
  const detail = contentContainer
    .closest('.accordion-item')
    .querySelector('.accordion-detail');

  const isEditMode = contentElement.classList.contains('edit-mode');

  if (!isEditMode) {
    contentElement.classList.add('edit-mode');
    buttonGroup
      .querySelectorAll('.user-vcEdit-button, .user-vcDelete-button')
      .forEach(btn => (btn.style.display = 'none'));
    const originalContent = contentElement.innerHTML;
    contentElement.dataset.originalContent = originalContent;

    const formComponent = VacationRequestForm();
    formComponent.renderForm(contentElement);

    const cancelEditBtn = new Button({
      className: 'user-vcCancelEdit-button',
      text: '수정 취소',
      color: 'coral',
      shape: 'block',
      padding: 'var(--space-small) var(--space-large)',
      onClick: () => {
        contentElement.innerHTML = contentElement.dataset.originalContent;
        contentElement.classList.remove('edit-mode');
        buttonGroup.removeChild(cancelEditBtn);
        buttonGroup.removeChild(submitButton);
        detail.style.maxHeight = 'none';
        buttonGroup
          .querySelectorAll('.user-vcEdit-button, .user-vcDelete-button')
          .forEach(btn => (btn.style.display = 'block'));
      },
    });
    buttonGroup.appendChild(cancelEditBtn);

    const submitButton = new Button({
      className: 'user-vcSubmit-button',
      text: '수정 완료',
      color: 'skyblue-light',
      shape: 'block',
      padding: 'var(--space-small) var(--space-large)',
      onClick: () => {
        console.log('수정 완료');
        contentElement.innerHTML = contentElement.dataset.originalContent;
        contentElement.classList.remove('edit-mode');
        buttonGroup.removeChild(cancelEditBtn);
        buttonGroup.removeChild(submitButton);
        detail.style.maxHeight = 'none';
        buttonGroup
          .querySelectorAll('.user-vcEdit-button, .user-vcDelete-button')
          .forEach(btn => (btn.style.display = 'block'));
      },
    });
    buttonGroup.appendChild(submitButton);
    detail.style.maxHeight = `${detail.scrollHeight}px`; // 높이 업데이트
  } else {
    contentElement.innerHTML = contentElement.dataset.originalContent;
    contentElement.classList.remove('edit-mode');
    buttonGroup.querySelector('.skyblue-light')?.remove();
    buttonGroup
      .querySelectorAll('.user-vcEdit-button, .user-vcDelete-button')
      .forEach(btn => (btn.style.display = 'block'));
    detail.style.maxHeight = 'none'; // 높이 초기화
  }
};

// 수정 및 삭제 버튼 렌더링
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
      onClick: () => toggleEditMode(vcId),
    });

    const deleteBtn = new Button({
      className: 'user-vcDelete-button',
      text: '삭제',
      color: 'coral',
      shape: 'block',
      padding: 'var(--space-small) var(--space-large)',
      onClick: () => {
        console.log(`Deleting vacation request with ID: ${vcId}`);
      },
    });

    buttonGroup.append(editBtn, deleteBtn);
  }
  return buttonGroup;
};

// 아코디언 헤더 렌더링
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

// 아코디언 콘텐츠 렌더링
const renderContent = item => {
  const vcId = `content-${item.abs_id}`;
  const downloadButton = createDownloadButton(
    `FE_${item.user_name}_${item.abs_type}.pdf`,
  );
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
export const RenderUserVacationList = async container => {
  if (!container) {
    console.error('Container가 준비되지 않음');
    return;
  }

  const db = getDatabase();
  const auth = getAuth(); // Firebase 인증 가져오기
  const currentUser = auth.currentUser; // 현재 로그인한 사용자

  if (!currentUser) {
    console.error('로그인된 사용자가 없습니다.');
    return;
  }

  const userId = currentUser.uid; // 현재 로그인한 사용자 ID로 변경
  const absencesRef = ref(db, `absences/${userId}`);

  // Firebase에서 데이터 가져오기
  onValue(absencesRef, snapshot => {
    const userAbsData = [];
    if (snapshot.exists()) {
      snapshot.forEach(childSnapshot => {
        const absenceData = childSnapshot.val();
        userAbsData.push({ abs_id: childSnapshot.key, ...absenceData });
      });

      console.log('부재 신청 데이터:', userAbsData); // 데이터 확인

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
    } else {
      console.log('부재 데이터가 존재하지 않습니다.');
      container.innerHTML = `<div class="user-vacation-filter-error-message">부재 데이터가 존재하지 않습니다.</div>`;
    }
  });
};

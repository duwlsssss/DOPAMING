import { Accordion } from '../../../ui/accordion/Accordion';
import { Button } from '../../../ui/button/Button';
import { Modal } from '../../../ui/modal/Modal';
import './VacationList.css';
import { validateVacationRequestInput } from '../../../../utils/validation';
import { VacationRequestForm } from '../../../user/form/vacation-request-form/VacationRequestForm';
import {
  getUserAbsById,
  updateUserAbsence,
} from '../../../../../server/api/user';

// 수정 모드 토글 함수
const toggleEditMode = async (vcId, container, itemData) => {
  const contentContainer = document.getElementById(vcId);
  const contentElement = contentContainer.querySelector('.user-detail-content');
  const buttonGroup = contentContainer.querySelector(
    '.user-approval-button-group',
  );
  const detail = contentContainer
    .closest('.accordion-item')
    .querySelector('.accordion-detail'); // 아코디언 detail 요소

  const isEditMode = contentElement.classList.contains('edit-mode');

  let cancelEditBtn, submitButton;

  // 수정 모드 종료
  const exitEditMode = (updatedData = null) => {
    contentElement.classList.remove('edit-mode');
    // 수정 취소,수정 완료 버튼 제거
    if (cancelEditBtn) buttonGroup.removeChild(cancelEditBtn);
    if (submitButton) buttonGroup.removeChild(submitButton);

    // 원래 버튼 복원
    buttonGroup
      .querySelectorAll('.user-vcEdit-button, .user-vcDelete-button')
      .forEach(btn => (btn.style.display = 'block'));

    // 아코디언 높이 초기화
    detail.style.maxHeight = 'none';

    // 업데이트된 데이터가 있으면 해당 항목만 다시 렌더링
    if (updatedData) {
      // 업데이트된 콘텐츠 렌더링 후, 기존의 버튼 그룹을 유지하면서 다시 추가
      const updatedContent = renderContent(updatedData);
      contentContainer.innerHTML = updatedContent;

      // 업데이트된 contentContainer에 기존 buttonGroup을 다시 삽입
      const buttonGroupContainer = contentContainer.querySelector(
        '.user-approval-button-group-container',
      );
      buttonGroupContainer.appendChild(buttonGroup);

      appendDownloadButton(itemData, contentContainer);
    }
  };

  if (!isEditMode) {
    // 수정 모드로 전환
    contentElement.classList.add('edit-mode');

    // 기존 버튼 숨김
    buttonGroup
      .querySelectorAll('.user-vcEdit-button, .user-vcDelete-button')
      .forEach(btn => (btn.style.display = 'none'));

    // 원래 내용을 백업_수정 취소시 사용
    const originalContent = contentElement.innerHTML;
    contentElement.dataset.originalContent = originalContent;

    contentElement.innerHTML = `<div class="loading">휴가 정보를 가져오는 중입니다.</div>`;

    try {
      // 최신 데이터 가져오기
      const latestData = await getUserAbsById(
        itemData.user_id,
        itemData.abs_id,
      );

      // VacationRequestForm을 최신 데이터로 생성
      const formComponent = VacationRequestForm(true, {
        type: latestData.abs_type,
        title: latestData.abs_title,
        startDate: latestData.abs_start_date,
        endDate: latestData.abs_end_date,
        content: latestData.abs_content,
        proof_document: latestData.abs_proof_document,
        proof_documentUrl: latestData.abs_proof_document_base64,
      });

      // 폼 렌더링
      formComponent.renderForm(contentElement);

      // 수정 취소 버튼 추가
      cancelEditBtn = new Button({
        className: 'user-vcCancelEdit-button',
        text: '수정 취소',
        color: 'coral',
        shape: 'block',
        padding: 'var(--space-small) var(--space-large)',
        onClick: () => {
          // 수정 취소 시, 원래 내용 복구 및 수정 모드 종료
          contentElement.innerHTML = contentElement.dataset.originalContent;
          exitEditMode();
        },
      });
      buttonGroup.appendChild(cancelEditBtn);

      // 수정 완료 버튼 추가
      submitButton = new Button({
        className: 'user-vcSubmit-button',
        text: '수정 완료',
        color: 'skyblue-light',
        shape: 'block',
        padding: 'var(--space-small) var(--space-large)',
        onClick: async () => {
          // 수정 완료 시 유효성 검사 통과 후 수정 모드 종료
          if (validateVacationRequestInput(true)) {
            try {
              const updatedData = await updateUserAbsence(
                container,
                itemData.user_id,
                itemData.abs_id,
              );
              Modal('vacation-edit-success');
              exitEditMode(updatedData);
            } catch (error) {
              console.error('부재 수정 중 오류 발생 : ', error);
              Modal('vacation-edit-fail');
            }
          } else {
            Modal('vacation-edit-fail');
          }
        },
      });
      buttonGroup.appendChild(submitButton);

      detail.style.maxHeight = `${detail.scrollHeight}px`; // 높이 업데이트
    } catch (error) {
      console.error('최신 데이터를 가져오는 중 오류 발생:', error);
    }
  } else {
    exitEditMode(); // 이미 수정 모드인 경우 수정 모드 종료
  }
};

// 수정하기, 삭제 버튼
const renderButtons = (vcId, container, itemData) => {
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'user-approval-button-group';

  if (itemData.abs_status === '대기') {
    const editBtn = new Button({
      className: 'user-vcEdit-button',
      text: '수정하기',
      color: 'green-light',
      shape: 'block',
      padding: 'var(--space-small) var(--space-large)',
      onClick: () => toggleEditMode(vcId, container, itemData), // 수정 모드 토글
    });

    const deleteBtn = new Button({
      className: 'user-vcDelete-button',
      text: '삭제',
      color: 'coral',
      shape: 'block',
      padding: 'var(--space-small) var(--space-large)',
      onClick: async () => {
        try {
          const options = {
            userId: itemData.user_id,
            absId: itemData.abs_id,
            vcId: vcId,
            summaryContainer: document.querySelector('#userVacationSummary'),
          };
          Modal('vacation-delete', options);
        } catch (error) {
          console.error('부재 삭제 중 오류 발생 : ', error);
          Modal('vacation-delete-fail');
        }
      },
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
            <p class="user-detail-value">${item.abs_proof_document}</p>
            <div class="download-button-container"></div> 
          </div>
        </section>

        <section class="user-detail-item detail-content-box">
          <h3 class="user-detail-label">휴가 내용</h3>
          <p class="user-detail-value content-box">${item.abs_content}</p>
        </section>
      </div>

      <div class="user-approval-button-group-container"></div>
      
    </article>
  `;
};

// 다운로드 버튼 추가
const appendDownloadButton = (item, container) => {
  const downloadButton = new Button({
    className: 'user-vcDownload-btn',
    text: '다운로드',
    color: 'skyblue',
    shape: 'block',
    padding: 'var(--space-xsmall) var(--space-small)',
    onClick: () => {
      if (item.abs_proof_document_base64) {
        const link = document.createElement('a');
        link.href = item.abs_proof_document_base64;
        link.download = item.abs_proof_document || 'downloaded-file';
        link.click();
      } else {
        console.log('다운로드할 파일이 없습니다.');
      }
    },
  });
  const buttonPosition = container.querySelector(
    `#content-${item.abs_id} .download-button-container`,
  );
  buttonPosition.appendChild(downloadButton);
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
    const buttonGroupContainer = contentContainer.querySelector(
      '.user-approval-button-group-container',
    );
    const buttonGroup = renderButtons(vcId, container, item);

    appendDownloadButton(item, contentContainer);

    buttonGroupContainer.replaceWith(buttonGroup);
  });

  if (userAbsData.length === 0) {
    const inner = container.querySelector('.user-vacation-list-section');
    inner.innerHTML = ` <div class="user-vacation-filter-error-message">찾으시는 부재 신청 내역이 없습니다.</div>`;
  }
};

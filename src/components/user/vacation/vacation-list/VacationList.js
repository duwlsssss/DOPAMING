import { Accordion } from '../../../ui/accordion/Accordion';
import { Button } from '../../../ui/button/Button';
import './VacationList.css';
import { VacationRequestForm } from '../../../user/form/vacation-request-form/VacationRequestForm';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database'; // 필요한 함수들 임포트
import { getAuth } from 'firebase/auth'; // Firebase 인증 임포트
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from 'firebase/storage'; // Firebase Storage 함수들 임포트

// 다운로드 버튼 생성 함수
const createDownloadButton = (userFileUrl, userName, absType) => {
  return new Button({
    className: 'user-vcDownload-btn',
    text: '다운로드',
    color: 'skyblue',
    shape: 'block',
    padding: 'var(--space-xsmall) var(--space-small)',
    onClick: () => {
      console.log(
        `다운로드 버튼 클릭: ${userName}의 ${absType} 파일을 다운로드합니다.`,
      );
    },
  });
};

// 수정 모드 토글 함수
const toggleEditMode = (vcId, absData) => {
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
    formComponent.renderForm(contentElement, absData); // 기존 데이터 전달

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
      onClick: async () => {
        const db = getDatabase();
        const auth = getAuth();
        const currentUser = auth.currentUser;

        // 수정된 내용을 가져오기
        const updatedContent = formComponent.getFormData(); // 수정된 데이터 가져오기

        if (updatedContent) {
          const absencesRef = ref(
            db,
            `absences/${currentUser.uid}/${absData.abs_id}`,
          ); // 부재 ID 경로 설정
          try {
            await update(absencesRef, updatedContent); // 데이터베이스 업데이트
            alert('부재 신청이 수정되었습니다.');
            contentElement.innerHTML = contentElement.dataset.originalContent; // 원래 내용으로 복원
            contentElement.classList.remove('edit-mode');
            buttonGroup.removeChild(cancelEditBtn);
            buttonGroup.removeChild(submitButton);
            detail.style.maxHeight = 'none';
            buttonGroup
              .querySelectorAll('.user-vcEdit-button, .user-vcDelete-button')
              .forEach(btn => (btn.style.display = 'block'));
          } catch (error) {
            console.error('부재 신청 수정 중 오류 발생:', error);
            alert('부재 신청 수정 중 오류가 발생했습니다.');
          }
        }
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
const renderButtons = (status, vcId, absId, absData, container) => {
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'user-approval-button-group';

  if (status === '대기') {
    const editBtn = new Button({
      className: 'user-vcEdit-button',
      text: '수정하기',
      color: 'green-light',
      shape: 'block',
      padding: 'var(--space-small) var(--space-large)',
      onClick: () => toggleEditMode(vcId, absData), // absData 전달
    });

    const deleteBtn = new Button({
      className: 'user-vcDelete-button',
      text: '삭제',
      color: 'coral',
      shape: 'block',
      padding: 'var(--space-small) var(--space-large)',
      onClick: async () => {
        const db = getDatabase();
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const absencesRef = ref(db, `absences/${currentUser.uid}/${absId}`); // 부재 ID 경로 설정

        // 부재 삭제 확인
        const confirmDelete = confirm('부재 신청을 삭제하시겠습니까?');
        if (confirmDelete) {
          try {
            await remove(absencesRef); // 부재 신청 삭제
            RenderUserVacationList(container);
          } catch (error) {
            console.error('부재 신청 삭제 중 오류 발생:', error);
            alert('부재 신청 삭제 중 오류가 발생했습니다.');
          }
        }
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
    item.user_file,
    item.user_name,
    item.abs_type,
  ); // user_file URL, user_name, abs_type 전달

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
            <p class="user-detail-value">FE_${item.user_name}_${item.abs_type}.pdf</p> <!-- 고정된 파일 이름 표시 -->
            ${downloadButton.outerHTML} <!-- 버튼 HTML 추가 -->
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
  const storage = getStorage(); // Firebase Storage 초기화

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

        const downloadButton = contentContainer.querySelector(
          '.user-vcDownload-btn',
        );
        if (downloadButton) {
          console.log('다운로드 버튼을 찾았습니다.'); // 버튼 확인 로그
          downloadButton.addEventListener('click', async () => {
            console.log('다운로드 버튼 클릭 이벤트 발생');

            // 파일 다운로드 로직
            const userFilePath = item.user_file; // 다운로드할 파일 경로

            const fileRef = storageRef(storage, userFilePath); // Firebase Storage 참조 생성

            try {
              const userFileUrl = await getDownloadURL(fileRef); // 다운로드 URL 가져오기

              // 새로운 창에서 다운로드 URL 열기
              window.open(userFileUrl, '_blank'); // 새로운 창에서 열기
            } catch (error) {
              console.error('파일 다운로드 오류:', error);
            }
          });
        } else {
          console.error('다운로드 버튼을 찾을 수 없습니다.');
        }

        const buttonGroupPlaceholder = contentContainer.querySelector(
          '.user-approval-button-group-placeholder',
        );
        const buttonGroup = renderButtons(item.abs_status, vcId, item.abs_id); // 부재 ID 추가
        buttonGroupPlaceholder.replaceWith(buttonGroup);
      });
    } else {
      console.log('부재 데이터가 존재하지 않습니다.');
      container.innerHTML = `<div class="user-vacation-filter-error-message">부재 데이터가 존재하지 않습니다.</div>`;
    }
  });
};

import './VacationRequestForm.css';
import { Button } from '../../../ui/button/Button';

export const VacationRequestForm = () => {
  const form = `
    <fieldset class="vacation-request-form-inputs">
      <div class="input-container">
        <label class="vacation-input" for="vacation-type">부재 종류</label>
        <div class="input-box">
          <select class="input-select" id="vacation-type">
            <option value="">선택하세요</option>
            <option value="officialLeave">공가</option>
            <option value="sickLeave">병가</option>
            <option value="annualLeave">휴가</option>
          </select>
          <p class="error-message" id="vcTypeError"></p>
        </div>
      </div>
      
      <div class="input-container">
        <label class="vacation-input" for="vacation-title">부재 제목</label>
        <div class="input-box">
          <input class="input-field" type="text" id="vacation-title" placeholder="부재 제목을 입력해주세요.">
          <p class="error-message" id="vcTitleError"></p>
        </div>
      </div>
      
      <div class="input-container">
        <label class="vacation-input" for="vacation-start-date">시작일</label>
        <div class="input-box">
          <input class="input-field" type="date" id="vacation-start-date">
          <p class="error-message" id="vcStartError"></p>
        </div>
      </div>

      <div class="input-container">
        <label class="vacation-input" for="vacation-end-date">종료일</label>
        <div class="input-box">
          <input class="input-field" type="date" id="vacation-end-date">
          <p class="error-message" id="vcEndError"></p>
        </div>
      </div>

      <div class="input-container">
        <label class="vacation-input" for="vacation-content">부재 사유</label>
        <div class="input-box">
          <textarea class="input-field" id="vacation-content" placeholder="부재 사유를 입력해주세요."></textarea> 
          <p class="error-message" id="vcContentError"></p>
        </div>
      </div>
      
      <div class="input-container proof-file">
        <label class="vacation-input" for="vacation-proof-document">첨부 파일</label>
        <div class="input-box">
          <div class="proof-file-preview"></div>
          <input type="file" id="fileInput" accept=".pdf, .zip, .jpg, .png"/> 
          <p class="error-message file-error" id="vcFileError"></p>
        </div>
      </div>

    </fieldset>
  `;

  // vacation-content 줄바꿈 발생하면 자동 높이 조정
  const handleResizeHeight = textarea => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px'; // 스크롤 높이에 맞춰 조정
  };

  // 파일 업로드 이벤트를 처리하는 함수
  const attachProofFileEvents = container => {
    const fileInput = container.querySelector('#fileInput');
    const buttonPosition = container.querySelector('.proof-file'); // 업로드 버튼 위치

    // 업로드 버튼 추가
    const proofFileUploadBtn = new Button({
      className: 'proof-file-upload-btn',
      text: '첨부파일 업로드',
      color: 'transparent',
      shape: 'line',
      padding: 'var(--space-small)',
      onClick: e => {
        e.preventDefault();
        fileInput.click();
      },
    });
    buttonPosition.appendChild(proofFileUploadBtn);

    // 파일 선택 시 미리보기와 다운로드 기능 설정
    fileInput.addEventListener('change', () => {
      const files = fileInput.files;
      const filePreviewContainer = container.querySelector(
        '.proof-file-preview',
      );
      filePreviewContainer.innerHTML = ''; // 기존 파일 목록 초기화

      if (files.length > 0) {
        const file = files[0];

        const reader = new FileReader();
        reader.onload = event => {
          const filePreview = document.createElement('div');
          filePreview.classList.add('file-title');
          filePreview.textContent = file.name;

          // 파일 클릭 시 다운로드 기능 추가
          filePreview.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = event.target.result;
            link.download = file.name;
            link.click();
          });

          filePreviewContainer.appendChild(filePreview);
        };

        reader.readAsDataURL(file); // 파일을 base64로 읽기
      }
    });
  };

  // 폼을 DOM에 삽입, textarea에 이벤트리스너 추가
  const renderForm = container => {
    container.innerHTML = form;
    const textarea = container.querySelector('.input-box #vacation-content');
    textarea.addEventListener('input', () => handleResizeHeight(textarea));
    attachProofFileEvents(container);
  };

  return { renderForm };
};

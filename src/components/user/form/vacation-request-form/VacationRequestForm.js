// VacationRequestForm.js
import './VacationRequestForm.css';
import { Button } from '../../../ui/button/Button';

export const VacationRequestForm = (isEditMode = false, initialData = {}) => {
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

  const handleResizeHeight = textarea => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const attachProofFileEvents = container => {
    const fileInput = container.querySelector('#fileInput');
    const buttonPosition = container.querySelector('.proof-file'); // 업로드 버튼 위치

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

    fileInput.addEventListener('change', () => {
      const files = fileInput.files;
      const filePreviewContainer = container.querySelector(
        '.proof-file-preview',
      );
      filePreviewContainer.innerHTML = '';

      if (files.length > 0) {
        const file = files[0];
        const storageRef = ref(storage, `vacation/${file.name}`);

        uploadBytes(storageRef, file)
          .then(() => {
            getDownloadURL(storageRef).then(downloadURL => {
              const filePreview = document.createElement('div');
              filePreview.classList.add('file-title');
              filePreview.textContent = file.name;

              filePreview.addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = downloadURL;
                link.download = file.name;
                link.click();
              });

              filePreviewContainer.appendChild(filePreview);
            });
          })
          .catch(error => {
            console.error('Upload failed:', error);
            alert('파일 업로드에 실패했습니다.');
          });

          filePreviewContainer.appendChild(filePreview);
        };

        reader.readAsDataURL(file); // 파일을 base64로 읽기
      }
    });
  };

  const setFormData = absData => {
    if (absData) {
      document.querySelector('#vacation-type').value = absData.abs_type || '';
      document.querySelector('#vacation-title').value = absData.abs_title || '';
      document.querySelector('#vacation-start-date').value =
        absData.abs_start_date || '';
      document.querySelector('#vacation-end-date').value =
        absData.abs_end_date || '';
      document.querySelector('#vacation-content-textarea').value =
        absData.abs_content || '';
    } else {
      console.error('부재 데이터가 유효하지 않습니다.', absData);
      // Optional: 기본값 설정
      document.querySelector('#vacation-type').value = '';
      document.querySelector('#vacation-title').value = '';
      document.querySelector('#vacation-start-date').value = '';
      document.querySelector('#vacation-end-date').value = '';
      document.querySelector('#vacation-content-textarea').value = '';
    }
  };

  const getFormData = async () => {
    const formData = {
      abs_title: document.querySelector('#vacation-title').value,
      abs_content: document.querySelector('#vacation-content-textarea').value,
      abs_start_date: document.querySelector('#vacation-start-date').value,
      abs_end_date: document.querySelector('#vacation-end-date').value,
      abs_type: document.querySelector('#vacation-type').value,
      user_file: '', // 기본값으로 빈 문자열 설정
    };

    const fileInput = document.querySelector('#fileInput');
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const storageRef = ref(storage, `vacation/${file.name}`);
      try {
        const downloadURL = await getDownloadURL(storageRef);
        formData.user_file = downloadURL; // URL을 formData에 저장
      } catch (err) {
        console.error('Error getting file URL:', err);
      }
    }

    return formData;
  };

  const renderForm = (container, absData) => {
    container.innerHTML = form;

    // 기존 값을 설정
    if (absData) {
      setFormData(absData); // setFormData 호출
    }

    const textarea = container.querySelector('#vacation-content-textarea');
    textarea.addEventListener('input', () => handleResizeHeight(textarea));
    attachProofFileEvents(container);

    // 수정 모드일 땐 내용 채워둠
    if (isEditMode) {
      container.querySelector('#vacation-type').value =
        initialData.type === '공가'
          ? 'officialLeave'
          : initialData.type === '병가'
            ? 'sickLeave'
            : initialData.type === '휴가'
              ? 'annualLeave'
              : '';
      container.querySelector('#vacation-title').value =
        initialData.title || '';
      container.querySelector('#vacation-start-date').value =
        initialData.startDate || '';
      container.querySelector('#vacation-end-date').value =
        initialData.endDate || '';
      container.querySelector('#vacation-content').value =
        initialData.content || '';

      if (initialData.proof_document) {
        const filePreviewContainer = container.querySelector(
          '.proof-file-preview',
        );
        const filePreview = document.createElement('div');
        filePreview.classList.add('file-title');
        filePreview.textContent = initialData.proof_document;

        filePreview.addEventListener('click', () => {
          const link = document.createElement('a');
          link.href = initialData.proof_documentUrl;
          link.download = initialData.proof_document;
          link.click();
        });

        filePreviewContainer.appendChild(filePreview);
      }
    }
  };

  return {
    renderForm,
    getFormData,
    setFormData, // setFormData 메서드 반환
  };
};

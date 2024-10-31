import './VacationRequest.css';
import { Button, VacationRequestForm, Modal } from '../../../../components';
import { validateVacationRequestInput } from '../../../../utils/validation';
import { USER_PATH } from '../../../../utils/constants';
import { addUserAbsence } from '../../../../../server/api/user';
import { getItem } from '../../../../utils/storage';

export const RenderUserVacationRequest = async container => {
  // 기본 HTML 구조 설정
  container.innerHTML = `
    <div class="vacation-request-title">부재 신청</div>
      <div class="vacation-request-form">
      </div>
    </div>
  `;

  const formComponent = VacationRequestForm();

  const formContainer = container.querySelector('.vacation-request-form');
  formComponent.renderForm(formContainer);

  const userId = getItem('userID');

  // 버튼 추가
  const buttonPosition = container.querySelector('.vacation-request-form');
  const submitBtn = Button({
    className: 'vacation-request-submit-btn',
    text: '부재 신청하기',
    color: 'skyblue',
    shape: 'block',
    padding: 'var(--space-medium)',
    fontWeight: 700,
    onClick: async e => {
      e.preventDefault();

      if (validateVacationRequestInput(false)) {
        // 데이터 모으기
        const vacationTypeValue =
          formContainer.querySelector('#vacation-type').value;
        let vacationType;

        if (vacationTypeValue === 'officialLeave') {
          vacationType = '공가';
        } else if (vacationTypeValue === 'sickLeave') {
          vacationType = '병가';
        } else if (vacationTypeValue === 'annualLeave') {
          vacationType = '휴가';
        } else {
          vacationType = '';
        }
        const vacationTitle =
          formContainer.querySelector('#vacation-title').value;
        const vacationStartDate = formContainer.querySelector(
          '#vacation-start-date',
        ).value;
        const vacationEndDate =
          formContainer.querySelector('#vacation-end-date').value;
        const vacationContent =
          formContainer.querySelector('#vacation-content').value;
        const fileInput = formContainer.querySelector('#fileInput');
        const proofDocument = fileInput.files[0] || null;

        // 파일을 base64로 변환_다운로드 되게
        let proofDocumentBase64 = null;
        if (proofDocument) {
          const reader = new FileReader();
          proofDocumentBase64 = await new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(proofDocument);
          });
        }

        // 새 부재 데이터 객체 생성
        const newAbsenceData = {
          abs_type: vacationType,
          abs_title: vacationTitle,
          abs_start_date: vacationStartDate,
          abs_end_date: vacationEndDate,
          abs_content: vacationContent,
          abs_proof_document: proofDocument ? proofDocument.name : null,
          abs_proof_document_base64: proofDocumentBase64,
          user_id: userId,
          abs_created_at: new Date().toISOString().split('T')[0],
          abs_status: '대기', // 초기 상태
        };
        try {
          await addUserAbsence(userId, newAbsenceData);
          Modal('vacation-request-success', {
            redirectPath: USER_PATH.VACATION,
          });
        } catch (error) {
          console.error('부재 신청 중 오류 발생:', error);
          Modal('vacation-request-fail');
        }
      } else {
        // 유효성 검사 실패 시 실패 모달 표시
        Modal('vacation-request-fail');
      }
    },
  });
  buttonPosition.append(submitBtn);
};

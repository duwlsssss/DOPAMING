import './VacationRequest.css';
import { Button, VacationRequestForm } from '../../../../components';
import { validInput } from '../../../../utils/validate';

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

  // 버튼 추가
  const buttonPosition = container.querySelector('.vacation-request-form');
  const submitBtn = Button({
    className: 'vacation-request-submit-btn',
    text: '부재 신청하기',
    color: 'skyblue',
    shape: 'block',
    padding: 'var(--space-medium)',
    fontWeight: 700,
    onClick: e => {
      e.preventDefault();
      if (validInput()) {
        alert('모든 입력이 유효합니다.');
        // 추가적인 작업 수행 가능
      }
    },
  });
  buttonPosition.append(submitBtn);
};

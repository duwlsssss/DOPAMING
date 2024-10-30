import './VacationRequest.css';
import { Button, VacationRequestForm } from '../../../../components';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export const RenderUserVacationRequest = async container => {
  // 기본 HTML 구조 설정
  container.innerHTML = `
    <div class="vacation-request-title">부재 신청</div>
    <div class="vacation-request-form"></div>
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
    onClick: async e => {
      e.preventDefault();

      // 입력값을 가져옴
      const type = formComponent.getType() || '';
      const title = formComponent.getTitle() || '';
      const startDate = formComponent.getStartDate() || '';
      const endDate = formComponent.getEndDate() || '';
      const content = formComponent.getContent() || '';

      // 부재 종류를 한국어로 변환
      const typeMapping = {
        officialLeave: '공가',
        sickLeave: '병가',
        annualLeave: '연차',
      };
      const koreanType = typeMapping[type] || '';

      const db = getDatabase();
      const auth = getAuth();
      const currentUser = auth.currentUser;

      // 로그인된 사용자 확인
      if (!currentUser) {
        alert('로그인된 사용자가 없습니다.');
        return;
      }

      // 사용자 정보 가져오기
      const userId = currentUser.uid;
      const userRef = ref(db, `Users/${userId}`);

      onValue(userRef, async snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userPosition = userData.user_position || '';
          const userPhone = userData.user_phone || '';

          // 사용자 입력값 가져오기 (빈 값은 무시)
          const absenceData = {
            ...(content && { abs_content: content }),
            abs_created_at: new Date().toISOString().split('T')[0],
            ...(endDate && { abs_end_date: endDate }),
            ...(startDate && { abs_start_date: startDate }),
            abs_status: '대기',
            ...(title && { abs_title: title }),
            ...(koreanType && { abs_type: koreanType }),
            user_id: userId,
            user_name: currentUser.displayName || currentUser.email,
            user_position: userPosition, // 사용자 포지션 추가
            user_phone: userPhone, // 사용자 전화번호 추가
          };

          // 데이터베이스에 업데이트 (사용자 ID 하위에 부재 신청 추가)
          const absenceRef = ref(db, `absences/${userId}`); // 사용자 ID 하위에 저장
          try {
            // push()를 사용하여 고유 ID 생성
            await push(absenceRef, absenceData);
            alert('부재 신청이 완료되었습니다.');
          } catch (error) {
            console.error('Error updating data:', error);
            alert('부재 신청 중 오류가 발생했습니다.');
          }
        } else {
          alert('사용자 정보를 찾을 수 없습니다.');
        }
      });
    },
  });

  buttonPosition.append(submitBtn);
};

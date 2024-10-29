import './WorkInfo.css';
import axios from 'axios';

export const WorkInfo = async (userId, date) => {
  const jsonFilePath = '../../../../server/data/time_punch.json';

  try {
    const response = await axios.get(jsonFilePath);
    const users = Array.isArray(response.data) ? response.data : []; // 배열인지 확인 후 기본값 설정

    console.log('전체 사용자 데이터:', users);

    // date가 Date 객체가 아니라면 형식 변환
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const dateString = date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식

    // 특정 사용자 필터링 (punch_date 사용)
    const filteredUsers = users.filter(
      user => user.user_id === userId && user.punch_date === dateString,
    );

    console.log(
      `Filtering with userId: ${userId} and punchDate: ${dateString}`,
    );
    console.log('필터링된 사용자 데이터:', filteredUsers);

    // 기본 사용자 정보 초기화
    let userName = '사용자';
    let punchInTime = '--시 --분';
    let punchOutTime = '--시 --분';
    let breakOutTime = '--시 --분';
    let breakInTime = '--시 --분';

    if (filteredUsers.length > 0) {
      const selectedUserData = filteredUsers[0];
      userName = selectedUserData.user_name || userName;

      // 추가 디버깅 로그
      console.log('선택된 사용자 데이터:', selectedUserData);
      console.log('사용자 이름:', userName);

      punchInTime = selectedUserData.punch_in
        ? new Date(selectedUserData.punch_in).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        : punchInTime;

      punchOutTime = selectedUserData.punch_out
        ? new Date(selectedUserData.punch_out).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        : punchOutTime;

      breakOutTime = selectedUserData.break_out
        ? new Date(selectedUserData.break_out).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        : breakOutTime;

      breakInTime = selectedUserData.break_in
        ? new Date(selectedUserData.break_in).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        : breakInTime;
    }

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const htmlOutput = `
        <div class="work-header">
          <div class="work-title">
            <p class="work-title-text">출/퇴근 상세정보</p>
            <input type="date" class="punch-date" value="${dateString}" />
          </div>
          <div class="work-content">
            <p class="work-desc">오늘 하루도 파이팅 하세요!<br>${userName}님의 매일을 응원합니다</p>
            <div class="punch-info">
              <div class="punch-info-title">
                <p class="punch-in">출근</p>
                <p class="punch-out">퇴근</p>
                <p class="break-out">외출</p>
                <p class="break-in">복귀</p>
              </div>
              <div class="punch-info-time">
                <p class="punch-in-time">${punchInTime}</p>
                <p class="punch-out-time">${punchOutTime}</p>
                <p class="break-outtime">${breakOutTime}</p>
                <p class="break-in-time">${breakInTime}</p>
              </div>
            </div>
          </div>
        </div>
      `;

    return {
      userInfo: filteredUsers.length > 0 ? filteredUsers[0] : null,
      html: htmlOutput,
      currentTime,
    };
  } catch (error) {
    console.error('사용자 데이터를 가져오는 중 오류 발생! :', error);
    return { userInfo: null, html: '', currentTime: '' };
  }
};

import './WorkInfo.css';
import { getDatabase, ref, get } from 'firebase/database'; // Firebase Database 가져오기

export const WorkInfo = async (userId, date) => {
  const db = getDatabase(); // 데이터베이스 인스턴스 가져오기
  const timePunchRef = ref(db, 'Time-punch'); // 출퇴근 데이터 경로

  try {
    const snapshot = await get(timePunchRef); // 데이터 가져오기
    const users = snapshot.exists() ? snapshot.val() : {}; // 데이터가 존재하는 경우 가져오기

    // date가 Date 객체가 아니라면 형식 변환
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const dateString = date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식

    // 특정 사용자 필터링 (punch_date 사용)
    const filteredUsers = [];
    for (const userKey in users) {
      const userPunches = users[userKey];
      if (
        userPunches[dateString] &&
        userPunches[dateString].user_id === userId
      ) {
        filteredUsers.push(userPunches[dateString]); // 해당 날짜의 데이터 추가
      }
    }

    // 기본 사용자 정보 초기화
    let userName = '사용자';
    let punchInTime = '--시 --분';
    let punchOutTime = '--시 --분';
    let breakOutTime = '--시 --분';
    let breakInTime = '--시 --분';

    if (filteredUsers.length > 0) {
      const selectedUserData = filteredUsers[0];
      userName = selectedUserData.user_name || userName;

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
    } else {
      console.log('해당 날짜와 사용자에 대한 출퇴근 데이터가 없습니다.'); // 데이터가 없을 경우 로그
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

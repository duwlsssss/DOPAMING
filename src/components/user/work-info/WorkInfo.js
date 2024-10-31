import './WorkInfo.css';
import { fetchTimePunchData, fetchUserData } from '../../../../server/api/user';

export const WorkInfo = async (userId, date) => {
  try {
    const userTimePunchData = await fetchTimePunchData(userId); // 사용자 출퇴근 데이터 가져오기
    const userData = await fetchUserData(userId); // 사용자 이름 가져오기

    // date가 Date 객체가 아니라면 형식 변환
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const dateString = date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식

    // 특정 날짜의 데이터 필터링
    const filteredUserData = userTimePunchData.find(
      data => data.punch_date === dateString,
    );

    // 기본 사용자 정보 초기화
    let userName = userData?.user_name || '사용자';
    let punchInTime = '00시 00분';
    let punchOutTime = '00시 00분';
    let breakOutTime = '00시 00분';
    let breakInTime = '00시 00분';

    if (filteredUserData) {
      punchInTime = filteredUserData.punch_in
        ? formatTime(filteredUserData.punch_in)
        : punchInTime;

      punchOutTime = filteredUserData.punch_out
        ? formatTime(filteredUserData.punch_out)
        : punchOutTime;

      breakOutTime = filteredUserData.break_out
        ? formatTime(filteredUserData.break_out)
        : breakOutTime;

      breakInTime = filteredUserData.break_in
        ? formatTime(filteredUserData.break_in)
        : breakInTime;
    } else {
      console.log('해당 날짜와 사용자에 대한 출퇴근 데이터가 없습니다.');
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
      userInfo: filteredUserData || null,
      html: htmlOutput,
      currentTime,
    };
  } catch (error) {
    console.error('오류 발생!', error);
    return { userInfo: null, html: '', currentTime: '' };
  }
};

// 시간 포맷팅 함수
const formatTime = timeString => {
  const timeParts = timeString.split(' ');
  if (timeParts.length > 1) {
    const time = new Date(timeParts[0] + 'T' + timeParts[1]);
    if (!isNaN(time.getTime())) {
      return time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }
  }
  return '--시 --분'; // 유효하지 않은 경우 기본값 반환
};

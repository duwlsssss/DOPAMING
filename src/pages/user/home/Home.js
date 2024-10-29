import './Home.css';
import {
  RenderCourseExplain,
  RenderPunchTime,
  RenderNoticeGallery,
  RenderVacationTable,
  WorkInfo,
} from '../../../components';
import { formatDate } from '../../../utils/currentTime';
import { INFO } from '../../../utils/constants';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchTimePunchData } from '../../../../server/api/user'; // 사용자 데이터 가져오기
import axios from 'axios'; // axios 추가

// 공지 데이터 가져오기
const fetchNoticeData = async () => {
  try {
    const response = await axios.get('../../server/data/company_posts.json');
    const posts = response.data.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    ); // 업데이트 일자 기준 내림차순 정렬

    return posts;
  } catch (error) {
    console.error('공지 데이터를 가져오는 중 오류 발생 ! :', error);
  }
};

// 부재 데이터 가져오기
const fetchAbsData = async userId => {
  try {
    const response = await axios.get('../../server/data/absences.json');
    const absences = response.data.filter(
      absence => absence.user_id === userId,
    );
    return absences;
  } catch (error) {
    console.error('부재 데이터를 가져오는 중 오류 발생 ! :', error);
  }
};

export const RenderUserHome = async container => {
  const auth = getAuth(); // 인증 인스턴스 가져오기

  onAuthStateChanged(auth, async user => {
    if (!user) {
      console.error('사용자가 로그인하지 않았습니다.');
      return;
    }

    const today = formatDate(new Date()); // 오늘 날짜를 YYYY-MM-DD 형식으로 포맷
    const userId = user.uid; // 현재 로그인한 사용자의 고유 ID

    try {
      //const userData = await fetchUserData(userId); // 사용자 데이터 가져오기
      const noticeData = await fetchNoticeData(); // 공지 데이터 가져오기
      const absData = await fetchAbsData(userId); // 결석 데이터 가져오기
      const timePunchData = await fetchTimePunchData(userId); // 출근/퇴근 데이터 가져오기

      // 모든 출퇴근 기록 출력
      console.log('출근/퇴근 데이터:', timePunchData);

      // 오늘 날짜에 해당하는 데이터 필터링
      const todayData = timePunchData.filter(
        punch => punch.punch_date === today,
      );

      // 데이터가 올바르게 반환되었는지 확인
      if (!Array.isArray(todayData) || todayData.length === 0) {
        console.error(
          '오늘 날짜에 해당하는 출근/퇴근 데이터가 없습니다.',
          todayData,
        );
        return;
      }

      container.innerHTML = `
        <div class="home-container">
          <div class="home-left">
            <section class="course-explain-container">
              <article></article>
            </section>
            <section class="notice-gallery-container">
              <article></article>
            </section>
          </div>
          <div class="home-right">
            <section class="punch-time-container">
              <article></article>
            </section>
            <section class="vacation-table-container">
              <article></article>
            </section>
          </div>
        </div>
      `;

      // 오늘 날짜의 출퇴근 정보를 WorkInfo에 전달하여 렌더링
      const workInfo = await WorkInfo(todayData, new Date());
      const punchTimeContainer = container.querySelector(
        '.punch-time-container article',
      );

      // Ensure punchTimeContainer is defined
      if (punchTimeContainer) {
        punchTimeContainer.innerHTML = workInfo.html;
        // Render the punch time using the todayData
        RenderPunchTime(punchTimeContainer, todayData);
      } else {
        console.error('punchTimeContainer가 정의되지 않았습니다.');
      }

      // 각 컴포넌트 렌더링
      RenderCourseExplain(
        container.querySelector('.course-explain-container article'),
        INFO.BC_START_DATE,
        INFO.BC_END_DATE,
      );
      RenderNoticeGallery(
        container.querySelector('.notice-gallery-container article'),
        noticeData,
      );
      RenderVacationTable(
        container.querySelector('.vacation-table-container article'),
        absData,
      );
    } catch (e) {
      console.error('홈 페이지에서 데이터를 가져오는 중 오류 발생 ! :', e);
    }
  });
};

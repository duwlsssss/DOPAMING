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
import { getItem } from '../../../utils/storage';
import axios from 'axios';

// api 개발되면 apis 폴더에 분리 예정
// 사용자 데이터 가져오기
const fetchUserData = async userId => {
  try {
    const response = await axios.get('../../server/data/users.json');
    const users = response.data.find(user => user.user_id === userId);

    return users;
  } catch (error) {
    console.error('사용자 데이터를 가져오는 중 오류 발생 ! :', error);
  }
};

// 공지 데이터 가져오기
const fetchNoticeData = async () => {
  try {
    const response = await axios.get('../../server/data/company_posts.json');
    const posts = response.data.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    ); //업데이트 일자 기준 내림차순 정렬

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
    console.error('공지 데이터를 가져오는 중 오류 발생 ! :', error);
  }
};

export const RenderUserHome = async container => {
  try {
    const today = formatDate(new Date());
    const userId = getItem('userID');
    const userData = await fetchUserData(userId);
    const userInfo = await WorkInfo(userData.user_id, today);
    const noticeData = await fetchNoticeData();
    const absData = await fetchAbsData(userId);

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

    RenderCourseExplain(
      container.querySelector('.course-explain-container article'),
      INFO.BC_START_DATE,
      INFO.BC_END_DATE,
    );
    RenderNoticeGallery(
      container.querySelector('.notice-gallery-container article'),
      noticeData,
    );
    RenderPunchTime(
      container.querySelector('.punch-time-container article'),
      userInfo,
      today,
    );
    RenderVacationTable(
      container.querySelector('.vacation-table-container article'),
      absData,
    );
  } catch (e) {
    console.error('홈 페이지에서 데이터를 가져오는 중 오류 발생 ! :', e);
  }
};

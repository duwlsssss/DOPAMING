// import './Home.css';
// import { WorkInfo, Button, RenderNoticeItem } from '../../../components';
// import {
//   formatDate,
//   formatUserTime,
//   formatTimeWithSeconds,
//   calculateDday,
//   calculateDegree,
// } from '../../../utils/currentTime';
// import { USER_PATH, INFO } from '../../../utils/constants';
// import navigate from '../../../utils/navigation';
// import { getItem } from '../../../utils/storage';
// import axios from 'axios';

// const CourseExplainContainer = endDate => {
//   const { deg, progressPercent } = calculateDegree(endDate, '2024-09-23');
//   const dDay = calculateDday(endDate);
//   const container = document.createElement('article');
//   container.classList.add('course-explain');
//   container.innerHTML = `
//     <div class="left-course">
//       <div class="main-title">
//         <p>교육 최강 플랫폼</p>
//         <p>DOPAMING</p>
//       </div>
//       <div class="sub-title">
//         <p>우리는</p>
//         <p>코딩을 하면서</p>
//         <p>도파민이 나온다</p>
//       </div>
//     </div>
//     <div class="right-course">
//       <div class="d-day">${dDay}</div>
//       <div class="message">
//         <p>교육 마감일이 얼마 남지 않았어요</p>
//         <p>우리 같이 힘내요!</p>
//       </div>
//       <div class="chart">
//         <div class="chart-bar" data-deg="${deg}"></div>
//         <div class="chart-percentage">${progressPercent}%</div>
//       </div>
//     </div>
//   `;

//   // 차트 진행도 적용 함수
//   const updateChart = () => {
//     const chartBar = container.querySelector('.chart-bar');
//     chartBar.style.background = `conic-gradient(var(--color-blue) ${deg}deg, var(--color-pale-gray) ${deg}deg)`;
//   };

//   updateChart();

//   return container;
// };

// const PunchTimeContainer = (userInfo, today) => {
//   const container = document.createElement('article');
//   container.classList.add('punch-time');
//   container.innerHTML = `
//     <div class="curr-time-title">현재 시각</div>
//     <div class="curr-time-board">
//       <span class="material-symbols-rounded">alarm</span>
//       <p class="curr-date">${today}</p>
//       <p class="curr-time">${formatTimeWithSeconds(new Date())}</p>
//     </div>
//     <div class="punch-time-header">
//       <p>출/퇴근 관리</p>
//     </div>
//     <div class="punch-time-board">
//       <div class="punch-time-board-box" id="punch-in">
//         <p class="punch-time-board-box-title">출근 시간</p>
//         <span class="punch-time-board-box-content">${formatUserTime(userInfo?.punch_in)}</span>
//       </div>
//       <div class="punch-time-board-box" id="punch-out">
//         <p class="punch-time-board-box-title">퇴근 시간</p>
//         <span class="punch-time-board-box-content">${formatUserTime(userInfo?.punch_out)}</span>
//       </div>
//       <div class="punch-time-board-box" id="break-out">
//         <p class="punch-time-board-box-title">외출 시간</p>
//         <span class="punch-time-board-box-content">${formatUserTime(userInfo?.break_out)}</span>
//       </div>
//       <div class="punch-time-board-box" id="break-in">
//         <p class="punch-time-board-box-title">복귀 시간</p>
//         <span class="punch-time-board-box-content">${formatUserTime(userInfo?.break_in)}</span>
//       </div>
//     </div>
//   `;

//   // 버튼
//   const moreButton = new Button({
//     className: 'punch-more-button',
//     text: '상세 보기',
//     color: 'gray',
//     shape: 'block',
//     fontSize: 'var(--font-small)',
//     onClick: () => navigate(USER_PATH.WORK_DETAIL),
//   });
//   const punchInBtn = new Button({
//     className: 'punch-in-button',
//     text: '출근하기',
//     color: 'green',
//     shape: 'block',
//     fontSize: 'var(--font-small)',
//   });
//   const punchOutBtn = new Button({
//     className: 'punch-out-button',
//     text: '퇴근하기',
//     color: 'gray',
//     shape: 'block',
//     fontSize: 'var(--font-small)',
//   });
//   const breakOutBtn = new Button({
//     className: 'break-out-btn',
//     text: '외출하기',
//     color: 'gray',
//     shape: 'block',
//     fontSize: 'var(--font-small)',
//   });

//   const breakInBtn = new Button({
//     className: 'break-in-btn',
//     text: '복귀하기',
//     color: 'green',
//     shape: 'block',
//     fontSize: 'var(--font-small)',
//   });

//   const moreBtnContainer = container.querySelector('.punch-time-header');
//   moreBtnContainer.appendChild(moreButton);

//   const punchInBtnContainer = container.querySelector('#punch-in');
//   punchInBtnContainer.appendChild(punchInBtn);

//   const punchOutBtnContainer = container.querySelector('#punch-out');
//   punchOutBtnContainer.appendChild(punchOutBtn);

//   const breakOutBtnContainer = container.querySelector('#break-out');
//   breakOutBtnContainer.appendChild(breakOutBtn);

//   const breakInBtnContainer = container.querySelector('#break-in');
//   breakInBtnContainer.appendChild(breakInBtn);

//   // 현재 시간 업데이트 함수
//   const startClock = () => {
//     const timeElement = container.querySelector('.curr-time');
//     setInterval(() => {
//       const currentTime = formatTimeWithSeconds(new Date());
//       timeElement.textContent = currentTime;
//     }, 1000);
//   };
//   // 현재 시각 업데이트 시작
//   startClock();

//   return container;
// };

// const NoticeGalleryContainer = noticeData => {
//   const container = document.createElement('article');
//   container.classList.add('notice-gallery');

//   // 공지사항 목록
//   const noticeItems = noticeData
//     .map(
//       post => `
//         <div class="notice-item-container" id="notice-${post.post_id}" post-id="${post.post_id}">
//           ${RenderNoticeItem(null, post)}
//         </div>
//       `,
//     )
//     .join('');

//   container.innerHTML = `
//     <div class="notice-gallery-header">
//       <p>공지 게시판</p>
//     </div>
//     <div class="notice-list">
//       ${noticeItems}
//     </div>
//   `;

//   const moreButton = new Button({
//     className: 'notice-more-button',
//     text: '더보기',
//     color: 'gray',
//     shape: 'block',
//     fontSize: 'var(--font-small)',
//     onClick: () => navigate(USER_PATH.NOTICE),
//   });

//   const moreBtnContainer = container.querySelector('.notice-gallery-header');
//   moreBtnContainer.appendChild(moreButton);

//   // 공지사항 클릭 시 notice-detail 페이지로 이동
//   const attachClickHandlersToNotices = () => {
//     const noticeItems = container.querySelectorAll('.notice-item-container');
//     noticeItems.forEach(item => {
//       item.addEventListener('click', () => {
//         const postId = item.getAttribute('post-id');
//         navigate(`/notice/${postId}`);
//       });
//     });
//   };

//   attachClickHandlersToNotices();

//   return container;
// };

// const VacationTableContainer = absData => {
//   const container = document.createElement('article');
//   container.classList.add('vacation-table');

//   const vacationItems = absData
//     .map(
//       abs => `
//         <div class="vacation-item">
//           <div class="vc-item-title">[${abs.abs_type}] ${abs.abs_title}</div>
//           <div class="vc-item-etc">
//             <div class="vc-item-date">${abs.abs_created_at}</div>
//             <div class="vc-item-status-${abs.abs_status === '승인' ? 'Y' : 'N'}">${abs.abs_status === '승인' ? 'Y' : 'N'}</div>
//           </div>
//         </div>
//       `,
//     )
//     .join('');

//   container.innerHTML = `
//     <div class="vacation-table-header">
//       <p>부재 결재 현황</p>
//     </div>
//     <div class="vacation-table-box">
//       <div class="vacation-table-box-header">
//         <div class="vc-header-title">제목</div>
//         <div class="vc-header-etc">
//           <div class="vc-header-date">신청 날짜</div>
//           <div class="vc-header-status">승인 여부</div>
//         </div>
//       </div>
//       <div class="vacation-table-box-content">
//         ${vacationItems}
//       </div>
//     </div>
//   `;

//   const moreButton = new Button({
//     className: 'vacation-more-button',
//     text: '상세 보기',
//     color: 'gray',
//     shape: 'block',
//     fontSize: 'var(--font-small)',
//     onClick: () => navigate(USER_PATH.VACATION),
//   });

//   const moreBtnContainer = container.querySelector('.vacation-table-header');
//   moreBtnContainer.appendChild(moreButton);

//   return container;
// };

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

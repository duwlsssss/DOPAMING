import './Home.css';
import { WorkInfo, Button, RenderNoticeItem } from '../../../components';
import {
  formatDate,
  formatUserTime,
  formatTimeWithSeconds,
  calculateDday,
} from '../../../utils/currentTime';
import { USER_PATH } from '../../../utils/constants';
import navigate from '../../../utils/navigation';
import { getItem } from '../../../utils/storage';
import axios from 'axios';

// 부캠 진행도 계산 함수
const calculateDegree = (endDate, startDate = new Date()) => {
  const now = new Date();
  const end = new Date(endDate);
  const start = new Date(startDate);

  // 전체 기간 (일수)
  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.max(
    0,
    Math.floor((now - start) / (1000 * 60 * 60 * 24)),
  );

  // 진행도 비율 (퍼센트)
  const progressPercent = Math.min(
    100,
    Math.floor((elapsedDays / totalDays) * 100),
  );

  // deg 계산 (진행도를 conic-gradient 각도로 변환)
  const deg = (progressPercent / 100) * 360;

  return { deg, progressPercent };
};

const CourseExplainContainer = endDate => {
  const { deg, progressPercent } = calculateDegree(endDate, '2024-09-23');
  const dDay = calculateDday(endDate);
  const container = document.createElement('article');
  container.classList.add('course-explain');
  container.innerHTML = `
    <div class="left-course">
      <div class="main-title"> 
        <p>교육 최강 플랫폼</p>
        <p>DOPAMING</p>
      </div>
      <div class="sub-title">
        <p>우리는</p>
        <p>코딩을 하면서</p>
        <p>도파민이 나온다</p>
      </div>
    </div>
    <div class="right-course">
      <div class="d-day">${dDay}</div>
      <div class="message">
        <p>교육 마감일이 얼마 남지 않았어요</p>
        <p>우리 같이 힘내요!</p>
      </div>
      <div class="chart">
        <div class="chart-bar" data-deg="${deg}"></div>
        <div class="chart-percentage">${progressPercent}%</div>
      </div>
    </div>
  `;

  // 차트 진행도 적용 함수
  const updateChart = () => {
    const chartBar = container.querySelector('.chart-bar');
    chartBar.style.background = `conic-gradient(var(--color-blue) ${deg}deg, var(--color-pale-gray) ${deg}deg)`;
  };

  updateChart();

  return container;
};

const PunchTimeContainer = async (userInfo, today) => {
  const container = document.createElement('article');
  container.classList.add('punch-time');
  container.innerHTML = `
    <div class="curr-time-title">현재 시각</div>
    <div class="curr-time-board">
      <span class="material-symbols-rounded">alarm</span>
      <p class="curr-date">${today}</p>
      <p class="curr-time">${formatTimeWithSeconds(new Date())}</p>
    </div>
    <div class="punch-time-header">
      <p>출/퇴근 관리</p>
    </div>
    <div class="punch-time-board">
      <div class="punch-time-board-box" id="punch-in">
        <p class="punch-time-board-box-title">출근 시간</p>
        <span class="punch-time-board-box-content">${formatUserTime(userInfo?.punch_in)}</span>
      </div>
      <div class="punch-time-board-box" id="punch-out">
        <p class="punch-time-board-box-title">퇴근 시간</p>
        <span class="punch-time-board-box-content">${formatUserTime(userInfo?.punch_out)}</span>
      </div>
      <div class="punch-time-board-box" id="break-out">
        <p class="punch-time-board-box-title">외출 시간</p>
        <span class="punch-time-board-box-content">${formatUserTime(userInfo?.break_out)}</span>
      </div>
      <div class="punch-time-board-box" id="break-in">
        <p class="punch-time-board-box-title">복귀 시간</p>
        <span class="punch-time-board-box-content">${formatUserTime(userInfo?.break_in)}</span>
      </div>
    </div>
  `;

  // 버튼
  const moreButton = new Button({
    className: 'punch-more-button',
    text: '상세 보기',
    color: 'gray',
    shape: 'block',
    fontSize: 'var(--font-small)',
    onClick: () => navigate(USER_PATH.WORK_DETAIL),
  });
  const punchInBtn = new Button({
    className: 'punch-in-button',
    text: '출근하기',
    color: 'green',
    shape: 'block',
    fontSize: 'var(--font-small)',
  });
  const punchOutBtn = new Button({
    className: 'punch-out-button',
    text: '퇴근하기',
    color: 'gray',
    shape: 'block',
    fontSize: 'var(--font-small)',
  });
  const breakOutBtn = new Button({
    className: 'break-out-btn',
    text: '외출하기',
    color: 'gray',
    shape: 'block',
    fontSize: 'var(--font-small)',
  });

  const breakInBtn = new Button({
    className: 'break-in-btn',
    text: '복귀하기',
    color: 'green',
    shape: 'block',
    fontSize: 'var(--font-small)',
  });

  const moreBtnContainer = container.querySelector('.punch-time-header');
  moreBtnContainer.appendChild(moreButton);

  const punchInBtnContainer = container.querySelector('#punch-in');
  punchInBtnContainer.appendChild(punchInBtn);

  const punchOutBtnContainer = container.querySelector('#punch-out');
  punchOutBtnContainer.appendChild(punchOutBtn);

  const breakOutBtnContainer = container.querySelector('#break-out');
  breakOutBtnContainer.appendChild(breakOutBtn);

  const breakInBtnContainer = container.querySelector('#break-in');
  breakInBtnContainer.appendChild(breakInBtn);

  // 현재 시간 업데이트 함수
  const startClock = () => {
    const timeElement = container.querySelector('.curr-time');
    setInterval(() => {
      const currentTime = formatTimeWithSeconds(new Date());
      timeElement.textContent = currentTime;
    }, 1000);
  };
  // 현재 시각 업데이트 시작
  startClock();

  return container;
};

const NoticeGalleryContainer = noticeData => {
  const container = document.createElement('article');
  container.classList.add('notice-gallery');

  // 공지사항 목록
  const noticeItems = noticeData
    .map(
      post => `
        <div class="notice-item-container" id="notice-${post.post_id}" post-id="${post.post_id}">
          ${RenderNoticeItem(null, post)}
        </div>
      `,
    )
    .join('');

  container.innerHTML = `
    <div class="notice-gallery-header">
      <p>공지 게시판</p>
    </div>
    <div class="notice-list">
      ${noticeItems}
    </div>
  `;

  const moreButton = new Button({
    className: 'notice-more-button',
    text: '더보기',
    color: 'gray',
    shape: 'block',
    fontSize: 'var(--font-small)',
    onClick: () => navigate(USER_PATH.NOTICE),
  });

  const moreBtnContainer = container.querySelector('.notice-gallery-header');
  moreBtnContainer.appendChild(moreButton);

  // 공지사항 클릭 시 notice-detail 페이지로 이동
  const attachClickHandlersToNotices = () => {
    const noticeItems = container.querySelectorAll('.notice-item-container');
    noticeItems.forEach(item => {
      item.addEventListener('click', () => {
        const postId = item.getAttribute('post-id');
        navigate(`/notice/${postId}`);
      });
    });
  };

  attachClickHandlersToNotices();

  return container;
};

const VacationTableContainer = absData => {
  const container = document.createElement('article');
  container.classList.add('vacation-table');

  const vacationItems = absData
    .map(
      abs => `
        <div class="vacation-item">
          <div class="vc-item-title">[${abs.abs_type}] ${abs.abs_title}</div>
          <div class="vc-item-etc">
            <div class="vc-item-date">${abs.abs_created_at}</div>
            <div class="vc-item-status-${abs.abs_status === '승인' ? 'Y' : 'N'}">${abs.abs_status === '승인' ? 'Y' : 'N'}</div>
          </div>
        </div>
      `,
    )
    .join('');

  container.innerHTML = `
    <div class="vacation-table-header">
      <p>부재 결재 현황</p>
    </div>
    <div class="vacation-table-box">
      <div class="vacation-table-box-header">
        <div class="vc-header-title">제목</div>
        <div class="vc-header-etc">
          <div class="vc-header-date">신청 날짜</div>
          <div class="vc-header-status">승인 여부</div>
        </div>
      </div>
      <div class="vacation-table-box-content">
        ${vacationItems}
      </div>
    </div>
  `;

  const moreButton = new Button({
    className: 'vacation-more-button',
    text: '상세 보기',
    color: 'gray',
    shape: 'block',
    fontSize: 'var(--font-small)',
    onClick: () => navigate(USER_PATH.VACATION),
  });

  const moreBtnContainer = container.querySelector('.vacation-table-header');
  moreBtnContainer.appendChild(moreButton);

  return container;
};

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
  const endDate = '2025-04-18';
  const today = formatDate(new Date());
  const userId = getItem('userID');
  const userData = await fetchUserData(userId);
  const userInfo = await WorkInfo(userData.user_id, today);
  const noticeData = await fetchNoticeData();
  const absData = await fetchAbsData(userId);

  container.innerHTML = `
    <div class="home-container">
      <div class="home-left">
        <section class="course-explain-container"></section>
        <section class="notice-gallery-container"></section>
      </div>
      <div class="home-right">
        <section class="punch-time-container"></section>
        <section class="vacation-table-container"></section>
      </div>
    </div>
  `;

  const courseExplainContainer = container.querySelector(
    '.course-explain-container',
  );
  courseExplainContainer.appendChild(CourseExplainContainer(endDate));

  const noticeGalleryContainer = container.querySelector(
    '.notice-gallery-container',
  );
  noticeGalleryContainer.appendChild(NoticeGalleryContainer(noticeData));

  const punchTimeContainer = container.querySelector('.punch-time-container');
  punchTimeContainer.appendChild(await PunchTimeContainer(userInfo, today));

  const vacationTableContainer = container.querySelector(
    '.vacation-table-container',
  );
  vacationTableContainer.appendChild(VacationTableContainer(absData));
};

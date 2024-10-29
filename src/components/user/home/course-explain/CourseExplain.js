import './CourseExplain.css';
import { calculateDday, calculateDegree } from '../../../../utils/currentTime';

export const RenderCourseExplain = (container, startDate, endDate) => {
  const { deg, progressPercent } = calculateDegree(endDate, startDate);
  const dDay = calculateDday(endDate);
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

  const updateChart = () => {
    const chartBar = container.querySelector('.chart-bar');
    chartBar.style.background = `conic-gradient(var(--color-blue) ${deg}deg, var(--color-pale-gray) ${deg}deg)`;
  };

  updateChart();
};

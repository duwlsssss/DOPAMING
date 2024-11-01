import './Course.css';

export const RenderUserCourse = container => {
  container.innerHTML = `
    <div class="course-body">
      <div class="badge">CURRICULUM</div>

      <h2>
        30년차 실무 노하우를 담은
        <br>
        데브캠프만의 커리큘럼
      </h2>
      <p>
        우아한형제들 기술이사의 개발 노하우와 현업에서 사용하는 기술만을 담은 React 기반 커리큘럼으로
        <br>
        프론트엔드 개발의 기초부터 실전 협업 프로젝트까지 전부 경험할 수 있습니다.
      </p>

      <div class="main-layout">
        <!-- 3단 그리드 컨테이너 -->
        <div class="grid-container">
          <!-- 첫 번째 칼럼 -->
          <div class="grid-column">
            <div class="grid-title">기본 개념 및 이론</div>
            <div class="grid-item">Git/Github</div>
            <div class="grid-item">HTML/CSS</div>
            <div class="grid-item">JavaScript</div>
            <div class="grid-item">
              서비스 기획
              <p>문제 정의/구조화 및 프로젝트 설계 실습</p>
            </div>
          </div>

          <div class="grid-column">
            <div class="grid-title">앱 개발 심화</div>
            <div class="grid-item">
              React with TypeScript
              <p>SPA를 기반으로 하는 프레임워크 학습 및 Virtual DOM 이해</p>
            </div>
            <div class="grid-item">
              AI 활용
              <p>AI 엔지니어 업무 이해 및 트렌드</p>
              <p>생성형 AI 개요 및 프롬프트 엔지니어링</p>
            </div>
          </div>

          <div class="grid-column">
            <div class="grid-title">서비스 운영 및 모니터링</div>
            <div class="grid-item">
              Next.js
              <p>SSR을 기반으로 하는 웹사이트 개발</p>
            </div>
            <div class="grid-item">운영체제/네트워크</div>
            <div class="grid-item">협업 프로젝트 매니징</div>
          </div>
        </div>

        <div class="sidebar">
          <ul>
            <li>
              <h1>바로가기</h1>
            </li>
            <li>
              <a href="" target="_blank">
                <img src="/assets/imgs/course/notion.svg" alt="노션 아이콘" /> 부트캠프 노션
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                <img src="/assets/imgs/course/video-lecture.svg" alt="강의장 아이콘" /> 실시간 강의장
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                <img src="/assets/imgs/course/zoom.svg" alt="줌 아이콘" /> Zoom 입장
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                <img src="/assets/imgs/course/question.svg" alt="물음표 아이콘" /> 문의하기
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                <img src="/assets/imgs/course/home.svg" alt="홈 아이콘" /> 패스트캠퍼스 홈페이지
              </a>
            </li>
          </ul>
        </div>
      

        <div class="instructor-profile">
          <img src="/assets/imgs/course/teacher.png" alt="강사님 프로필" />
          <div>
            <h3>강사 한마디</h3>
            <p>
              프로그래밍 기초부터 심화학습, 서비스를 직접 설계해 제작하는 프로젝트까지 유기적으로 연결되는 반복학습을 통해 스스로 문제를 해결할 줄 아는 개발자가 되는 방법을 가르쳐드리겠습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};

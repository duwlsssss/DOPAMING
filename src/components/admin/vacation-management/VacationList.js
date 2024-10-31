import { getDatabase, ref, get } from 'firebase/database'; // Firebase Realtime Database 가져오기
import { getAuth } from 'firebase/auth'; // Firebase Authentication 가져오기
import { Accordion } from '../../ui/accordion/Accordion';
import { Button } from '../../ui/button/Button';
import { sortByName } from '../../../utils/sortByName';
import { Pagenation } from '../../common/pagenation/Pagenation';
import './VacationList.css';

export const RenderAdminVacationManagementList = async (
  container,
  filter = { type: 'vacation-all', status: 'approved-all' },
  currentPage = 1,
) => {
  container.innerHTML = `<div class="loading">휴가 정보를 가져오는 중입니다.</div>`;

  try {
    const db = getDatabase();
    const absencesRef = ref(db, 'absences');
    const usersRef = ref(db, 'Users');

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('로그인된 사용자가 없습니다.');
    }

    console.log('로그인한 사용자 ID:', currentUser.uid);

    const [absencesSnapshot, usersSnapshot] = await Promise.all([
      get(absencesRef),
      get(usersRef),
    ]);

    const absences = absencesSnapshot.exists() ? absencesSnapshot.val() : [];
    const users = usersSnapshot.exists() ? usersSnapshot.val() : {};

    console.log('부재 데이터:', absences);
    console.log('사용자 데이터:', users);

    let absenceUsersData = absences.map(absence => {
      const user = users[absence.user_id];

      if (!user) {
        console.warn(`사용자를 찾을 수 없습니다: ${absence.user_id}`);
      }

      console.log(
        `부재 ID: ${absence.absenceId}, 사용자 ID: ${absence.user_id}, 사용자 이름: ${user ? user.user_name : '없음'}`,
      );

      return {
        ...absence,
        user_name: user ? user.user_name : '알 수 없음',
        user_image: user ? user.user_image : '',
        user_phone: user ? user.user_phone : '',
        user_position: user ? user.user_position : '',
      };
    });

    console.log('휴가 사용자 데이터:', absenceUsersData);
    let sortedAbsenceUsersData = sortByName(absenceUsersData);
    console.log('정렬된 휴가 사용자 데이터:', sortedAbsenceUsersData);

    // 필터링
    if (filter.type !== 'vacation-all') {
      const absType = {
        vacation: '휴가',
        sick: '병가',
        official: '공가',
      };
      sortedAbsenceUsersData = sortedAbsenceUsersData.filter(
        absence => absence.abs_type === absType[filter.type],
      );

      console.log('필터링된 휴가 유형 데이터:', sortedAbsenceUsersData);
    }

    if (filter.status !== 'approved-all') {
      const statusType = {
        approved: '승인',
        rejected: '거부',
        pending: '대기',
      };
      sortedAbsenceUsersData = sortedAbsenceUsersData.filter(
        absence => absence.abs_status === statusType[filter.status],
      );

      console.log('필터링된 휴가 상태 데이터:', sortedAbsenceUsersData);
    }

    // 아코디언 헤더
    const renderHeader = item => `
      <header class="admin-vacation-info">
        <div class="admin-vacation-status-dot active"></div>
        <img src="${item.user_image}" alt="${item.user_name}" class="admin-vacation-avatar">
        <span class="admin-vacation-abs-type">${item.abs_type}</span>
        <span class="admin-vacation-name">${item.user_name}</span>
        <span class="admin-vacation-position">${item.user_position}</span>
        <span class="admin-vacation-phone">${item.user_phone}</span>
        <time class="admin-vacation-create-date">${item.abs_created_at}</time>
        <span class="admin-vacation-status status-${item.abs_status}">${item.abs_status}</span>
      </header>
    `;

    // 아코디언 컨텐츠
    const renderContent = (item, index) => {
      const downloadButton = new Button({
        text: '다운로드',
        color: 'skyblue',
        shape: 'block',
        padding: 'var(--space-xsmall) var(--space-small)',
        onClick: () => {
          const fileName = `FE_${item.user_name}_${item.abs_type}.pdf`;
          const fileUrl = `path/to/your/files/${fileName}`; // 파일 URL (서버에 파일이 있어야 함)

          // 로그 추가: 다운로드할 파일 정보 출력
          console.log(`다운로드할 파일 이름: ${fileName}`);
          console.log(`다운로드할 파일 URL: ${fileUrl}`);

          // 파일 다운로드
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      });

      return `
        <article class="detail-content">
          <div class="detail-grid">
            <section class="detail-item">
              <h3 class="detail-label">휴가 제목</h3>
              <div class="detail-value">${item.abs_title}</div>
            </section>
            
            <div class="detail-item">
              <h3 class="detail-label">휴가 기간</h3>
              <div class="detail-value">
                <time class="date">${item.abs_start_date}</time>
                <span class="date-separator">~</span>
                <time class="date">${item.abs_end_date}</time>
              </div>
            </div>

            <section class="detail-item">
              <h3 class="detail-label">첨부 파일</h3>
              <div class="download-file">
                <p class="detail-value">FE_${item.user_name}_${item.abs_type}.pdf</p>
                ${downloadButton.outerHTML}
              </div>
            </section>

            <section class="detail-item detail-content-box">
              <h3 class="detail-label">휴가 내용</h3>
              <p class="detail-value content-box" data-index="${index}">${item.abs_content}</p>
            </section>
          </div>

          <section class="detail-item">
            <h3 class="detail-label">첨부 파일</h3>
            <div class="download-file">
              <p class="detail-value">${item.abs_proof_document}</p>
              ${downloadButton.outerHTML}
            </div>
          </section>

          <section class="detail-item detail-content-box">
            <h3 class="detail-label">휴가 내용</h3>
            <p class="detail-value content-box" data-index="${index}">${item.abs_content}</p>
          </section>
        </div>

        ${renderButtons(item.abs_status)}
      </article>
    `;

    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const diplayedAbsencesList = sortedAbsenceUsersData.slice(
      startIndex,
      endIndex,
    );

    // 아코디언 렌더링
    container.innerHTML = `
      <section class="admin-vacation-list-section">
        <div class="admin-vacation-list">
            ${Accordion({
              items: diplayedAbsencesList,
              renderHeader,
              renderContent,
            })}
        </div>
      </section>
    `;

    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';

    const handlePageChange = newPage => {
      RenderAdminVacationManagementList(container, filter, newPage);
    };

    const paginationElement = Pagenation(
      sortedAbsenceUsersData.length,
      itemsPerPage,
      currentPage,
      handlePageChange,
    );

    paginationContainer.appendChild(paginationElement);
    container.appendChild(paginationContainer);
  } catch (error) {
    console.error('데이터를 불러오는 중 오류 발생:', error.message);
    let errorMessage = '데이터를 불러오는 중 오류가 발생했습니다.';

    container.innerHTML = `
      <div class="admin-vacation-section error">
        ${errorMessage}
      </div>
    `;
  }
};

import axios from 'axios';

import { Accordion } from '../../ui/accordion/Accordion';
import './VacationList.css';

export const RenderAdminVacationManagementList = async container => {
  container.innerHTML = `<div class="loading">휴가 정보를 가져오는 중입니다.</div>`;

  try {
    const [absencesResponse, usersResponse] = await Promise.all([
      axios.get('../../../../server/data/absences.json'),
      axios.get('../../../../server/data/users.json'),
    ]);

    const absences = absencesResponse.data;
    const users = usersResponse.data;

    const mergedData = absences.map(absence => {
      const user = users.find(user => user.user_id === absence.user_id);
      return {
        ...absence,
        user_name: user.user_name,
        user_image: user.user_image,
        user_phone: user.user_phone,
        user_position: user.user_position,
      };
    });

    const renderHeader = item => `
      <div class="admin-vacation-info">
        <div class="admin-vacation-status-dot active"></div>
        <img src="${item.user_image}" alt="${item.user_name}" class="admin-vacation-avatar">
        <span class="admin-vacation-abs-type">${item.abs_type}</span>
        <span class="admin-vacation-name">${item.user_name}</span>
        <span class="admin-vacation-position">${item.user_position}</span>
        <span class="admin-vacation-phone">${item.user_phone}</span>
        <span class="admin-vacation-create-date">${item.abs_created_at}</span>
      </div>
    `;

    const renderContent = (item, index) => `
      <div class="detail-content">
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-label">휴가 제목</div>
            <div class="detail-value">${item.abs_title}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">휴가 기간</div>
            <div class="detail-value">
            <span class="date">${item.abs_start_date}</span>
            <span class="date-separator">~</span>
            <span class="date">${item.abs_end_date}</span>
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-label">첨부 파일</div>
            <div class="download-file">
              <div class="detail-value">FE_${item.user_name}_${item.abs_type}.pdf</div>
              <button class="detail-download-btn">다운로드</button>
            </div>
          </div>

          <div class="detail-item detail-content-box">
            <div class="detail-label">휴가 내용</div>
            <div class="detail-value content-box" data-index="${index}">${item.abs_content}</div>
          </div>
          </div>
      </div>
    `;

    container.innerHTML = `
      <section class="admin-vacation-list-section">
        <div class="admin-vacation-list">
            ${Accordion({
              items: mergedData,
              renderHeader,
              renderContent,
            })}
        </div>
      </section>
    `;
  } catch (error) {
    let errorMessage = '데이터를 불러오는 중 오류가 발생했습니다.';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || errorMessage}`;
      } else if (error.request) {
        errorMessage = '서버로부터 응답을 받지 못했습니다.';
      }
    }

    container.innerHTML = `
      <div class="admin-vacation-section error">
        ${errorMessage}
      </div>
    `;
  }
};

import './VacationTable.css';
import { Button } from '../../../ui/button/Button';
import navigate from '../../../../utils/navigation';
import { USER_PATH } from '../../../../utils/constants';

export const RenderVacationTable = (container, absData) => {
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
};

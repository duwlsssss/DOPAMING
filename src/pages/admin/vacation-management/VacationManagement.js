import { RenderAdminVacationManagementHeader } from '../../../components/admin/vacation-management/VacationHeader';

export const RenderAdminVacationManagement = container => {
  container.innerHTML = `
    <main class="admin-vacation-management-container">
      <div id="adminVacationManagementHeaderSection"></div>
    </main>
  `;

  const headerSection = document.querySelector(
    '#adminVacationManagementHeaderSection',
  );

  RenderAdminVacationManagementHeader(headerSection);
};

import { sortByName } from './sortByName';
import { adminFetchMeber, adminFetchVacation } from '../../server/api/admin';

export class VacationStore {
  constructor() {
    this.users = null;
    this.vacations = null;
    this.currentFilter = { type: 'vacation-all', status: 'approved-all' };
    this.currentPage = 1;
  }

  async initialize() {
    if (!this.users) {
      try {
        this.users = await adminFetchMeber();
        if (!this.users) {
          throw new Error('직원 정보를 불러올 수 없습니다.');
        }

        this.vacations = [];
        for (const user of this.users) {
          const vacations = await adminFetchVacation(user.user_id);
          if (vacations) {
            const vacationsWithUserInfo = vacations.map(vacation => ({
              ...vacation,
              user_id: user.user_id,
              user_name: user.user_name,
              user_position: user.user_position,
              user_phone: user.user_phone,
              user_image: user.user_image,
            }));
            this.vacations.push(...vacationsWithUserInfo);
          }
        }
      } catch (error) {
        console.error('Failed to initialize vacation store:', error);
        throw error;
      }
    }
  }

  getFilteredVacations() {
    let filteredVacations = [...this.vacations];

    if (this.currentFilter.type !== 'vacation-all') {
      const absType = {
        vacation: '휴가',
        sick: '병가',
        official: '공가',
      };
      filteredVacations = filteredVacations.filter(
        vacation => vacation.abs_type === absType[this.currentFilter.type],
      );
    }

    if (this.currentFilter.status !== 'approved-all') {
      const statusType = {
        approved: '승인',
        rejected: '거부',
        pending: '대기',
      };
      filteredVacations = filteredVacations.filter(
        vacation =>
          vacation.abs_status === statusType[this.currentFilter.status],
      );
    }

    return sortByName(filteredVacations);
  }

  setFilter(filter) {
    this.currentFilter = { ...filter };
  }

  setPage(page) {
    this.currentPage = page;
  }

  async refreshData() {
    this.users = null;
    this.vacations = null;
    await this.initialize();
  }
}

export const vacationStore = new VacationStore();

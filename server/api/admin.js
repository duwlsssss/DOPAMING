import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, remove, update } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// 휴가 관련 API
export const AbsenceAPI = {
  // 휴가 승인
  approveAbsence: async abs_id => {
    const absenceRef = ref(database, `Absences/${abs_id}`);

    try {
      const snapshot = await get(absenceRef);
      if (!snapshot.exists()) {
        throw new Error('해당 휴가 정보가 존재하지 않습니다.');
      }

      await update(absenceRef, {
        abs_status: '승인',
      });

      return { success: true, message: '휴가가 승인되었습니다.' };
    } catch (error) {
      console.error('휴가 승인 중 오류 발생: ', error);
      throw error;
    }
  },

  // 휴가 거부
  rejectAbsence: async abs_id => {
    const absenceRef = ref(database, `Absences/${abs_id}`);

    try {
      const snapshot = await get(absenceRef);
      if (!snapshot.exists()) {
        throw new Error('휴가 신청 데이터가 존재하지 않습니다.');
      }

      await update(absenceRef, {
        abs_status: '거부',
      });

      return { success: true, message: '휴가가 거부되었습니다.' };
    } catch (error) {
      console.error('휴가 거부 중 오류 발생:', error);
      throw error;
    }
  },

  // 거부 취소
  cancelRejection: async abs_id => {
    const absenceRef = ref(database, `Absences/${abs_id}`);

    try {
      const snapshot = await get(absenceRef);
      if (!snapshot.exists()) {
        throw new Error('휴가 신청 데이터가 존재하지 않습니다.');
      }

      await update(absenceRef, {
        abs_status: '대기',
      });

      return { success: true, message: '거부가 취소되었습니다.' };
    } catch (error) {
      console.error('거부 취소 중 오류 발생:', error);
      throw error;
    }
  },

  // 승인 취소
  cancelApproval: async abs_id => {
    const absenceRef = ref(database, `Absences/${abs_id}`);

    try {
      const snapshot = await get(absenceRef);
      if (!snapshot.exists()) {
        throw new Error('휴가 신청 데이터가 존재하지 않습니다.');
      }

      await update(absenceRef, {
        abs_status: '대기',
      });

      return { success: true, message: '승인이 취소되었습니다.' };
    } catch (error) {
      console.error('승인 취소 중 오류 발생:', error);
      throw error;
    }
  },
};

// 공지사항 관련 API
export const noticeAPI = {
  // 모든 공지사항 불러오기
  getAllNotices: async () => {
    const noticesRef = ref(database, 'Notices');

    try {
      const snapshot = await get(noticesRef);
      if (!snapshot.exists()) {
        throw new Error('공지사항이 존재하지 않습니다.');
      }

      const notices = [];
      snapshot.forEach(childSnapshot => {
        notices.push({
          post_id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });

      return notices.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
      );
    } catch (error) {
      console.error('모든 공지사항 불러오기 중 오류 발생:', error);
      throw error;
    }
  },

  // 개별 공지사항 불러오기
  getNoticeById: async post_id => {
    const noticeRef = ref(database, `Notices/${post_id}`);

    try {
      const snapshot = await get(noticeRef);
      if (!snapshot.exists()) {
        throw new Error('해당 공지사항이 존재하지 않습니다.');
      }

      return {
        post_id: snapshot.key,
        ...snapshot.val(),
      };
    } catch (error) {
      console.error('개별 공지사항 불러오기 중 오류 발생:', error);
      throw error;
    }
  },

  // 공지사항 수정하기
  updateNotice: async (post_id, updateData) => {
    const noticeRef = ref(database, `Notices/${post_id}`);

    try {
      const snapshot = await get(noticeRef);
      if (!snapshot.exists()) {
        throw new Error('해당 공지사항이 존재하지 않습니다.');
      }

      const updatedNotice = {
        ...updateData,
        updated_at: new Date().toLocaleDateString(),
      };

      await update(noticeRef, updatedNotice);
      return { success: true, message: '공지사항이 수정되었습니다.' };
    } catch (error) {
      console.error('공지사항 수정 중 오류 발생:', error);
      throw error;
    }
  },

  // 공지사항 삭제하기
  deleteNotice: async post_id => {
    const noticeRef = ref(database, `Notices/${post_id}`);

    try {
      const snapshot = await get(noticeRef);
      if (!snapshot.exists()) {
        throw new Error('해당 공지사항이 존재하지 않습니다.');
      }

      await remove(noticeRef);
      return { success: true, message: '공지사항이 삭제되었습니다.' };
    } catch (error) {
      console.error('공지사항 삭제 중 오류 발생:', error);
      throw error;
    }
  },
};

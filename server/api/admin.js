import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  remove,
  update,
} from 'firebase/database';
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
        return [];
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

  // 공지사항 추가하기
  addNotice: async newNotice => {
    const noticesRef = ref(database, 'Notices');

    try {
      const newNoticeRef = push(noticesRef);
      await set(newNoticeRef, {
        ...newNotice,
        post_id: newNoticeRef.key,
        created_at: new Date().toLocaleDateString(),
        updated_at: new Date().toLocaleDateString(),
      });

      return { success: true, message: '공지사항이 추가되었습니다.' };
    } catch (error) {
      console.error('공지사항 추가 중 오류 발생:', error);
      throw error;
    }
  },
};

//전체 직원 가져오기
export const adminFetchMeber = async () => {
  const db = getDatabase();
  const memberRef = ref(db, `Users`);
  try {
    const snapshot = await get(memberRef);
    if (snapshot.exists()) {
      const data = snapshot.val(); // 데이터 가져오기

      const membersArray = Object.entries(data).map(([key, value]) => ({
        user_id: key, // 키를 id로 추가
        ...value, // 객체 데이터를 펼쳐서 추가
      }));
      return membersArray; // 데이터 반환
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

//직원 상세 보기
export const adminFetchMemberDetail = async user_id => {
  const db = getDatabase();
  const memberRef = ref(db, `Users/${user_id}`);
  try {
    const snapshot = await get(memberRef);

    if (snapshot.exists()) {
      const data = snapshot.val(); // 데이터 가져오기

      return data; // 데이터 반환
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

//직원 업로드

export const adminFetchMemberUpload = async () => {
  const db = getDatabase();
  const memberRef = ref(db, `Users`);
  const getValue = id => document.getElementById(id).value;
  const imageElement = document.querySelector('.real-profileImg');
  console.log(imageElement.getAttribute('data-image'));
  const adminMemberValue = {
    user_image: imageElement.getAttribute('data-image'),
    user_position: getValue('role'),
    user_name: getValue('name'),
    user_sex: getValue('gender'),
    user_birthday: getValue('birthDate'),
    user_phone: getValue('phone'),
    user_email: getValue('email'),
  };

  try {
    await set(memberRef, adminMemberValue);
    console.log('사용자 데이터가 성공적으로 수정되었습니다.');
  } catch (error) {
    console.log(error);
  }
};

//매일 출퇴근 상태 체크를 위해 가져옴
export const adminFetchTime = async () => {
  const db = getDatabase();
  const memberRef = ref(db, `Time-punch`);
  try {
    const snapshot = await get(memberRef);
    if (snapshot.exists()) {
      const data = snapshot.val(); // 데이터 가져오기
      const timeEntries = Object.entries(data).map(([key, value]) => ({
        time_id: key, // 키를 id로 추가
        ...value, // 객체 데이터를 펼쳐서 추가
      }));
      return timeEntries; // 데이터 반환
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

//직원 휴가 내역 가져오기

export const adminFetchVacation = async memberId => {
  const db = getDatabase();
  const vactionRef = ref(db, `absences/${memberId}`);
  try {
    const snapshot = await get(vactionRef);

    if (snapshot.exists()) {
      const vacactionData = snapshot.val(); // 데이터 가져오기
      console.log(vacactionData);
      const vacactionEntries = Object.entries(vacactionData).map(
        ([key, value]) => ({
          absences_id: key, // 키를 id로 추가
          ...value, // 객체 데이터를 펼쳐서 추가
        }),
      );
      return vacactionEntries;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

import { get, getDatabase, ref, set } from '@firebase/database';

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

  const adminMemberValue = {
    // user_image: document.getElementById('#fileInput').files,
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

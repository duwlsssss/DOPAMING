import { setItem } from '../../src/utils/storage'; // setItem 가져오기
import firebaseServices from '../../src/firebaseConfig'; // Auth 객체 가져오기
import { ADMIN_PATH, USER_PATH } from '../../src/utils/constants'; // 경로에 따라 수정
import { signInWithEmailAndPassword } from 'firebase/auth'; // 함수 가져오기
import { Modal } from '../../src/components/ui/modal/Modal';
import { getDatabase, ref, get, push, set } from 'firebase/database'; // set 추가

// 1. 로그인
export const userLogin = async (email, password) => {
  try {
    // Firebase 로그인 시도
    const userCredential = await signInWithEmailAndPassword(
      firebaseServices.auth,
      email,
      password,
    );
    const user = userCredential.user; // 사용자 정보 가져오기

    // 이메일에 따라 리다이렉트 경로, 역할 설정
    const redirectPath =
      email === 'admin@naver.com' ? ADMIN_PATH.HOME : USER_PATH.HOME;
    setItem('userRole', email === 'admin@naver.com' ? 'admin' : 'user'); // 역할 저장
    setItem('userID', user.uid); // Firebase 사용자 ID 저장

    // 사용자 데이터 가져오기
    //const userData = await fetchUserData(user.uid);
    // if (userData) {
    //   // modalInstance에 사용자 정보 추가
    //   //modalInstance.userId = user.uid; // 현재 로그인한 사용자 ID
    //   //modalInstance.userName = userData.name || email; // 사용자 이름 (이름이 없을 경우 이메일 사용)
    // }

    // 해당 경로로 리다이렉트
    window.location.replace(redirectPath);
  } catch (error) {
    console.error('로그인 실패:', error.message); // 콘솔에 오류 메시지 출력
    Modal('login-fail');
  }
};

// 2. 사용자 데이터 가져오기
export const fetchUserData = async userId => {
  const db = getDatabase(); // 데이터베이스 인스턴스 가져오기
  const userRef = ref(db, `Users/${userId}`); // 사용자 경로 참조
  try {
    const snapshot = await get(userRef); // 데이터 가져오기
    if (snapshot.exists()) {
      const userData = snapshot.val(); // 데이터 값 가져오기
      return userData; // 사용자 데이터 반환
    } else {
      console.log('사용자 데이터가 존재하지 않습니다.');
      return null; // 데이터가 없을 경우 null 반환
    }
  } catch (error) {
    console.error('사용자 데이터 가져오기 실패:', error.message); // 오류 메시지 출력
    return null; // 오류 발생 시 null 반환
  }
};

// 3. 출/퇴근 데이터 가져오기
export const fetchTimePunchData = async userId => {
  const db = getDatabase(); // 데이터베이스 인스턴스 가져오기
  const timePunchRef = ref(db, 'Time-punch'); // Time-punch 경로 참조

  try {
    const snapshot = await get(timePunchRef); // 데이터 가져오기
    if (snapshot.exists()) {
      const timePunchData = snapshot.val(); // 데이터 값 가져오기
      // 사용자의 출근/퇴근 데이터 필터링
      const userTimePunch = Object.values(timePunchData).filter(
        punch => punch.user_id === userId,
      );

      return userTimePunch.length > 0 ? userTimePunch : []; // 사용자 데이터 반환
    } else {
      console.log('Time-punch 데이터가 존재하지 않습니다.');
      return []; // 데이터가 없을 경우 빈 배열 반환
    }
  } catch (error) {
    console.error('출근/퇴근 데이터 가져오기 실패:', error.message); // 오류 메시지 출력
    return []; // 오류 발생 시 빈 배열 반환
  }
};

// 4. 출 퇴근 외출 복귀 데이터 저장하기
export const saveTimePunchData = async (userId, actionType, userName) => {
  const db = getDatabase(); // 데이터베이스 인스턴스 가져오기
  const timePunchRef = ref(db, 'Time-punch'); // Time-punch 경로 참조

  // 현재 시간과 날짜를 가져옵니다.
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  const timestamp = now.toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:mm:ss 형식
  const punchId = `${userId}_${date.replace(/-/g, '')}`; // punch_id 생성

  // 기본 데이터 구조
  const data = {
    user_id: userId,
    user_name: userName,
    punch_date: date,
    punch_id: punchId,
    punch_in: actionType === 'punch-in' ? timestamp : null,
    punch_out: actionType === 'punch-out' ? timestamp : null,
    break_in: actionType === 'break-in' ? timestamp : null,
    break_out: actionType === 'break-out' ? timestamp : null,
  };

  try {
    const newTimePunchRef = push(timePunchRef); // 고유 키 생성
    await set(newTimePunchRef, data); // 데이터 저장
    console.log(`${actionType} 데이터가 성공적으로 저장되었습니다.`, data);
  } catch (error) {
    console.error(`${actionType} 데이터 저장 실패:`, error.message);
    console.error('오류 발생 시 데이터:', data); // 오류 발생 시 데이터 로그 추가
  }
};

// currentTime.js

export const formatDate = date => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

export const formatTimeWithSeconds = date => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}시 ${minutes}분 ${seconds}초`;
};

export const formatTimeWithoutSeconds = date => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}시 ${minutes}분`;
};

export const formatUserTime = time => {
  return time ? formatTimeWithoutSeconds(new Date(time)) : '--시 --분';
};

export const calculateDday = endDate => {
  const today = new Date();
  const end = new Date(endDate);
  const diffInTime = end - today; // 밀리초 단위 차이
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
  return diffInDays >= 0 ? `D-${diffInDays}` : `D+${Math.abs(diffInDays)}`;
};

// 부캠 진행도 계산 함수
export const calculateDegree = (endDate, startDate = new Date()) => {
  const now = new Date();
  const end = new Date(endDate);
  const start = new Date(startDate);

  // 전체 기간 (일수)
  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.max(
    0,
    Math.floor((now - start) / (1000 * 60 * 60 * 24)),
  );

  // 진행도 비율 (퍼센트)
  const progressPercent = Math.min(
    100,
    Math.floor((elapsedDays / totalDays) * 100),
  );

  // deg 계산 (진행도를 conic-gradient 각도로 변환)
  const deg = (progressPercent / 100) * 360;

  return { deg, progressPercent };
};

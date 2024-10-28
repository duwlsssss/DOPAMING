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

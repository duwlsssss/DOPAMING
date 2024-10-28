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

export const updateCurrentTime = () => {
  const now = new Date();
  const formattedDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
  const currentTime = `${formattedDate} ${formatTimeWithSeconds(now)}`;
  const punchTimeElement = document.querySelector('.punch-time');
  if (punchTimeElement) {
    punchTimeElement.innerText = currentTime; // 현재 시각 업데이트
  }
};

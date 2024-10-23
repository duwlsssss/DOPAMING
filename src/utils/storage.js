export const setItem = (key, value) => {
  // string이면 그냥 저장, 문자열 아니라 객체면 JSON.stringify로 JSON 형식의 문자열로 바꿔 저장
  const storeValue = typeof value === 'string' ? value : JSON.stringify(value);
  localStorage.setItem(key, storeValue);
};

export const getItem = key => {
  const value = localStorage.getItem(key);
  return value && (value.startsWith('{') || value.startsWith('['))
    ? JSON.parse(value) // JSON문자열이면 파싱해서 반환
    : value; //string이면 그냥 반환
};

export const removeItem = key => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};

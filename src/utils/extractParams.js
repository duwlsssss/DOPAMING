const extractParams = (path, currentPath) => {
  // e.g. path가 notice/:postId
  const keys = [];
  const regexPath = path.replace(/:(\w+)/g, (_, key) => {
    // key는 동적 매개변수 이름 (: 다음에 오는 거)
    keys.push(key); // e.g. keys 배열에 postId를 넣음
    return '([^/]+)'; // 슬래시 제외한 모든 문자 매칭
  }); // e.g. /notice/([\\w-]+)

  // 만든 정규 표현식으로 currentPath 나누기
  const match = currentPath.match(new RegExp(`^${regexPath}$`)); // e.g.['/notice/post1', 'post1']

  if (!match) return null;

  // keys 배열의 동적 매개변수 이름, match 배열에서 추출한 값을 매핑해 객체 만듦
  return keys.reduce((params, key, index) => {
    // e.g. { postId: 'post1' }
    params[key] = match[index + 1]; //match[0]엔 전체 경로, 그 이후 캡쳐된 동적 매개변수들이 들어있음
    return params;
  }, {});
};

export default extractParams;

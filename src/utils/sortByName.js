export const sortByName = users => {
  return users.sort((a, b) => {
    // 휴가 승인 상태로 정렬 (대기 > 승인 > 거부)
    if (a.abs_status && b.abs_status) {
      if (a.abs_status === '대기' && b.abs_status !== '대기') return -1;
      if (a.abs_status !== '대기' && b.abs_status === '대기') return 1;
      if (a.abs_status === '승인' && b.abs_status === '거부') return -1;
      if (a.abs_status === '거부' && b.abs_status === '승인') return 1;
    }

    // 매니저가 먼저 나오도록 정렬
    if (a.user_position === '매니저' && b.user_position === '수강생') return -1;
    if (a.user_position === '수강생' && b.user_position === '매니저') return 1;

    // 이름 순으로 정렬
    if (a.user_position === b.user_position) {
      if (a.user_name < b.user_name) return -1;
      if (a.user_name > b.user_name) return 1;
      return 0;
    }
  });
};

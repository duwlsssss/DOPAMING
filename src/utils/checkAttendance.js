export function checkAttendance(fetchTime, user) {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  return fetchTime.some(value =>
    value[formattedDate]?.user_id.includes(user.user_id),
  );
}

export function renderAttendanceButtons(buttonState) {
  const punchInBtn = document.querySelector('.punch-in-button');
  const punchOutBtn = document.querySelector('.punch-out-button');
  const breakOutBtn = document.querySelector('.break-out-button');
  const breakInBtn = document.querySelector('.break-in-button');

  console.log('buttonState', buttonState);
  console.log(breakInBtn);

  if (punchInBtn) punchInBtn.disabled = !buttonState.punchIn.active;
  if (punchOutBtn) punchOutBtn.disabled = !buttonState.punchOut.active;
  if (breakOutBtn) breakOutBtn.disabled = !buttonState.breakOut.active;
  if (breakInBtn) breakInBtn.disabled = !buttonState.breakIn.active;
}

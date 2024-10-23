import './Button.css';

export default function Button({
  text,
  color,
  shape,
  width = 65,
  height = 42,
  borderRadius = 10,
  onClick,
}) {
  const button = document.createElement('button'); // 버튼의 기본 스타일 및 속성 설정
  button.textContent = text;
  button.style.width = `${width}px`;
  button.style.height = `${height}px`;
  button.style.borderRadius = `${borderRadius}px`; // 동적으로 color와 shape 속성 추가
  button.setAttribute('color', color); // 예: 'white'
  button.setAttribute('shape', shape); // 예: 'line'

  if (onClick) {
    button.addEventListener('click', onClick);
  } // 버튼을 DOM에 추가
  return button;
}

import './Button.css';

export function Button({
  text = '',
  color,
  shape,
  width,
  height,
  padding = 'var(--space-small) var(--space-medium)',
  borderRadius = 10,
  fontSize = 'var(--font-medium)',
  transition = 'all 0.3s',
  onClick,
}) {
  const button = document.createElement('button'); // 버튼의 기본 스타일 및 속성 설정
  button.textContent = text;

  if (width) button.style.width = `${width}px`;
  if (height) button.style.height = `${height}px`;

  button.style.padding = padding;
  button.style.borderRadius = `${borderRadius}px`;
  button.style.fontSize = fontSize;
  button.style.transition = transition;
  button.setAttribute('color', color); // 예: 'white'
  button.setAttribute('shape', shape); // 예: 'line'

  if (onClick) {
    button.addEventListener('click', onClick);
  } // 버튼을 DOM에 추가
  return button;
}

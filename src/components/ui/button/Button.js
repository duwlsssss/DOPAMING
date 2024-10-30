import './Button.css';

export function Button({
  className = '',
  text = '',
  type = '',
  color,
  shape,
  padding = 'var(--space-small) var(--space-medium)',
  borderRadius = 10,
  fontSize = 'var(--font-medium)',
  fontWeight = 500,
  disabled = false,
  transition = 'all 0.3s',
  cursor = 'pointer',
  onClick,
}) {
  const button = document.createElement('button'); // 버튼의 기본 스타일 및 속성 설정
  button.className = className;
  button.type = type;
  button.textContent = text;
  button.style.borderRadius = `${borderRadius}px`;
  button.style.fontSize = fontSize;
  button.style.padding = padding;
  button.style.borderRadius = `${borderRadius}px`;
  button.style.fontSize = fontSize;
  button.style.fontWeight = fontWeight;
  button.disabled = disabled;
  button.style.transition = transition;
  button.style.cursor = cursor;
  button.setAttribute('color', color); // 예: 'white'
  button.setAttribute('shape', shape); // 예: 'line'
  // 초기 스타일만 컴포넌트에서 하기
  if (disabled) {
    button.style.backgroundColor = 'var(--color-regular-gray)';
    button.style.color = 'var(--color-black)';
    button.style.cursor = 'not-allowed';
  }
  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}

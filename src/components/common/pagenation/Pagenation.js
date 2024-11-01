import { Button } from '../../ui/button/Button';
import './Pagenation.css';

export const Pagenation = (
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination-container');

  for (let i = 1; i <= totalPages; i++) {
    const paginationButton = Button({
      width: 50,
      text: `${i}`,
      color: 'transparent',
      id: `page-${i}`,
      shape: 'white',
    });

    // 현재 페이지인 경우 버튼을 활성화
    if (i === currentPage) {
      paginationButton.classList.add('active');
    }

    paginationButton.setAttribute('data-page', i);
    paginationButton.classList.add('pagination-btn');

    // 버튼 클릭 시 페이지 변경 함수 호출
    paginationButton.addEventListener('click', () => {
      onPageChange(i); // 페이지 변경 시 콜백 함수 호출

      // 모든 버튼의 active 클래스 제거 후, 선택한 버튼에만 추가
      const allButtons =
        paginationContainer.querySelectorAll('.pagination-btn');
      allButtons.forEach(button => button.classList.remove('active'));
      paginationButton.classList.add('active');
    });

    paginationContainer.appendChild(paginationButton);
  }

  return paginationContainer; // HTML 요소를 반환
};

import './Accordion.css';

export const Accordion = ({ items, renderHeader, renderContent }) => {
  const handleClick = e => {
    e.stopPropagation();

    const button = e.currentTarget;
    const accordionItem = button.closest('.accordion-item');
    const detail = accordionItem.querySelector('.accordion-detail');
    const isOpen = accordionItem.classList.contains('open');

    const allItems =
      accordionItem.parentElement.querySelectorAll('.accordion-item');
    // 한 번에 하나의 아이템만 열리도록 처리
    allItems.forEach(item => {
      item.classList.remove('open');
      const itemDetail = item.querySelector('.accordion-detail');
      itemDetail.style.display = 'none';
    });

    if (!isOpen) {
      accordionItem.classList.add('open');
      detail.style.display = 'block';
    }
  };

  return `
      <ul class="accordion-list">
        ${items
          .map(
            item => `
          <li class="accordion-item">
            <div class="accordion-header">
              ${renderHeader(item)}
              <button class="accordion-button" onclick="(${handleClick.toString()})(event)">
                <span class="material-symbols-rounded">keyboard_arrow_down</span>
              </button>
            </div>
            <div class="accordion-detail">
              ${renderContent(item)}
            </div>
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
};

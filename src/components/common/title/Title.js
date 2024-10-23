import './Title.css';

export const RenderTitle = (container, titleText) => {
  container.innerHTML = `
    <h1 class="header-title">${titleText}</h1>
  `;
};

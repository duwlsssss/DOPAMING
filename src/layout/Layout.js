import './Layout.css';
const RenderLayout = container => {
  container.innerHTML = `
    <header class="header"></header>
    <main class="content-container">
      <nav class="navbar"></nav>
      <section class="content"></section>
    </main>
  `;
};

export default RenderLayout;

export default class HomePage {
  constructor() {
    const CONTENT = document.getElementById('content');
    this.content = CONTENT;
    this.render();
  }

  render() {
    this.content.innerHTML = /* HTML */ `
  

        <div class="my-info desktop-only">
          <div class="wrapper">
            <h2 class="home-subtitle">내 정보</h2>
          </div>
          <div class="personal-info-container"></div>
        </div>

        <section class="gallery-section">
          <div class="wrapper">
            <h2 class="home-subtitle">공지사항 갤러리</h2>
            <ul class="gallery"></ul>
          </div>
        </section>

        <section class="announcement-container">
          <div class="wrapper">
            <h2 class="home-subtitle">주요 소식</h2>
            <ul class="announcement-contents"></ul>
          </div>
        </section>
      </div>
    `;
  }
}

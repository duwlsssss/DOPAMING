import Container from '../../../Container';

export default class AdminNoticePage extends Container {
  constructor() {
    super('.content');
    this.render();
  }

  render() {
    this.$container.innerHTML = `
          <div>이 곳은 관리자 공지사항 페이지입니다.</div>
    `;
  }
}

import Container from '../../../Container';

export default class UserWorkDetailPage extends Container {
  constructor() {
    super('.content');
    this.render();
  }

  render() {
    this.$container.innerHTML = `
              <div>이 곳은 사용자 출/퇴근 상세 페이지입니다.</div>
        `;
  }
}

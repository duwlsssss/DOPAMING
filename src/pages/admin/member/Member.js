import Container from '../../../Container';

export default class AdminMemberPage extends Container {
  constructor() {
    super('.content');
    this.render();
  }

  render() {
    this.$container.innerHTML = `
        <div>이 곳은 관리자 직원 관리 페이지입니다.</div>
    `;
  }
}

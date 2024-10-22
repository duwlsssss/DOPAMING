import Container from '../../../Container';

export default class UserVacationManagementPage extends Container {
  constructor() {
    super('.content');
    this.render();
  }

  render() {
    this.$container.innerHTML = `
            <div>이 곳은 사용자 휴가/공가 관리 페이지입니다.</div>
      `;
  }
}

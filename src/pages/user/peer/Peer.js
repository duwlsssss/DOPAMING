import Container from '../../../Container';

export default class UserPeerPage extends Container {
  constructor() {
    super('.content');
    this.render();
  }

  render() {
    this.$container.innerHTML = `
            <div>이 곳은 사용자 수강생 목록 페이지입니다.</div>
      `;
  }
}

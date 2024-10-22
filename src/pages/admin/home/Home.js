import Container from '../../../Container';

export default class AdminHomePage extends Container {
  constructor() {
    super('.content');
    this.render();
  }

  render() {
    this.$container.innerHTML = `
        <div>이 곳은 관지자 홈페이지입니다.</div>
      `;
  }
}

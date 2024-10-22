import Container from '../../../Container';

export default class UserCoursePage extends Container {
  constructor() {
    super('.content');
    this.render();
  }

  render() {
    this.$container.innerHTML = `
            <div>이 곳은 사용자 커리큘럼 페이지입니다.</div>
      `;
  }
}

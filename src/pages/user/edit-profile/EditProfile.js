import Container from '../../../Container';

export default class UserEditProfilePage extends Container {
  constructor() {
    super('.content');
    this.render();
  }

  render() {
    this.$container.innerHTML = `
              <div>이 곳은 사용자 정보 수정 페이지입니다.</div>
        `;
  }
}

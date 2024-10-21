export default class MembersPage {
  constructor() {
    const CONTENT = document.getElementById('content');
    this.content = CONTENT;
    console.log(this.content);
    this.render();
  }

  render() {
    this.content.innerHTML = `
     
          <div id='members-container'>
            45          
          </div>
        </div>
          <div class='pagination-container'>
          123
          </div>
      </div>
    `;
  }
}

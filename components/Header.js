import Component from './Component.js';

const signin = new CustomEvent('signin', {
  detail: true,
});
const main = new CustomEvent('main', {
  detail: true,
});
const rank = new CustomEvent('rank', {
  detail: true,
});

class Header extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.header-signin',
        handler: () => {
          window.dispatchEvent(signin);
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.header-logo',
        handler: () => {
          window.dispatchEvent(main);
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.header-rank',
        handler: () => {
          window.dispatchEvent(rank);
        },
      }),
    ];
  }

  domStr() {
    return `
    <div class="header">
      <h1 class="header-logo">HOLY MOLY</h1>
      <ul class="header-list">
        <li class="header-rank">RANK</li>
        <li class="header-signin">SIGNIN/SIGNUP</li>
      </ul>
    </div>
    `;
  }
}

export default Header;

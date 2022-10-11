import Component from './Component.js';

class Header extends Component {
  // addEvent() {
  //   return;
  // }

  domStr() {
    return `
    <div class="header">
      <h1 class="header-logo">HOLY MOLY</h1>
      <ul class="header-list">
        <li class="header-rank"><a href="/">RANK</a></li>
        <li class="header-signin"><a href="/">SIGNIN/SIGNUP</a></li>
      </ul>
    </div>
    `;
  }
}

export default Header;

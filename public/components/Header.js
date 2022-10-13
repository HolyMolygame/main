import Component from './Component.js';

class Header extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.header-logo',
        handler: e => {
          e.preventDefault();
          if (!e.target.closest('.header-logo a')) return;
          const path = e.target.closest('.header-logo a').getAttribute('href');
          this.props.navigate(path);
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.header-rank',
        handler: e => {
          e.preventDefault();
          if (!e.target.closest('.header-rank a')) return;
          const path = e.target.closest('.header-rank a').getAttribute('href');
          this.props.navigate(path);
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.header-signin',
        handler: e => {
          e.preventDefault();
          if (!e.target.closest('.header-signin a')) return;
          const path = e.target.closest('.header-signin a').getAttribute('href');
          this.props.navigate(path);
        },
      }),
    ];
  }

  domStr() {
    return `
    <div class="header">
      <h1 class="header-logo"><a href="/">HOLY MOLY</a></h1>
      <ul class="header-list">
        <li class="header-rank"><a href="/rank">RANK</a></li>
        <li class="header-signin"><a href="/signin">SIGNIN/SIGNUP</a></li>
      </ul>
    </div>
    `;
  }
}

export default Header;

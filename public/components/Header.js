import Component from './Component.js';

class Header extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.header-logo',
        handler: e => {
          e.preventDefault();

          const path = e.target.getAttribute('href');

          if (window.location.pathname === path) return;

          window.history.pushState(null, null, path);

          window.dispatchEvent(
            new CustomEvent('home', {
              detail: path,
            })
          );
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.header-rank',
        handler: e => {
          e.preventDefault();

          const path = e.target.getAttribute('href');

          if (window.location.pathname === path) return;

          window.history.pushState(null, null, path);

          window.dispatchEvent(
            new CustomEvent('rank', {
              detail: path,
            })
          );
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.header-signin',
        handler: e => {
          e.preventDefault();

          const path = e.target.getAttribute('href');

          if (window.location.pathname === path) return;

          window.history.pushState(null, null, path);

          window.dispatchEvent(
            new CustomEvent('signin', {
              detail: path,
            })
          );
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

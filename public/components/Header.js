import Component from './Component.js';

class Header extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.header-logo',
        handler: e => {
          e.preventDefault();

          const path = e.target.closest('.header-logo a').getAttribute('href');
          window.history.pushState(null, null, path);
          this.props.router(path);
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.header-rank',
        handler: e => {
          e.preventDefault();

          const path = e.target.closest('.header-rank a').getAttribute('href');
          this.props.router(path);
          window.history.pushState(null, null, '/signin');
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.header-signin',
        handler: e => {
          e.preventDefault();
          const path = e.target.closest('.header-signin a').getAttribute('href');
          window.history.pushState(null, null, path);
          this.props.router(path);
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
        ${
          this.props.user
            ? `<li><span style="color: orange; font-size: 30px;">${this.props.user}</span> WELCOME!</li>`
            : `<li class="header-signin"><a href="/signin">SIGNIN/SIGNUP</a></li>`
        }
      </ul>
    </div>
    `;
  }
}

export default Header;

// ${this.props.user ? `<li class="header-rank"><a href="/rank">RANK</a></li>` : `<li>RANK</li>`}

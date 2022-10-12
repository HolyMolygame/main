import Component from './Component.js';

class GameCard extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.game-card-play',
        handler: e => {
          e.preventDefault();

          const path = e.target.getAttribute('href');

          if (window.location.pathname === path) return;

          window.history.pushState(null, null, path);

          window.dispatchEvent(
            new CustomEvent('gameplay', {
              detail: path,
            })
          );
        },
      }),
    ];
  }

  domStr() {
    return `
    <div class="game-card">
      <h2 class="game-card-heading">MATCHING CARDS</h2>
      <p>remember cards and match them</p>
      <button class="game-card-play"><a href="/matching">play</a></button>
    </div>
    `;
  }
}

export default GameCard;

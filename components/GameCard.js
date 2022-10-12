import Component from './Component.js';

const custom = new CustomEvent('gameplay', {
  detail: true,
});

class GameCard extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.game-card-play',
        handler: () => {
          window.dispatchEvent(custom);
        },
      }),
    ];
  }

  domStr() {
    return `
    <div class="game-card">
      <h2 class="game-card-heading">MATCHING CARDS</h2>
      <p>remember cards and match them</p>
      <button class="game-card-play">play</button>
    </div>
    `;
  }
}

export default GameCard;

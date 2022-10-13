import Component from './Component.js';

class GameCard extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.game-card-play',
        handler: e => {
          e.preventDefault();
          if (!e.target.closest('.game-card-play a')) return;
          const path = e.target.getAttribute('href');
          this.props.navigate(path);
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

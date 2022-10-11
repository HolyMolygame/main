import Component from './Component.js';

class GameCard extends Component {
  // addEvent() {
  //   return;
  // }

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

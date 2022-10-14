import Component from './Component.js';

let openCard = [];
let matchedCard = [];
class MatchingCards extends Component {
  addEvent() {
    return [
      {
        type: 'click',
        selector: '.card-front',
        handler: e => {
          if (openCard.length === 2) return;

          this.props.checkCard(+e.target.closest('.cards').dataset.id);
          if (openCard.length === 2) {
            if (this.props.shuffledNum[openCard[0] - 1] === this.props.shuffledNum[openCard[1] - 1]) {
              console.log('HOLYMOLY');
              this.props.matchCard(openCard);
              matchedCard = [...matchedCard, ...openCard];
            }
            setTimeout(() => {
              this.props.resetOpenedCard();
            }, 500);
          }
        },
      },
      this.createEvent({
        type: 'click',
        selector: '.reset-button',
        handler: () => {
          openCard = [];
          matchedCard = [];
          this.props.resetGame();
        },
      }),
    ];
  }

  domStr() {
    openCard = this.props.openCard;

    return `
    <div class="container">
      <h1 class="game-title">MATCHING CARDS</h1>
      <div class="card-container">
        ${this.props.shuffledNum
          .map(
            (num, index) => `
          <div class="cards ${
            openCard.includes(index + 1) || matchedCard.includes(index + 1) ? 'opened' : ''
          }" data-id="${index + 1}">
            <div class="card-inner">
              <div class="card-front">?</div>
              <div class="card-back">${num}</div>
            </div>
          </div>
          `
          )
          .join('')}
      </div>
      <button class="reset-button">RESET</button>
    </div>
    `;
  }
}

export default MatchingCards;

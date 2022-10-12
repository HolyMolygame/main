import Component from './Component.js';

class MatchingCards extends Component {
  constructor() {
    super();
    this.state = {
      numArr: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
      openCard: [],
      completedCard: [],
    };
  }

  addEvent() {
    return [
      {
        type: 'click',
        selector: '.card-container',
        handler: e => {
          if (
            !e.target.closest('.cards') ||
            e.target.closest('.cards').classList.contains('opened') ||
            this.state.openCard.length === 2
          )
            return;
          e.target.closest('.cards').classList.toggle('opened');

          this.state.openCard.push(e.target.nextElementSibling);

          if (this.state.openCard.length === 2) {
            if (this.state.openCard[0].textContent === this.state.openCard[1].textContent) {
              console.log('HOLYMOLY');
              this.state.completedCard.push(this.state.openCard[0]);
              this.state.completedCard.push(this.state.openCard[1]);
              this.state.openCard = [];
            } else {
              console.log('TRY AGAIN');
              setTimeout(() => {
                this.state.openCard[0].closest('.cards').classList.remove('opened');
                this.state.openCard[1].closest('.cards').classList.remove('opened');
                this.state.openCard = [];
              }, 500);
            }
          }
        },
      },
      {
        type: 'click',
        selector: '.reset-button',
        handler: () => {
          this.setState({ openCard: [], completedCard: [] });
        },
      },
    ];
  }

  shuffle(array) {
    const copyArray = [...array];
    for (let index = copyArray.length - 1; index > 0; index--) {
      const randomPosition = Math.floor(Math.random() * (index + 1));

      [copyArray[index], copyArray[randomPosition]] = [copyArray[randomPosition], copyArray[index]];
    }
    return copyArray;
  }

  domStr() {
    const shuffledNum = this.shuffle(this.state.numArr);
    return `
    <div class="container">
      <h1 class="game-title">MATCHING CARDS</h1>
      <div class="card-container">
        ${shuffledNum
          .map(
            (numArr, index) => `
          <div class="cards" data-id="${index + 1}">
            <div class="card-inner">
              <div class="card-front">?</div>
              <div class="card-back">${numArr}</div>
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

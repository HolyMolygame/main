import Component from './Component.js';

let shuffledNum = [];
let openCard = [];
let matchedCard = [];
let isStarted = false;
let convertedTime = '00:00:00';
let isFinished = false;
class MatchingCards extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.start-button',
        handler: () => {
          document.body.classList.remove('preload');
          this.props.start();
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.card-front',
        handler: e => {
          if (openCard.length === 2 || !isStarted) return;

          this.props.checkCard(+e.target.closest('.cards').dataset.id);

          if (openCard.length === 2) {
            if (shuffledNum[openCard[0] - 1] === shuffledNum[openCard[1] - 1]) {
              console.log('HOLYMOLY');
              this.props.addMatchedCard(openCard);
              matchedCard = [...matchedCard, ...openCard];
            }
            setTimeout(() => {
              this.props.resetOpenedCard();
            }, 500);
          }

          if (isFinished)
            (async () => {
              const payload = { nickname: this.props.user, record: convertedTime };

              try {
                const { data: record } = await axios.post('/matching', payload);
                localStorage.setItem('record', JSON.stringify(record));
              } catch (e) {
                console.err(e);
                console.log("😱 your record didn't register on rank please signin.");
              }
            })();
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.reset-button',
        handler: () => {
          document.body.classList.add('preload');
          this.props.resetGame();
        },
      }),
    ];
  }

  domStr() {
    shuffledNum = this.props.shuffledNum;
    openCard = this.props.openCard;
    isStarted = this.props.isStarted;
    convertedTime = this.props.convertedTime;
    isFinished = this.props.matchedCard.length === 18;

    return `
    <div class="container">
      <h1 class="game-title">MATCHING CARDS</h1>
      <div class="card-container">
        ${this.props.shuffledNum
          .map(
            (num, index) => `
          <div class="cards ${
            this.props.openCard.includes(index + 1) || this.props.matchedCard.includes(index + 1) ? 'opened' : ''
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
      <p class="result-message ${this.props.matchedCard.length === 18 ? '' : 'hidden'}">Congratulations!</p>
      <p class="display">${convertedTime}</p>
      <div class="active-button-container">
        <button class="start-button" ${this.props.isStarted ? 'disabled' : ''}>Start</button>
        <button class="reset-button">RESET</button>
      </div>
    </div>
    `;
  }
}

export default MatchingCards;

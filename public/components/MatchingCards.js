import Component from './Component.js';

class MatchingCards extends Component {
  addEvent() {
    return [
      {
        type: 'click',
        selector: '.card-front',
        handler: e => {
          if (this.props.openCard.length === 2) return;
          // e.target.closest('.cards').classList.toggle('opened');

          this.props.checkCard(+e.target.closest('.cards').dataset.id);
          console.log('clicked: ', this.props.openCard);
          if (this.props.openCard.length === 2) {
            if (this.props.openCard[0] === this.props.openCard[1]) {
              console.log('HOLYMOLY');
              // this.state.completedCard.push(this.state.openCard[0]);
              // this.state.completedCard.push(this.state.openCard[1]);
              this.setState({ openCard: [] });
            } else {
              // setTimeout(() => {
              //   this.state.openCard[0].closest('.cards').classList.remove('opened');
              //   this.state.openCard[1].closest('.cards').classList.remove('opened');
              //   this.state.openCard = [];
              // }, 500);
            }
          }
        },
      },
      this.createEvent({
        type: 'transitionend',
        selector: '',
        handler: () => {
          console.log(this.props.openCard);
          if (this.props.openCard.length === 2) {
            console.log('TRY AGAIN');
            this.setState({ openCard: [] });
          }
        },
      }),
      this.createEvent({
        type: 'click',
        selector: '.reset-button',
        handler: () => {
          this.setState({ openCard: [], completedCard: [] });
        },
      }),
      this.createEvent({
        type: 'DOMContentLoaded',
        selector: '',
        handler: () => {},
      }),
    ];
  }

  domStr() {
    return `
    <div class="container">
      <h1 class="game-title">MATCHING CARDS</h1>
      <div class="card-container">
        ${this.props.shuffledNum
          .map(
            (num, index) => `
          <div class="cards ${
            this.props.openCard[0] === index + 1 || this.props.openCard[1] === index + 1 ? 'opened' : ''
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

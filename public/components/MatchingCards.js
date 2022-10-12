import Component from './Component.js';

class MatchingCards extends Component {
  // addEvent() {
  //   return;
  // }

  domStr() {
    return `
      <div class="matching-cards-container">
        <h1 class="game-title">MATCHING CARDS</h1>
        <div class="card-container">
          <div class="cards" data-id="1">?</div>
          <div class="cards" data-id="2">?</div>
          <div class="cards" data-id="3">?</div>
          <div class="cards" data-id="4">?</div>
          <div class="cards" data-id="5">?</div>
          <div class="cards" data-id="6">?</div>
          <div class="cards" data-id="7">?</div>
          <div class="cards" data-id="8">?</div>
          <div class="cards" data-id="9">?</div>
          <div class="cards" data-id="10">?</div>
          <div class="cards" data-id="11">?</div>
          <div class="cards" data-id="12">?</div>
          <div class="cards" data-id="13">?</div>
          <div class="cards" data-id="14">?</div>
          <div class="cards" data-id="15">?</div>
          <div class="cards" data-id="16">?</div>
          <div class="cards" data-id="17">?</div>
          <div class="cards" data-id="18">?</div>   
        </div>
        <button class="reset-button">RESET</button>
      </div>
    `;
  }
}

export default MatchingCards;

import Component from './Component.js';

class Footer extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.footer-top-button',
        handler: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      }),
    ];
  }

  domStr() {
    return `
    <div class="footer-outer">
      <div class="footer-inner">
        <span>HOLY MOLY</span>
        <div class="footer-description">
          <p>서울 강남구 강남대로 364</p>
          <p>Ⓒ Copyright 2022 HOLYMOLY Connecto Frontend School </p>
        </div>
        <button class="footer-top-button"><img src="./src/img/rocket.png" alt="위로" /></button>
      </div>
    </div>
    `;
  }
}

export default Footer;

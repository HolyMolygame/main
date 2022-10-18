import render from '../render/index.js';

let events = [];

class Component {
  constructor(props) {
    this.state = {};
    this.props = props;
    this.checkEvent();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    render();
  }

  createEvent({ type = 'click', selector = '', handler = () => {} }) {
    return { type, selector, handler };
  }

  checkEvent() {
    if (this.addEvent) {
      this.addEvent().forEach(({ type, selector, handler }) => {
        if (events.find(event => event.type === type && event.selector === selector)) return;

        if (selector === '') window.addEventListener(type, handler);
        else window.addEventListener(type, e => e.target.closest(selector) && handler(e));

        events = [...events, { type, selector, handler }];
      });
    }
  }

  domStr() {
    return ``;
  }
}

export default Component;

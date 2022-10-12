import Component from './components/Component.js';
import { Header, Home, Footer, MatchingCards, Signin, Rank, Signup } from './components/index.js';

let gameplay = false;
let signin = false;
let signup = false;
let rank = false;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addEvent() {
    return [
      this.createEvent({
        type: 'gameplay',
        selector: '',
        handler: e => {
          if (e.detail) {
            gameplay = true;
          }
        },
      }),
      this.createEvent({
        type: 'signin',
        selector: '',
        handler: e => {
          if (e.detail) {
            signin = true;
          }
        },
      }),
      this.createEvent({
        type: 'rank',
        selector: '',
        handler: e => {
          if (e.detail) {
            rank = true;
          }
        },
      }),
      this.createEvent({
        type: 'signup',
        selector: '',
        handler: e => {
          if (e.detail) {
            signup = true;
          }
        },
      }),
    ];
  }

  domStr() {
    if (gameplay) {
      gameplay = false;
      return `
      ${new Header().domStr()}
      ${new MatchingCards().domStr()}
      ${new Footer().domStr()}
      `;
    }
    if (signin) {
      signin = false;
      return `
      ${new Header().domStr()}
      ${new Signin().domStr()}
      ${new Footer().domStr()}
      `;
    }
    if (signup) {
      signup = false;
      return `
      ${new Header().domStr()}
      ${new Signup().domStr()}
      ${new Footer().domStr()}
      `;
    }
    if (rank) {
      rank = false;
      return `
      ${new Header().domStr()}
      ${new Rank().domStr()}
      ${new Footer().domStr()}
      `;
    }
    return `
      ${new Header().domStr()}
     ${new Home().domStr()}
      ${new Footer().domStr()}
    `;
  }

  // setState 사용해서 변경할 할수
  // getNextId() {
  //   return Math.max(0, ...this.state.todos.flatMap(todo => todo.id)) + 1;
  // }
}

export default App;

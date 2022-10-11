import Component from './components/Component.js';
import { Header,Contributor, GameCard } from './components/index.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  domStr() {
    return `
      ${new Header().domStr()}
      ${new GameCard().domStr()}
      ${new Contributor().domStr()}
    `;
  }

  // setState 사용해서 변경할 할수
  // getNextId() {
  //   return Math.max(0, ...this.state.todos.flatMap(todo => todo.id)) + 1;
  // }
}

export default App;

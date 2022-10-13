import Component from './components/Component.js';
import Home from './components/Home.js';
import { Header, Footer, MatchingCards, Signin, Rank, Signup } from './components/index.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname,
      shuffledNum: this.shuffle(),
      openCard: [],
      completedCard: [],
      routes: [
        { path: '/', component: Home },
        { path: '/rank', component: Rank },
        { path: '/signin', component: Signin },
        { path: '/signup', component: Signup },
        { path: '/matching', component: MatchingCards },
      ],
    };
  }

  addEvent() {
    return [
      {
        type: 'popstate',
        selector: '',
        handler: () => {
          this.setState({ path: window.location.pathname });
        },
      },
    ];
  }

  navigate(path) {
    if (window.location.pathname === path) return;
    window.history.pushState(null, null, path);
    this.setState({ path });
  }

  shuffle() {
    const copyArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
    for (let index = copyArray.length - 1; index > 0; index--) {
      const randomPosition = Math.floor(Math.random() * (index + 1));

      [copyArray[index], copyArray[randomPosition]] = [copyArray[randomPosition], copyArray[index]];
    }
    return copyArray;
  }

  domStr() {
    const Page = this.state.routes.find(route => route.path === this.state.path)?.component;
    return `
      ${new Header({ navigate: this.navigate.bind(this) }).domStr()}
      ${new Page({
        ...this.state,
        navigate: this.navigate.bind(this),
        checkCard: this.checkCard.bind(this),
      }).domStr()}
      ${new Footer().domStr()}
    `;
  }
  // setState 사용해서 변경할 할수
  // getNextId() {
  //   return Math.max(0, ...this.state.todos.flatMap(todo => todo.id)) + 1;
  // }

  checkCard(target) {
    this.setState({ openCard: [...this.state.openCard, target] });
  }
}

export default App;

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
      matchedCard: [],
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

  checkCard(target) {
    this.setState({ openCard: [...this.state.openCard, target] });
  }

  matchCard(target) {
    this.setState({ matchedCard: [...this.state.matchedCard, ...target] });
  }

  resetOpenedCard() {
    this.setState({ openCard: [] });
  }

  resetGame() {
    this.setState({ openCard: [], matchedCard: [] });
  }

  domStr() {
    const Page = this.state.routes.find(route => route.path === this.state.path)?.component;
    return `
      ${new Header({ navigate: this.navigate.bind(this) }).domStr()}
      ${new Page({
        ...this.state,
        navigate: this.navigate.bind(this),
        checkCard: this.checkCard.bind(this),
        matchCard: this.matchCard.bind(this),
        resetOpenedCard: this.resetOpenedCard.bind(this),
        resetGame: this.resetGame.bind(this),
      }).domStr()}
      ${new Footer().domStr()}
    `;
  }
}

export default App;

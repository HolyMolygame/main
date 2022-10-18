import Component from './components/Component.js';
import Home from './components/Home.js';
import { Header, Footer, MatchingCards, Signin, Rank, Signup } from './components/index.js';

const isSigned = async () => {
  const { data } = await axios.get('/auth');
  return data.success;
};

const routes = [
  { path: '/', component: Home },
  { path: '/rank', component: Rank, guard: isSigned, redirectTo: Signin },
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup },
  { path: '/matching', component: MatchingCards },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      Page: Home,
      shuffledNum: this.shuffle(),
      openCard: [],
      matchedCard: [],
      isStarted: false,
      elapsedTime: 0,
      convertedTime: '00:00:00',
      timeId: null,
    };
  }

  router(path = window.location.pathname) {
    const route = routes.find(route => route.path === path);

    (async () => {
      !route.guard || (await route.guard())
        ? this.setState({ Page: route.component })
        : this.setState({ Page: route.redirectTo });
    })();
    console.log(routes.find(route => route.component === this.state.Page)?.path);
    return routes.find(route => route.component === this.state.Page)?.path;
  }

  findPath() {
    // console.log(routes.find(route => route.component === this.state.Page)?.path);
    return routes.find(route => route.component === this.state.Page)?.path;
  }

  addEvent() {
    return [
      {
        type: 'popstate',
        selector: '',
        handler: () => {
          this.router(window.location.pathname);
        },
      },
      {
        type: 'DOMContentLoaded',
        selector: '',
        handler: () => {
          this.router(window.location.pathname);
        },
      },
    ];
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
    clearInterval(this.state.timeId);
    this.setState({
      shuffledNum: this.shuffle(),
      isStarted: false,
      openCard: [],
      matchedCard: [],
      elapsedTime: 0,
      convertedTime: '00:00:00',
      timeId: null,
    });
  }

  convertTime(time) {
    const minutes = (Math.floor(time / 6000) + '').padStart(2, 0);
    const seconds = (Math.floor((time % 6000) / 100) + '').padStart(2, 0);
    const ms = ((Math.floor(time % 6000) % 100) + '').padStart(2, 0);

    return `${minutes}:${seconds}:${ms}`;
  }

  start() {
    this.setState({
      timeId: setInterval(() => {
        this.setState({
          elapsedTime: this.state.elapsedTime + 1,
          convertedTime: this.convertTime(this.state.elapsedTime),
        });
        if (this.state.matchedCard.length === 18) {
          clearInterval(this.state.timeId);
        }
      }, 10),
      isStarted: true,
    });
  }

  domStr() {
    return `
      ${new Header({ ...this.state, router: this.router.bind(this), findPath: this.findPath.bind(this) }).domStr()}
      ${new this.state.Page({
        ...this.state,
        router: this.router.bind(this),
        checkCard: this.checkCard.bind(this),
        matchCard: this.matchCard.bind(this),
        resetOpenedCard: this.resetOpenedCard.bind(this),
        resetGame: this.resetGame.bind(this),
        start: this.start.bind(this),
      }).domStr()}
      ${new Footer().domStr()}
    `;
  }
}

export default App;

import Component from './components/Component.js';
import { Header, Footer, MatchingCards, Signin, Rank, Signup, Home } from './components/index.js';

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
  { path: '/logout', component: Home },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      ranker: [],
      Page: Home,
      shuffledNum: this.shuffle(),
      openCard: [],
      matchedCard: [],
      isStarted: false,
      elapsedTime: 0,
      convertedTime: '00:00:00',
      timeId: null,
      userid: {
        value: '',
        dirty: false,
        error: '이메일 형식에 맞게 입력해 주세요.',
      },
      password: {
        value: '',
        dirty: false,
        error: '영문 또는 숫자를 6~12자 입력하세요.',
      },
      username: {
        value: '',
        dirty: false,
        error: '이름을 입력해 주세요.',
      },
      'confirm-password': {
        value: '',
        dirty: false,
        error: '패스워드가 일치하지 않습니다.',
      },
    };
  }

  async rankerfetch() {
    const { data } = await axios.get('/ranker');
    return data;
  }

  router(path = window.location.pathname, user = this.state.user) {
    const route = routes.find(route => route.path === path);

    // if (path === '/rank') (async () => this.setState({ ranker: await this.rankerfetch() }))();
    if (path === '/logout')
      (async () => {
        await axios.get('/logout');
        this.setState({ user: null });
        alert('로그아웃되었습니다~');
      })();

    (async () => {
      !route.guard || (await route.guard())
        ? this.setState(
            path === '/rank'
              ? { ranker: await this.rankerfetch(), Page: route.component, user }
              : { Page: route.component, user }
          )
        : this.setState({ Page: route.redirectTo, user });
    })();
  }

  addEvent() {
    return [
      {
        type: 'popstate',
        selector: '',
        handler: () => this.router(window.location.pathname),
      },
      {
        type: 'DOMContentLoaded',
        selector: '',
        handler: () => this.router(window.location.pathname, JSON.parse(localStorage.getItem('user'))),
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

  convertTime(time) {
    const minutes = (Math.floor(time / 6000) + '').padStart(2, 0);
    const seconds = (Math.floor((time % 6000) / 100) + '').padStart(2, 0);
    const ms = ((Math.floor(time % 6000) % 100) + '').padStart(2, 0);

    return `${minutes}:${seconds}:${ms}`;
  }

  start() {
    this.showCards(() => {
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
        matchedCard: [],
      });
    });
  }

  checkCard(target) {
    this.setState({ openCard: [...this.state.openCard, target] });
  }

  addMatchedCard(target) {
    this.setState({ matchedCard: [...this.state.matchedCard, ...target] });
  }

  resetOpenedCard() {
    this.setState({ openCard: [] });
  }

  showCards(callback) {
    this.setState({
      matchedCard: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    });
    setTimeout(callback, 1000);
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

  setUserIdValue(value) {
    this.setState({ userid: { ...this.state.userid, value, dirty: value !== '' } });
  }

  setUserPasswordValue(value) {
    this.setState({ password: { ...this.state.password, value, dirty: value !== '' } });
  }

  setUserNameValue(value) {
    this.setState({ username: { ...this.state.username, value, dirty: value !== '' } });
  }

  setConfirmPasswordValue(value) {
    this.setState({ 'confirm-password': { ...this.state['confirm-password'], value, dirty: value !== '' } });
  }

  domStr() {
    return `
      ${new Header({ ...this.state, router: this.router.bind(this), resetGame: this.resetGame.bind(this) }).domStr()}
      ${new this.state.Page({
        ...this.state,
        router: this.router.bind(this),
        checkCard: this.checkCard.bind(this),
        addMatchedCard: this.addMatchedCard.bind(this),
        resetOpenedCard: this.resetOpenedCard.bind(this),
        resetGame: this.resetGame.bind(this),
        start: this.start.bind(this),
        setUserIdValue: this.setUserIdValue.bind(this),
        setUserNameValue: this.setUserNameValue.bind(this),
        setUserPasswordValue: this.setUserPasswordValue.bind(this),
        setConfirmPasswordValue: this.setConfirmPasswordValue.bind(this),
      }).domStr()}
      ${new Footer().domStr()}
    `;
  }
}

export default App;

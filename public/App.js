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

  router(path = window.location.pathname) {
    // header 에서 클릭이벤트로 href 를 받아서 path에 담는다.
    const route = routes.find(route => route.path === path);

    // change url path
    (async () => {
      !route.guard || (await route.guard())
        ? this.setState({ Page: route.component })
        : this.setState({ Page: route.redirectTo });
    })();
  }

  addEvent() {
    return [
      {
        type: 'popstate',
        selector: '',
        handler: () => {
          this.router(window.location.pathname);
          // this.setState({ Page: routes.find(route => route.path === window.location.pathname)?.component });
        },
      },
      {
        type: 'DOMContentLoaded',
        selector: '',
        handler: () => {
          // this.setState({ user: JSON.parse(localStorage.getItem('user')) });
          this.router(window.location.pathname);
        },
      },
    ];
  }

  // navigate(path, user = null) {
  //   if (window.location.pathname === path) return;
  //   window.history.pushState(null, null, path);
  //   if (user) this.setState({ path, user });
  //   else this.setState({ path });
  // }

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
    // const seconds = Math.floor((time % 6000) / 100) < 10 ? `0${Math.floor((time % 6000) / 100)}` : `${Math.floor((time % 6000) / 100)}`;
    const seconds = (Math.floor((time % 6000) / 100) + '').padStart(2, 0);
    // const ms = Math.floor(time % 6000) % 100 < 10 ? `0${Math.floor(time % 6000) % 100}` : `${Math.floor(time % 6000) % 100}`;
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

  setUserIdValue(value) {
    this.setState({ userid: { ...this.state.userid, value, dirty: true } });
    if (this.state.userid.value === '') this.setState({ userid: { ...this.state.userid, dirty: false } });
  }

  setUserPasswordValue(value) {
    this.setState({ password: { ...this.state.password, value, dirty: true } });
    if (this.state.password.value === '') this.setState({ password: { ...this.state.password, dirty: false } });
  }

  setUserNameValue(value) {
    this.setState({ username: { ...this.state.username, value, dirty: true } });
    if (this.state.username.value === '') this.setState({ username: { ...this.state.username, dirty: false } });
  }

  setConfirmPasswordValue(value) {
    this.setState({ 'confirm-password': { ...this.state['confirm-password'], value, dirty: true } });
    if (this.state['confirm-password'].value === '')
      this.setState({ 'confirm-password': { ...this.state['confirm-password'], dirty: false } });
  }

  domStr() {
    return `

      ${new Header({ ...this.state, router: this.router.bind(this) }).domStr()}
      ${new this.state.Page({
        ...this.state,
        router: this.router.bind(this),
        checkCard: this.checkCard.bind(this),
        matchCard: this.matchCard.bind(this),
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

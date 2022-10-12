import Component from './components/Component.js';
import Home from './components/Home.js';
import { Header, Footer, MatchingCards, Signin, Rank, Signup } from './components/index.js';

let Page = Home;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      this.createEvent({
        type: 'home',
        selector: '',
        handler: e => {
          const _path = e.detail ?? window.location.pathname;

          Page = this.state.routes.find(route => route.path === _path)?.component;
        },
      }),
      this.createEvent({
        type: 'rank',
        selector: '',
        handler: e => {
          const _path = e.detail ?? window.location.pathname;

          Page = this.state.routes.find(route => route.path === _path)?.component;
        },
      }),
      this.createEvent({
        type: 'gameplay',
        selector: '',
        handler: e => {
          const _path = e.detail ?? window.location.pathname;

          Page = this.state.routes.find(route => route.path === _path)?.component;
        },
      }),
      this.createEvent({
        type: 'signin',
        selector: '',
        handler: e => {
          const _path = e.detail ?? window.location.pathname;

          Page = this.state.routes.find(route => route.path === _path)?.component;
        },
      }),
      this.createEvent({
        type: 'signup',
        selector: '',
        handler: e => {
          const _path = e.detail ?? window.location.pathname;

          Page = this.state.routes.find(route => route.path === _path)?.component;
        },
      }),
      this.createEvent({
        type: 'popstate',
        selector: '',
        handler: e => {
          const _path = e.detail ?? window.location.pathname;

          Page = this.state.routes.find(route => route.path === _path)?.component;
        },
      }),
    ];
  }

  addPath(target, event) {
    const path = target.getAttribute('href');

    if (window.location.pathname === path) return;

    window.history.pushState(null, null, path);

    window.dispatchEvent(
      new CustomEvent(event, {
        detail: path,
      })
    );
  }

  domStr() {
    return `
      ${new Header().domStr()}
      ${new Page().domStr()}
      ${new Footer().domStr()}
    `;
  }

  // setState 사용해서 변경할 할수
  // getNextId() {
  //   return Math.max(0, ...this.state.todos.flatMap(todo => todo.id)) + 1;
  // }
}

export default App;

import Component from './components/Component.js';
import Home from './components/Home.js';
import { Header, Footer, MatchingCards, Signin, Rank, Signup } from './components/index.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '/',
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
      {
        type: 'onbeforeunload',
        selector: '',
        handler: () => {
          this.setState({ path: '/' });
        },
      },
    ];
  }

  navigate(path) {
    if (window.location.pathname === path) return;
    window.history.pushState(null, null, path);
    this.setState({ path });
  }

  domStr() {
    // window.history.pushState(null, null, this.state.path);
    const Page = this.state.routes.find(route => route.path === this.state.path)?.component;
    return `
      ${new Header({ navigate: this.navigate.bind(this) }).domStr()}
      ${new Page({ navigate: this.navigate.bind(this) }).domStr()}
      ${new Footer().domStr()}
    `;
  }
  // setState 사용해서 변경할 할수
  // getNextId() {
  //   return Math.max(0, ...this.state.todos.flatMap(todo => todo.id)) + 1;
  // }
}

export default App;

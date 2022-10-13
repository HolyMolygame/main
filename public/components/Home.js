import Component from './Component.js';
import Contributor from './Contributor.js';
import GameCard from './GameCard.js';

class Home extends Component {
  domStr() {
    return `
      <div class="home-container">
        ${new GameCard().domStr()}
        ${new Contributor().domStr()}
      </div>
    `;
  }
}

export default Home;

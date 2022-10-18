import Component from './Component.js';

class Rank extends Component {
  domStr() {
    return `
      <div class="rank-container">
        <h1 class="rank-title">RANKING <span>TOP 10</span></h1>
        <div class="rank-container">
          <table class="rank-table">
            <thead class="rank-container-head">
              <tr>
                <th>RANK</th>
                <th>NICKNAME</th>
                <th>SCORE</th>
              </tr>
            </thead>
            <tbody class="rank-container-body">
              ${this.props.ranker
                .map(
                  (user, i) => `
                <tr class="${i === 0 ? 'rank-first' : ''}">
                  <th>${i + 1}</th>
                  <th>${user.nickname}</th>
                  <th>${user.record}</th>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

export default Rank;

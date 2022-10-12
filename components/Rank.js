import Component from './Component.js';

class Rank extends Component {
  // addEvent() {
  //   return;
  // }

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
              <tr class="rank-first">
                <td>1</td>
                <td>YIJU</td>
                <td>3.1415</td>
              </tr>
              <tr>
                <td>1</td>
                <td>JUNY</td>
                <td>3.1415</td>
              </tr>
              <tr>
                <td>1</td>
                <td>DLCHAE</td>
                <td>3.1415</td>
              </tr>
              <tr>
                <td>1</td>
                <td>YIJU</td>
                <td>3.1415</td>
              </tr>
              <tr>
                <td>1</td>
                <td>JUNY</td>
                <td>3.1415</td>
              </tr>
              <tr>
                <td>1</td>
                <td>DLCHAE</td>
                <td>3.1415</td>
              </tr>
              <tr>
                <td>1</td>
                <td>YIJU</td>
                <td>3.1415</td>
              </tr>
              <tr>
                <td>1</td>
                <td>JUNY</td>
                <td>3.1415</td>
              </tr>
              <tr>
                <td>1</td>
                <td>DLCHAE</td>
                <td>3.1415</td>
              </tr>
              <tr>
                <td>1</td>
                <td>YIJU</td>
                <td>3.1415</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

export default Rank;

import Component from './Component.js';

class Contributor extends Component {
  domStr() {
    return `
    <div class="contributor">
      <h2 class="contributor-heading">contributor</h2>
      <div class="profile">
        <img src="./src/img/yiju_profile.webp" alt="loco 프로필" />
        <div class="profile-description">
          <p class="profile-title"><span class="title">name</span> : kim yiju</p>
          <p class="profile-title"><span class="title">hobby</span> : riding a bicycle</p>
          <p class="profile-title"><span class="title">git-hub</span> : https://github.com/loco9939 </p>
          <p class="profile-title"><span class="title">Motto</span> : We all live in gutter. But some of us are looking at the stars.</p>
        </div>
      </div>
      <div class="profile">
        <div class="profile-description">
          <p class="profile-title"><span class="title">name</span> : park jiyoon</p>
          <p class="profile-title"><span class="title">hobby</span> : playing the piano</p>
          <p class="profile-title"><span class="title">git-hub</span> : https://github.com/OrangeChick </p>
          <p class="profile-title"><span class="title">Motto</span> : As if today is the last, let's do our best every day and live with no regrets.</p>
        </div>
      <img src="./src/img/jiyoon_profile.png" alt="orange 프로필" />
      </div>
      <div class="profile">
        <img src="./src/img/charyeon_profile.webp" alt="chae 프로필" />
        <div class="profile-description">
          <p class="profile-title"><span class="title">name</span> : Lee chaeryeon</p>
          <p class="profile-title"><span class="title">hobby</span> : climbing</p>
          <p class="profile-title"><span class="title">git-hub</span> : https://github.com/CHAERYEON-LEE </p>
          <p class="profile-title"><span class="title">Motto</span> : it all depends on me.</p>
        </div>
      </div>  
    </div>
    `;
  }
}

export default Contributor;

import Component from './Component.js';

class Contributor extends Component {
  // addEvent() {
  //   return;
  // }

  domStr() {
    return `
    <div class="contributor">
      <h2 class="contributor-heading">contributor</h2>
      <div class="profile">
        <img src="./src/img/yiju_profile.webp" alt="loco 프로필" />
        <div class="profile-description">
          <p class="profile-title">name : kim</p>
          <p class="profile-title">hobby : bicycle</p>
          <p class="profile-title">git-hub : https://github.com/loco9939 </p>
          <p class="profile-title">Motto : We all live in gutter. But some of us are looking at the stars.</p>
        </div>
      </div>
      <div class="profile">
        <div class="profile-description">
          <p class="profile-title">name : kim</p>
          <p class="profile-title">hobby : bicycle</p>
          <p class="profile-title">git-hub : https://github.com/loco9939 </p>
          <p class="profile-title">Motto : We all live in gutter. But some of us are looking at the stars.</p>
        </div>
      <img src="./src/img/jiyoon_profile.png" alt="orange 프로필" />
      </div>
      <div class="profile">
        <img src="./src/img/charyeon_profile.webp" alt="chae 프로필" />
        <div class="profile-description">
          <p class="profile-title">name : kim</p>
          <p class="profile-title">hobby : bicycle</p>
          <p class="profile-title">git-hub : https://github.com/loco9939 </p>
          <p class="profile-title">Motto : We all live in gutter. But some of us are looking at the stars.</p>
        </div>
      </div>  
    </div>
    `;
  }
}

export default Contributor;

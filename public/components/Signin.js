import Component from './Component.js';

class Signin extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.signup-btn',
        handler: e => {
          e.preventDefault();
          if (!e.target.classList.contains('signup-btn')) return;
          const path = e.target.getAttribute('href');
          this.props.navigate(path);
        },
      }),
    ];
  }

  domStr() {
    return `<div class="signin-container">
              <div class="signin-title">SIGN IN</div>
              <form class="form signin_info" novalidate>
                <div class="input-container">
                  <label for="signin-userid">ID:</label>
                  <input type="text" id="signin-userid" name="userid" required autocomplete="off" />
                </div>
                <div class="hidden error">THERE IS NO REGISTERED ID.</div>
                <div class="input-container">
                  <label for="signin-password">Password:</label>
                  <input type="password" id="signin-password" name="password" required autocomplete="off" />
                </div>
                <div class="hidden error">PASSWORDS DO NOT MATCH.</div>
                <a href="/signup" class="signup-btn">SIGN UP</a>
                <button class="signin-btn" type="submit">LOGIN</button>
              </form>
            </div>`;
  }
}

export default Signin;

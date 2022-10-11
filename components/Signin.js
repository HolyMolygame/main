import Component from './Component.js';

class Signin extends Component {
  // addEvent() {}

  domStr() {
    return `<div class="signin-container">
              <div class="signin-title">SIGN IN</div>
              <form class="form signin_info" novalidate>
                <div class="input-container">
                  <label for="signin-userid">ID:</label>
                  <input type="text" id="signin-userid" name="userid" required autocomplete="off" />
                  <div class="error"></div>
                </div>
                <div class="input-container">
                  <label for="signin-password">Password:</label>
                  <input type="password" id="signin-password" name="password" required autocomplete="off" />
                  <div class="error"></div>
                </div>
                <a class="signup-btn" href="/">SIGN UP</a>
                <button class="signin-btn">LOGIN</button>
              </form>
            </div>`;
  }
}

export default Signin;

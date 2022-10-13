import Component from './Component.js';

class Signup extends Component {
  // addEvent() {}

  domStr() {
    return `<div class="signup-container">
              <div class="signup-title">SIGN UP</div>
              <form class="form signup_info" action="/signup" method="POST" novalidate>
                <div class="input-container">
                  <label for="signup-userid">NICKNAME:</label>
                  <input type="text" id="signup-userid" name="userid" required autocomplete="off" />
                </div>
                <div class="hidden error">IS ALREADY REGISTERED</div>
                <div class="input-container">
                  <label for="signup-name">ID:</label>
                  <input type="text" id="signup-name" name="username" required autocomplete="off" />
                </div>
                <div class="hidden error">INVALID ID. PLEASE CHECK YOUR ID</div>
                <div class="input-container">
                  <label for="signup-password">PASSWORD:</label>
                  <input type="password" id="signup-password" name="password" required autocomplete="off" />
                </div>
                <div class="hidden error">INVALID PW. PLEASE CHECK YOUR PW</div>
                <div class="input-container">
                  <label for="signup-confirm-password">CONFIRM:</label>
                  <input type="password" id="signup-confirm-password" name="confirm-password" required autocomplete="off" />
                </div>
                <div class="hidden error">PLEASE CHECK YOUR PW</div>
                <button class="submit-btn" disabled>SUBMIT</button>
              </form>
            </div>
    `;
  }
}

export default Signup;

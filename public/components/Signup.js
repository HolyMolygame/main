import Component from './Component.js';

class Signup extends Component {
  getUserIdValid(value) {
    return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(value);
  }

  getPasswordValid(value) {
    return /^[A-Za-z0-9]{6,12}$/.test(value);
  }

  getUserNameValid(value) {
    return !!value;
  }

  getConfirmPasswordValid(value) {
    return this.props.password.value === value;
  }

  addEvent() {
    return [
      this.createEvent({
        type: 'input',
        selector: '#signup-userid',
        handler: e => {
          const { value } = e.target;

          this.props.setUserIdValue(value);
        },
      }),
      this.createEvent({
        type: 'input',
        selector: '#signup-name',
        handler: e => {
          const { value } = e.target;

          this.props.setUserNameValue(value);
        },
      }),
      this.createEvent({
        type: 'input',
        selector: '#signup-password',
        handler: e => {
          const { value } = e.target;

          this.props.setUserPasswordValue(value);
        },
      }),
      this.createEvent({
        type: 'input',
        selector: '#signup-confirm-password',
        handler: e => {
          const { value } = e.target;

          this.props.setConfirmPasswordValue(value);
        },
      }),
      this.createEvent({
        type: 'submit',
        selector: '.signup_info',
        handler: async e => {
          e.preventDefault();

          const payload = [...new FormData(document.querySelector('.signup_info'))].reduce(
            // eslint-disable-next-line no-return-assign
            (obj, [key, value]) => ((obj[key] = value), obj),
            {}
          );

          try {
            await axios.post('/signup', payload);
            console.log('SINGUP SUCCESS!');
            alert('SINGUP SUCCESS!');
            this.props.router('/signin');
          } catch (e) {
            console.log('SIGNUP FAILURE..');
            document.querySelector('.error').classList.remove('hidden');
          }
        },
      }),
    ];
  }

  domStr() {
    return `<div class="signup-container">
              <div class="signup-title">SIGN UP</div>
              <form class="form signup_info" action="/signup" method="POST" novalidate>
                <div class="input-container">
                  <label for="signup-userid">ID:</label>
                  <input type="text" id="signup-userid" name="userid" required autocomplete="off" value="${
                    this.props.userid.value
                  }" />
                </div>
                <div class="${
                  this.getUserIdValid(this.props.userid.value) === this.props.userid.dirty ? 'hidden' : ''
                } error">INVALID ID. PLEASE CHECK YOUR ID</div>
                <div class="hint">ex) email@email.com </div>
                <div class="input-container">
                  <label for="signup-name">NICKNAME:</label>
                  <input type="text" id="signup-name" name="username" required autocomplete="off" value="${
                    this.props.username.value
                  }" />
                </div>
                <div class="${
                  this.getUserNameValid(this.props.username.value) === this.props.username.dirty ? 'hidden' : ''
                } error">Please write at least one character</div>
                <div class="input-container">
                  <label for="signup-password">PASSWORD:</label>
                  <input type="password" id="signup-password" name="password" required autocomplete="off" value="${
                    this.props.password.value
                  }"/>
                </div>
                <div class="${
                  this.getPasswordValid(this.props.password.value) === this.props.password.dirty ? 'hidden' : ''
                } error">INVALID PW. PLEASE CHECK YOUR PW</div>
                <div class="hint">6 ~ 12 characters or numbers </div>
                <div class="input-container">
                  <label for="signup-confirm-password">CONFIRM:</label>
                  <input type="password" id="signup-confirm-password" name="confirm-password" required autocomplete="off" value="${
                    this.props['confirm-password'].value
                  }"/>
                </div>
                <div class="${
                  this.getConfirmPasswordValid(this.props['confirm-password'].value) ||
                  !this.props['confirm-password'].dirty
                    ? 'hidden'
                    : ''
                } error">PLEASE CHECK YOUR PW</div>
                <button type="submit" ${
                  this.getUserIdValid(this.props.userid.value) &&
                  this.getUserNameValid(this.props.username.value) &&
                  this.getPasswordValid(this.props.password.value) &&
                  this.getConfirmPasswordValid(this.props['confirm-password'].value)
                    ? ''
                    : 'disabled'
                } class="submit-btn">SUBMIT</button>
              </form>
            </div>
    `;
  }
}

export default Signup;

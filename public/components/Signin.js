/* eslint-disable no-sequences */
import Component from './Component.js';

class Signin extends Component {
  addEvent() {
    return [
      this.createEvent({
        type: 'click',
        selector: '.signup-btn',
        handler: e => {
          e.preventDefault();

          const path = e.target.closest('.signup-btn').getAttribute('href');
          window.history.pushState(null, null, path);
          this.props.router(path);
        },
      }),
      this.createEvent({
        type: 'submit',
        selector: '.signin_info',
        handler: async e => {
          e.preventDefault();

          const payload = [...new FormData(document.querySelector('.signin_info'))].reduce(
            // eslint-disable-next-line no-return-assign
            (obj, [key, value]) => ((obj[key] = value), obj),
            {}
          );

          try {
            const { data: user } = await axios.post('/signin', payload);
            console.log('😀 LOGIN SUCCESS!');
            alert('LOGIN SUCCESS!');
            if (user) this.props.router('/', user);
            localStorage.setItem('user', JSON.stringify(user));
          } catch (e) {
            console.log('😱 LOGIN FAILURE..');
            document.querySelector('.error').classList.remove('hidden');
          }
        },
      }),
    ];
  }

  domStr() {
    return `<div class="signin-container">
              <div class="signin-title">SIGN IN</div>
              <form class="form signin_info" action="/signin" method="POST" novalidate>
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
                <button><a href="/signup" class="signup-btn">SIGN UP</a></button>
                <button class="signin-btn signin-button-form" type="submit">LOGIN</button>
              </form>
            </div>`;
  }
}

export default Signin;

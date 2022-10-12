import Component from './Component.js';

class Signin extends Component {
  addEvent() {
    return [
      // 로그인 버튼 클릭 시는 로그인 회원가입 상태 관리 먼저 하고 난 후 등록
      // this.createEvent({
      //   type: 'click',
      //   selector: '.signin-btn',
      //   handler: e => {
      //     e.preventDefault();

      //     const path = e.target.getAttribute('href');

      //     if (window.location.pathname === path) return;

      //     window.history.pushState(null, null, path);

      //     window.dispatchEvent(
      //       new CustomEvent('signin', {
      //         detail: path,
      //       })
      //     );
      //   },
      // }),
      this.createEvent({
        type: 'click',
        selector: '.signup-btn',
        handler: e => {
          e.preventDefault();

          const path = e.target.getAttribute('href');

          if (window.location.pathname === path) return;

          window.history.pushState(null, null, path);

          window.dispatchEvent(
            new CustomEvent('signup', {
              detail: path,
            })
          );
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
                <button class="signin-btn">LOGIN</button>
              </form>
            </div>`;
  }
}

export default Signin;

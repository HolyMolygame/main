import Component from './Component.js';

const signup = new CustomEvent('signup', {
  detail: true,
});
class Signin extends Component {
  addEvent() {
    //   this.createEvent({
    //     type:'click',
    //     selector:'.signin-btn',
    //     handler: e => {
    //       // input 값 유효성 검사
    //       // 이벤트 생성하기 전에 login 상태관리부터 선행되어야 할듯
    //     }
    //   })
    return [
      this.createEvent({
        type: 'click',
        selector: '.signup-btn',
        handler: () => {
          window.dispatchEvent(signup);
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
                <button type="button" class="signup-btn">SIGN UP</button>
                <button class="signin-btn">LOGIN</button>
              </form>
            </div>`;
  }
}

export default Signin;

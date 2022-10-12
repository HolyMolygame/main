import App from './App.js';
import render from './render/index.js';

window.history.pushState(null, null, '/');
render(App, document.getElementById('root'));

window.addEventListener('gameplay', () => {
  render();
});
window.addEventListener('signin', () => {
  render();
});
window.addEventListener('signup', () => {
  render();
});
window.addEventListener('home', () => {
  render();
});
window.addEventListener('popstate', () => {
  render();
});
window.addEventListener('rank', () => {
  render();
});

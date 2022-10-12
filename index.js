import App from './App.js';
import render from './render/index.js';

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
window.addEventListener('main', () => {
  render();
});
window.addEventListener('rank', () => {
  render();
});

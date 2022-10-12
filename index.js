import App from './App.js';
import render from './render/index.js';

window.history.pushState(null, null, '/');
render(App, document.getElementById('root'));


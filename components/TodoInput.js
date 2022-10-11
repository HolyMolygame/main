import Component from './Component.js';

class TodoInput extends Component {
  addEvent() {
    return [
      {
        type: 'keyup',
        selector: '.todo-input',
        handler: e => {
          if (e.key !== 'Enter' || e.target.value.trim() === '') return;
          this.props.addTodo(e.target.value);
          e.target.value = '';
        },
      },
    ];
  }

  domStr() {
    return `<input class='todo-input' autofocus/>`;
  }
}

export default TodoInput;

import Component from './Component.js';

class TodoItem extends Component {
  addEvent() {
    return [
      {
        type: 'change',
        selector: '.toggle-todo',
        handler: e => {
          this.props.toggleTodoCompleted(+e.target.closest('li').id);
        },
      },
      {
        type: 'click',
        selector: '.remove-todo',
        handler: e => {
          this.props.removeTodo(+e.target.closest('li').id);
        },
      },
    ];
  }

  domStr() {
    const todo = this.props.state.todos.find(todo => todo.id === this.props.id);

    return `
      <li id="${this.props.id}">
        <input class="toggle-todo" type='checkbox' ${todo?.completed ? 'checked' : ''}/>
        <span>${todo?.content ?? ''}</span>
        <button class="remove-todo">X</button>
      </li>
    `;
  }
}

export default TodoItem;

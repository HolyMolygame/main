import Component from './Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
  domStr() {
    const { todos, currentTodoFilterId } = this.props.state;
    return `
      <ul class="todo-list">
        ${todos
          .filter(todo => {
            if (currentTodoFilterId === 1) return todo.completed;
            if (currentTodoFilterId === 2) return !todo.completed;
            return todo;
          })
          .map(({ id }) => new TodoItem({ ...this.props, id }).domStr())
          .join('')}
      </ul>
    `;
  }
}

export default TodoList;

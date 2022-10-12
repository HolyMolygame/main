import Component from './Component.js';

class TodoFilter extends Component {
  addEvent() {
    return [
      {
        type: 'click',
        selector: '.filter',
        handler: e => {
          this.props.changeFilterId(+e.target.closest('.filter').id);
        },
      },
    ];
  }

  domStr() {
    const { todoFilter, currentTodoFilterId } = this.props.state;
    return `
      <ul class='todo-filter'>
        ${todoFilter
          .map(
            (filter, i) => `<li class=" filter ${i === currentTodoFilterId ? 'active' : ''}" id="${i}">${filter}</li>`
          )
          .join('')}
      </ul>
    `;
  }
}

export default TodoFilter;

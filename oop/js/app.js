import Store from './store/index.js';
import Todo from './models/Todo.js';
import TodoState from './models/TodoState.js';
import TodoView from './view/TodoView.js';
import TodoEvents from './TodoEvents.js';

function init() {
  const store = new Store();
  new App(store);
}

class App {
  currentCategory = 'work';

  constructor(store) {
    this.store = store;
    this.todoState = new TodoState(store.getLocalStorage());
    this.todoView = new TodoView();
    this.todoEvents = new TodoEvents(this);

    this.render();
  }
  render() {
    const todoByCategory = this.todoState.getTodosByCategory(
      this.currentCategory,
    );
    this.todoView.renderTodos(todoByCategory);
  }

  syncAndRender() {
    this.render();
    this.store.setLocalStorage(this.todoState.getTodos());
  }

  // Event Handlers
  handleAddTodo() {
    if (this.todoView.isEmptyInput()) {
      this.todoView.showAlert('😢 입력을 해주세요.', 'error');
      return;
    }

    const newTodo = new Todo(this.todoView.getInputValue(), false);
    this.todoState.addTodo(this.currentCategory, newTodo);
    this.syncAndRender();
    this.todoView.showAlert('🙂등록되었습니다.', 'success');
    this.todoView.clearInput();
  }
  handleUpdateTodo(e) {
    const listItem = this.todoView.getListItemFromEvent(e);
    this.todoView.uncheckItem(listItem);
    const titleInput = this.todoView.enableTitleInput(listItem);

    titleInput.addEventListener('blur', () => {
      this.todoState.updateTodo(
        this.currentCategory,
        parseInt(listItem.dataset.id),
        this.todoView.getTitleInputValue(listItem),
      ),
        this.syncAndRender();
      this.todoView.showAlert('✨ 수정하였습니다.', 'success');
    });
  }
  handleDeleteTodo(e) {
    const listItem = this.todoView.getListItemFromEvent(e);
    this.todoState.deleteTodo(
      this.currentCategory,
      parseInt(listItem.dataset.id),
    );
    this.syncAndRender();
  }
  handleToggleTodo(e) {
    const listItem = this.todoView.getListItemFromEvent(e);
    this.todoState.toggleTodo(
      this.currentCategory,
      parseInt(listItem.dataset.id),
    );
    this.syncAndRender();
  }
}

document.addEventListener('DOMContentLoaded', init);

import { $ } from '../utils/dom.js';
import { UI } from '../view/UI.js';

export class Store {
  static currentCategory = 'work';

  static getCurrentCategory() {
    return this.currentCategory;
  }

  static setCurrentCategory(category) {
    this.currentCategory = category;
  }

  static getTodosFromLocalStorage() {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
  }

  static displayTodos() {
    const todos = Store.getTodosFromLocalStorage().filter(
      (todo) => todo.category === this.currentCategory,
    );
    const listContainer = $('.list-items');
    const fallback = $('.fallback-contents');
    const activeCategory = $('.category.active');
    const header = $('.header-area h2');
    const ui = new UI();

    header.textContent = activeCategory.textContent;

    if (todos.length > 0) {
      fallback.style.display = 'none';
    } else {
      fallback.style.display = 'block';
    }

    listContainer.innerHTML = '';
    todos.forEach((todo) => {
      ui.addList(todo);
    });
    ui.countLists(todos);
  }

  static addTodoToLocalStorage(todo) {
    const todos = Store.getTodosFromLocalStorage();
    const ui = new UI();
    todos.push(todo);
    ui.countLists(
      todos.filter((todo) => todo.category === this.currentCategory),
    );
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  static editTodoToLocalStorage(id, property, newValue) {
    const todos = Store.getTodosFromLocalStorage();
    const index = todos.findIndex((todo) => todo.id === parseInt(id));

    if (index !== -1 && todos[index].hasOwnProperty(property)) {
      todos[index][property] = newValue;
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }

  static deleteListFromLocalStorage(id) {
    const todos = Store.getTodosFromLocalStorage();
    const index = todos.findIndex((todo) => todo.id === parseInt(id));
    const ui = new UI();
    if (index !== -1) {
      todos.splice(index, 1);
    }
    ui.countLists(
      todos.filter((todo) => todo.category === this.currentCategory),
    );
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

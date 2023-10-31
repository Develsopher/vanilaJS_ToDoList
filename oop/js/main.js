import { $, $$ } from './utils/dom.js';
import { Alert } from './View/Alert.js';

function init() {
  const store = new Store();
  new App(store);
}

class Store {
  setLocalStorage(todo) {
    localStorage.setItem('todo', JSON.stringify(todo));
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('todo'));
  }
}

class Todo {
  constructor(title, completed) {
    this.title = title;
    this.completed = completed;
  }
}

class App {
  todos = {
    work: [],
    travel: [],
    fitness: [],
    study: [],
    project: [],
  };
  currentCategory = 'work';

  constructor(store) {
    this.store = store;
    this.todos = store.getLocalStorage() || this.todos;
    this.initEventListeners();
    this.render();
  }
  render() {
    if (this.todos[this.currentCategory].length > 0) {
      $('.fallback-contents').style.display = 'none';
    } else {
      $('.fallback-contents').style.display = 'block';
    }
    const template = this.todos[this.currentCategory]
      .map((todo, index) => {
        return `
        <div class="list-item" data-id="${index}">
          <label class="checkbox ${todo.completed ? 'checked' : ''}">
          <input class="item-checkbox" type="checkbox" ${
            todo.completed ? 'checked' : ''
          }/>
          <span class="checkbox_icon"></span>
          </label>
          <input value="${
            todo.title
          }" type="text" class="todo-title"  disabled/>
          <button class="edit-btn actions-btn">수정</button>
          <button class="delete-btn actions-btn">삭제</button>
        </div>
    `;
      })
      .join('');
    $('.list-items').innerHTML = template;

    // todo-count
    $('.todo-count').textContent = this.todos[this.currentCategory].length;
  }
  //Business Logic
  addTodo(newTodo) {
    this.todos[this.currentCategory] = [
      ...this.todos[this.currentCategory],
      newTodo,
    ];
  }
  updateTodo(id, newTitle) {
    this.todos[this.currentCategory][id].title = newTitle;
    this.todos[this.currentCategory][id].completed = false;
  }
  deleteTodo(id) {
    this.todos[this.currentCategory].splice(id, 1);
  }
  toggleTodo(id) {
    this.todos[this.currentCategory][id].completed =
      !this.todos[this.currentCategory][id].completed;
  }
  // Event Handlers
  addTodoList() {
    if ($('#create-todo-title').value.trim() === '') {
      new Alert().show('😢 입력을 해주세요.', 'error');
      return;
    }

    const newTodo = new Todo($('#create-todo-title').value, false);
    this.addTodo(newTodo);
    this.syncAndRender();
    new Alert().show('🙂등록되었습니다.', 'success');
    $('#create-todo-title').value = '';
  }
  updateTodoList(e) {
    const listItem = e.target.closest('div');
    const checkbox = $('.checkbox', listItem);
    const checkInput = $('.item-checkbox', listItem);
    const titleInput = $('.todo-title', listItem);
    const titleInputLength = titleInput.value.length;

    if (checkInput.checked) {
      checkbox.classList.remove('checked');
      checkInput.checked = false;
    }
    titleInput.disabled = false;
    titleInput.focus();
    titleInput.setSelectionRange(titleInputLength, titleInputLength);

    titleInput.addEventListener('blur', () => {
      this.updateTodo(listItem.dataset.id, titleInput.value);
      this.syncAndRender();
      new Alert().show('✏️ 수정하였습니다.', 'success');
    });
  }
  deleteTodoList(e) {
    const listItem = e.target.closest('div');
    this.deleteTodo(listItem.dataset.id);
    this.syncAndRender();
  }
  toggleTodoCompleted(e) {
    const listItem = e.target.closest('div');
    this.toggleTodo(listItem.dataset.id);
    this.syncAndRender();
  }
  syncAndRender() {
    this.store.setLocalStorage(this.todos);
    this.render();
  }
  // Event Listeners
  initEventListeners() {
    $('#create-todo-btn').addEventListener(
      'click',
      this.addTodoList.bind(this),
    );

    $('.list-items').addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        this.updateTodoList(e);
        return;
      }
      if (e.target.classList.contains('delete-btn')) {
        this.deleteTodoList(e);
        return;
      }
    });

    $('.list-items').addEventListener('change', (e) => {
      if (e.target.classList.contains('item-checkbox')) {
        this.toggleTodoCompleted(e);
        return;
      }
    });
    // 카테고리 변경
    $$('.category').forEach((category) => {
      category.addEventListener('click', (e) => {
        const newCategory = e.target.dataset.categoryName;
        $('.category.active').classList.remove('active');
        e.target.classList.add('active');

        $('.header-area h2').textContent = e.target.textContent;
        this.currentCategory = newCategory;
        this.render();
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', init);

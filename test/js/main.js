import { $, $$ } from './utils/dom.js';
import Store from './Store/index.js';
import Todo from './Model/Todo.js';
import { Alert } from './View/Alert.js';

function init() {
  const store = new Store();
  new App(store);
}

class App {
  constructor(store) {
    this.store = store;

    if (this.store.getLocalStorage()) {
      this.todos = this.store.getLocalStorage();
    }
    this.initEventListeners();
    this.render();
  }

  todos = {
    work: [],
    travel: [],
    fitness: [],
    study: [],
    project: [],
  };

  currentCategory = 'work';

  render() {
    const template = this.todos[this.currentCategory]
      .map((todo) => {
        return `
      <div class="list-item" data-id="${todo.id}">
        <label class="checkbox ${todo.completed ? 'checked' : ''}">
        <input class="item-checkbox" type="checkbox" ${
          todo.completed ? 'checked' : ''
        }/>
        <span class="checkbox_icon"></span>
        </label>
        <input value="${todo.title}" type="text" class="todo-title"  disabled/>
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

  addTodoList() {
    const alert = new Alert();
    if ($('#create-todo-title').value.trim() === '') {
      alert.show('😢 입력을 해주세요.', 'error');
      return;
    }
    const newTodo = new Todo($('#create-todo-title').value, false);
    this.todos[this.currentCategory].push(newTodo);
    this.store.setLocalStorage(this.todos);
    this.render();
    $('#create-todo-title').value = '';
    alert.show('🙂 정상적으로 등록되었습니다.', 'success');
  }

  editTodoList(e) {
    const { todo, index } = this.getTodoDataFromEvent(e);

    const checkbox = $('.checkbox', todo);
    const checkInput = $('.item-checkbox', todo);
    const titleInput = $('.todo-title', todo);
    const titleInputLength = titleInput.value.length;
    if (checkInput.checked) {
      checkbox.classList.remove('checked');
      checkInput.checked = false;
    }
    titleInput.disabled = false;
    titleInput.focus();
    titleInput.setSelectionRange(titleInputLength, titleInputLength);
    this.updateTodoList(titleInput, index);
  }

  updateTodoList(input, index) {
    input.addEventListener('blur', () => {
      this.todos[this.currentCategory][index].completed = false;
      this.todos[this.currentCategory][index].title = input.value;
      this.store.setLocalStorage(this.todos);
      this.render();
    });
  }

  toggleTodoCompleted(e) {
    const { index } = this.getTodoDataFromEvent(e);

    this.todos[this.currentCategory][index].completed =
      !this.todos[this.currentCategory][index].completed;
    this.store.setLocalStorage(this.todos);
    this.render();
  }

  deleteTodoList(e) {
    const { index } = this.getTodoDataFromEvent(e);

    this.todos[this.currentCategory].splice(index, 1);
    this.store.setLocalStorage(this.todos);
    this.render();
  }

  getTodoDataFromEvent(e) {
    const todo = e.target.closest('div');
    const todoId = todo.dataset.id;
    const index = this.todos[this.currentCategory].findIndex(
      (todo) => todo.id === parseInt(todoId),
    );

    return { todo, index };
  }

  initEventListeners() {
    // add todo lis with click
    $('#create-todo-btn').addEventListener(
      'click',
      this.addTodoList.bind(this),
    );

    // 이벤트 위임
    $('.list-items').addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        this.editTodoList(e);
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

    // category 변경
    $$('.category').forEach((category) => {
      category.addEventListener('click', (e) => {
        const newCategory = e.target.dataset.categoryName;
        $('.category.active').classList.remove('active');
        e.target.classList.add('active');

        this.currentCategory = newCategory;
        $('.header-area h2').textContent = e.target.textContent;
        this.render();
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', init());

import { $, $$ } from './utils/dom.js';

let state = {
  todos: [],
};

const getTodosFromLocalStorage = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : state.todos;
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const render = (todos) => {
  const template = todos
    .map((todo, index) => {
      return `
      <div class="list-item" data-id="${index}">
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
  $('.todo-count').textContent = todos.length;
};

// 비즈니스 로직
const addTodo = (todos, title) => {
  const newTodo = {
    title: title,
    completed: false,
  };

  return [...todos, newTodo];
};

const editTodo = (todos, index, newTitle) => {
  return todos.map((todo, idx) => {
    if (idx === index) {
      return {
        ...todo,
        title: newTitle,
        completed: false,
      };
    }
    return todo;
  });
};

const removeTodo = (todos, index) => {
  return todos.filter((_, idx) => idx !== index);
};

const toggleTodo = (todos, index) => {
  return todos.map((todo, idx) => {
    if (idx === index) {
      return {
        ...todo,
        completed: !todo.completed,
      };
    }
    return todo;
  });
};

// Event Handlers
const addTodoList = () => {
  if ($('#create-todo-title').value.trim() === '') {
    alert('입력값을 확인해 주세요.');
    return;
  }

  state.todos = addTodo(state.todos, $('#create-todo-title').value);
  syncAndRender();
  $('#create-todo-title').value = '';
  // alert('등록되었습니다.');
};

const editTodoList = (e) => {
  const listItem = e.target.closest('div');
  const index = parseInt(listItem.dataset.id);
  const checkbox = $('.checkbox', listItem);
  const checkInput = $('.item-checkbox', listItem);
  const titleInput = $('.todo-title', listItem);

  if (checkInput.checked) {
    checkbox.classList.remove('checked');
    checkInput.checked = false;
  }
  titleInput.disabled = false;
  titleInput.focus();
  titleInput.setSelectionRange(
    titleInput.value.length,
    titleInput.value.length,
  );

  titleInput.addEventListener('blur', () => {
    state.todos = editTodo(state.todos, index, titleInput.value);
    syncAndRender();
  });
};

const deleteTodoList = (e) => {
  const listItem = e.target.closest('div');
  const index = parseInt(listItem.dataset.id);

  state.todos = removeTodo(state.todos, index);
  syncAndRender();
};

const toggleTodoCompleted = (e) => {
  const listItem = e.target.closest('div');
  const index = parseInt(listItem.dataset.id);

  state.todos = toggleTodo(state.todos, index);
  syncAndRender();
};

const syncAndRender = () => {
  saveTodosToLocalStorage(state.todos);
  render(state.todos);
};

// Event Listeners

$('#create-todo-btn').addEventListener('click', addTodoList);

$('.list-items').addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    editTodoList(e);
    return;
  }
  if (e.target.classList.contains('delete-btn')) {
    deleteTodoList(e);
    return;
  }
});

$('.list-items').addEventListener('change', (e) => {
  if (e.target.classList.contains('item-checkbox')) {
    toggleTodoCompleted(e);
    return;
  }
});

const init = () => {
  const todosFromLocalStorage = getTodosFromLocalStorage();
  state = {
    ...state,
    todos: todosFromLocalStorage,
  };
  render(state.todos);
};

document.addEventListener('DOMContentLoaded', init);

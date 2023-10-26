import { $, $$ } from './utils/dom.js';
import { Todo } from './models/Todo.js';
import { UI } from './view/UI.js';
import { Alert } from './view/Alert.js';
import { Store } from './store/index.js';

// Element Constants
const listContainer = $('.list-items');
const addTodoBtn = $('#create-todo-btn');
const categoryButtons = $$('.category');

// Initial Function
function init() {
  Store.displayTodos();
}

// Event Listeners
addTodoBtn.addEventListener('click', (e) => {
  const todoTitle = $('#create-todo-title').value;
  const todo = new Todo(todoTitle, false, Store.getCurrentCategory());
  const ui = new UI();
  const alert = new Alert();

  if (todoTitle) {
    // Add Todo
    ui.addList(todo);
    // Save Todo
    Store.addTodoToLocalStorage(todo);
    // Clear Input
    ui.clearField();
    // Alert
    alert.show('🙂 정상적으로 등록되었습니다.', 'success');
  } else {
    alert.show('😢 입력을 해주세요.', 'error');
  }
});

// Event Delegation
listContainer.addEventListener('change', (e) => {
  const ui = new UI();

  if (e.target.matches('.item-checkbox')) {
    ui.changeCompleted(e.target.parentElement);
    Store.editTodoToLocalStorage(
      e.target.parentElement.parentElement.dataset.id,
      'completed',
      e.target.checked,
    );
  }
});

listContainer.addEventListener('click', (e) => {
  const ui = new UI();

  if (e.target.matches('.edit-btn')) {
    ui.editList(e.target.parentElement);

    Store.editTodoToLocalStorage(
      e.target.parentElement.dataset.id,
      'completed',
      false,
    );
  } else if (e.target.matches('.delete-btn')) {
    ui.deleteList(e.target.parentElement);
    Store.deleteListFromLocalStorage(e.target.parentElement.dataset.id);
  }
});

listContainer.addEventListener('focusout', (e) => {
  if (e.target.matches('.todo-title')) {
    e.target.disabled = true;
    Store.editTodoToLocalStorage(
      e.target.parentElement.dataset.id,
      'title',
      e.target.value,
    );
  }
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    $('.category.active')?.classList.remove('active');

    e.target.classList.add('active');

    Store.setCurrentCategory(e.target.dataset.categoryName);
    Store.displayTodos();
  });
});

document.addEventListener('DOMContentLoaded', init);

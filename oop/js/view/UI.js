import { $ } from '../utils/dom.js';

const fallback = $('.fallback-contents');
const listContainer = $('.list-items');
const addTodoTitle = $('#create-todo-title');

export class UI {
  addList(todo) {
    console.log('todo', todo);
    const item = document.createElement('div');
    item.classList.add('list-item');
    item.dataset.id = todo.id;
    item.innerHTML = `
      <label class="checkbox ${todo.completed ? 'checked' : ''}">
            <input class="item-checkbox" type="checkbox" ${
              todo.completed ? 'checked' : ''
            }/>
            <span class="checkbox_icon"></span>
      </label>
      <input value="${todo.title}" type="text" class="todo-title"  disabled/>
      <button class="edit-btn actions-btn">수정</button>
      <button class="delete-btn actions-btn">삭제</button>
      
    `;

    if (fallback.style.display !== 'none') {
      fallback.style.display = 'none';
    }
    listContainer.prepend(item);
  }

  changeCompleted(todo) {
    const checkInput = $('.item-checkbox', todo);
    if (checkInput.checked) {
      todo.classList.add('checked');
    } else {
      todo.classList.remove('checked');
    }
  }

  editList(todo) {
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
  }

  deleteList(todo) {
    todo.remove();
    if (listContainer.children.length < 1 && fallback) {
      fallback.style.display = 'block';
    }
  }

  clearField() {
    addTodoTitle.value = '';
  }

  countLists(todos) {
    const countElement = $('.todo-count');
    countElement.textContent = todos.length;
  }
}

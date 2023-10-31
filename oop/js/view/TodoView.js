import { $ } from '../utils/dom.js';
// todo rendering, show alert, dom 조작
export default class Todoview {
  renderTodos(todos) {
    if (todos.length > 0) {
      $('.fallback-contents').style.display = 'none';
    } else {
      $('.fallback-contents').style.display = 'block';
    }
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
    $('.todo-count').textContent = todos.length;
  }

  showAlert(message, status) {
    const alertContainer = $('.alert-area');

    const existingAlert = $('.alert');
    if (existingAlert) {
      existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `alert alert-${status}`;
    alert.appendChild(document.createTextNode(message));

    alertContainer.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 2000);
  }

  getInputValue() {
    return $('#create-todo-title').value.trim();
  }

  isEmptyInput() {
    return this.getInputValue() === '';
  }

  clearInput() {
    $('#create-todo-title').value = '';
  }

  getListItemFromEvent(e) {
    return e.target.closest('div');
  }

  uncheckItem(listItem) {
    const checkbox = $('.checkbox', listItem);
    const checkInput = $('.item-checkbox', listItem);
    if (checkInput.checked) {
      checkbox.classList.remove('checked');
      checkInput.checked = false;
    }
  }

  enableTitleInput(listItem) {
    const titleInput = $('.todo-title', listItem);
    titleInput.disabled = false;
    titleInput.focus();
    titleInput.setSelectionRange(
      titleInput.value.length,
      titleInput.value.length,
    );
    return titleInput;
  }

  getTitleInputValue(listItem) {
    return $('.todo-title', listItem).value;
  }
}

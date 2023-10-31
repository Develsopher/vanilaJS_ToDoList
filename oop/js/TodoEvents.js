import { $, $$ } from './utils/dom.js';

export default class TodoEvents {
  constructor(app) {
    this.app = app;
    this.initEventListeners();
    console.log('todoEvents init', this);
  }

  initEventListeners() {
    $('#create-todo-btn').addEventListener('click', () => {
      this.app.handleAddTodo();
    });
    $('.list-items').addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        this.app.handleUpdateTodo(e);
        return;
      }
      if (e.target.classList.contains('delete-btn')) {
        this.app.handleDeleteTodo(e);
        return;
      }
    });

    $('.list-items').addEventListener('change', (e) => {
      if (e.target.classList.contains('item-checkbox')) {
        this.app.handleToggleTodo(e);
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
        this.app.currentCategory = newCategory;
        this.app.render();
      });
    });
  }
}

// 상태값 관리 및 비즈니스 로직
export default class TodoState {
  constructor(initialTodos) {
    this.todos = initialTodos || {
      work: [],
      travel: [],
      fitness: [],
      study: [],
      project: [],
    };
  }

  getTodosByCategory(category) {
    return this.todos[category];
  }

  getTodos() {
    return this.todos;
  }

  addTodo(category, newTodo) {
    this.todos[category] = [...this.todos[category], newTodo];
  }

  updateTodo(category, id, newTitle) {
    this.todos[category] = this.todos[category].map((todo, index) => {
      if (index !== id) return todo;
      return { ...todo, title: newTitle, completed: false };
    });
  }

  deleteTodo(category, id) {
    this.todos[category] = this.todos[category].filter(
      (_, index) => index !== id,
    );
  }

  toggleTodo(category, id) {
    this.todos[category] = this.todos[category].map((todo, index) => {
      if (index !== id) return todo;
      return { ...todo, completed: !todo.completed };
    });
  }
}

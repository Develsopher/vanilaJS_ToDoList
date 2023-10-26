// Class Definition
export class Todo {
  constructor(title, completed, category) {
    this.id = new Date().getTime();
    this.title = title;
    this.completed = completed;
    this.category = category || currentCategory;
  }
}

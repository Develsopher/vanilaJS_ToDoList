export default class Todo {
  constructor(title, completed) {
    this.id = new Date().getTime();
    this.title = title;
    this.completed = false;
  }
}

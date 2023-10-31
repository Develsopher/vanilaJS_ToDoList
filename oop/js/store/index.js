export default class Store {
  setLocalStorage(todo) {
    localStorage.setItem('todo', JSON.stringify(todo));
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('todo'));
  }
}

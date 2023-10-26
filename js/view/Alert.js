import { $ } from '../utils/dom.js';

export class Alert {
  show(message, status) {
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
}

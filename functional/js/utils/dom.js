export const $ = (selector, base = document) => base.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

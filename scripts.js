const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    const checkboxes = _items.querySelectorAll('.item__checkbox');
    for (checkbox of checkboxes)
      checkbox.addEventListener('click', finish);

    const itemTexts = _items.querySelectorAll('.item__text');
    for (itemText of itemTexts) {
      itemText.addEventListener('click', edit);
    }

    const removeButtons = _items.querySelectorAll('.item__button');
    for (removeButton of removeButtons) {
      removeButton.addEventListener('click', deleteItem);
    }

    const submitButton = _form.querySelector('.form__button');
    submitButton.addEventListener('click', commit);


  }

  function formHandler(e) {
    e.preventDefault();
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentElement.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const oldValue = e.target.innerText;
    const input = el('input', 'item__text');
    input.setAttribute('value', oldValue);
    input.addEventListener('keyup', function() {
      if (event.keyCode === 13) {
        event.preventDefault();
        const newValue = input.value;
        const span = el('span', 'item__text', edit);
        span.textContent = newValue;
        input.replaceWith(span);
      }
    });

    e.target.replaceWith(input);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const value = e.target.previousElementSibling.value;
    if (value.trim() === '') return;
    add(value);
    e.target.previousElementSibling.value = "";
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const item = el("li", "item");
    const checkbox = el("input", "item__checkbox", finish);
    checkbox.setAttribute('type', 'checkbox');
    item.appendChild(checkbox);
    const textSpan = el("span", "item__text", edit);
    textSpan.textContent = value;
    item.appendChild(textSpan);
    const button = el("button", "item__button", deleteItem);
    button.innerHTML = 'Eyða';
    item.appendChild(button);

    items.appendChild(item);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentElement.remove();
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    element.classList.add(className);
    if (clickHandler)
      element.addEventListener('click', clickHandler);
    return element;
  }

  return {
    init: init
  }
})();

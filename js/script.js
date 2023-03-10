const listItem = '<div class="check"><input type="checkbox"></div><div class="todo-text" id="todo-text"><p>Complete online JS course</p></div><div class="remove"><a href="#" class="cross"><img src="./images/icon-cross.svg" alt=""></a></div>';
const originalDiv = document.getElementById('list-item');
const inputElement = document.querySelector('input[type="text"]');

function addCheckboxEventListener(checkbox) {
  checkbox.addEventListener('change', function() {
    const todoText = checkbox.parentElement.nextElementSibling;
    if (checkbox.checked) {
      todoText.classList.add('completed');
      updateStatus();
    } else {
      todoText.classList.remove('completed');
      updateStatus();
    }
  });
}

function addNote() {
  const userInput = document.getElementById('user-input').value;
  const item = document.createElement('div');
  const todoList = document.getElementById('todo-list');
  const clone = listItem;
  item.setAttribute('class', 'list-item');
  item.setAttribute('draggable','true')
  item.innerHTML = clone;
  item.querySelector('.todo-text p').textContent = userInput;
  todoList.appendChild(item);
  const checkboxes = item.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(addCheckboxEventListener);
  displayAll();
  updateStatus();
  themeToggle();
  removeListItem();

  // Store the updated todo list in local storage
  updateLocalStorage();
}

function updateStatus() {
    const countElement = document.querySelector('.status p');
    const count = document.querySelectorAll('#todo-list .todo-text:not(.completed)').length;
    countElement.textContent = `${count} item${count !== 1 ? 's' : ''} left`;
}

function displayAll() {
    const all = document.querySelectorAll('.list-item');
    const button = document.querySelector("#all");
    const buttonMob = document.querySelector("#all-mob");
    button.addEventListener("click", () => {
      all.forEach((i) => {
        i.style.display = "flex";
      });
    });

    buttonMob.addEventListener("click", () => {
        all.forEach((i) => {
          i.style.display = "flex";
        });
      });
}

  function displayActive() {
    const all = document.querySelectorAll('.list-item');
    all.forEach((item) => {
      if (!item.querySelector('.todo-text').classList.contains('completed')) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

function displayCompleted(){
    const allItems = document.querySelectorAll('#todo-list .list-item');
    allItems.forEach((item) => {
        if (item.querySelector('.todo-text').classList.contains('completed')) {
        item.style.display = 'flex';
        } else {
        item.style.display = 'none';
        }
    });

}

function clearCompleted(){
    const allItems = document.querySelectorAll('#todo-list .list-item');
    allItems.forEach((item) => {
        if (item.querySelector('.todo-text').classList.contains('completed')) {
        item.remove();
        localStorage.removeItem(item);
        }
        updateLocalStorage();
    });
}

function removeListItem(){
    const allItems = document.querySelectorAll('#todo-list .list-item');
    allItems.forEach((item) => {
        item.querySelector(".cross").addEventListener('click', ()=>{
            item.remove();
            updateStatus();
            updateLocalStorage();
        });
    });
}

function updateLocalStorage() {
  const todoListItems = document.getElementById('todo-list').innerHTML;
  localStorage.setItem('todoListItems', todoListItems);
}

function handleSubmit(event) {
event.preventDefault();
const value = input.value.trim();
if (value.length > 0) {
    input.value = '';
}
}

inputElement.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const userInput = inputElement.value.trim();
      if (!userInput) {
        return;
      }
      addNote();
      inputElement.value = '';
    }
  });


window.addEventListener('load', function() {
  const todoList = document.getElementById('todo-list');
  const todoListItems = localStorage.getItem('todoListItems');
  if (todoListItems) {
    todoList.innerHTML = todoListItems;
    const checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(addCheckboxEventListener);
  }
  updateStatus();
})

const activeButton = document.querySelector('#active');
activeButton.addEventListener('click', displayActive);

const completedButton = document.querySelector('#completed');
completedButton.addEventListener('click', displayCompleted);

const removeButton = document.querySelector('#clear-completed');
removeButton.addEventListener('click', clearCompleted);

const removeItem = document.querySelector('.cross');
removeButton.addEventListener('click', removeListItem);

const activeButtonMob = document.querySelector('#active-mob');
activeButtonMob.addEventListener('click', displayActive);

const completedButtonMob = document.querySelector('#completed-mob');
completedButtonMob.addEventListener('click', displayCompleted);

const input = document.querySelector('#user-input');
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);


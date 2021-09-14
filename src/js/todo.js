/* Todo app javascript */
const inputTitle = document.querySelector('#input-title');
const inputDesc = document.querySelector('#input-desc');
const addBtn = document.querySelector('.inputField button');
const todoListContainer = document.querySelector('.todoList');
const todoList = [];

inputTitle.onkeyup = () => {
  const userEnteredTitle = inputTitle.value;
  if (userEnteredTitle.trim() !== 0) {
    addBtn.classList.add('active');
  } else {
    addBtn.classList.remove('active');
  }
};

function renderToDoList(allItems) {
  const pendingTasksNumb = document.querySelector('.pendingTasks');
  let todoString = '';
  allItems.forEach((todoObj, index) => {
    let todoClass = 'todoItem';
    let removeButton = 'removeButton--hidden';
    if (todoObj.done) {
      todoClass += ' todoItem--done';
      removeButton = 'removeButton--appear';
    }
    todoString += `<div class="${todoClass}">
                    <div class="todo__title">${todoObj.title}</div>
                    <div class="todo__desc">${todoObj.desc}</div>
                  </div>
                  <button class="${removeButton}" onclick="removeTodo(${index})">remove</button>`;
  });
  todoListContainer.innerHTML = todoString;
  pendingTasksNumb.textContent = todoList.filter((ele) => ele.done === false).length;
  inputTitle.value = '';
  inputDesc.value = '';
  addClickEventToDoListItem();
}

function addClickEventToDoListItem() {
  const todoItem = document.querySelectorAll('.todoItem');
  const listLength = todoItem.length;
  for (let i = 0; i < listLength; i += 1) {
    todoItem[i].addEventListener('click', () => {
      if (todoList[i].done === true) {
        todoList[i].done = false;
        todoList.unshift(todoList.splice(i, 1)[0]);
        renderToDoList(todoList);
      } else {
        todoList[i].done = true;
        todoList.push(todoList.splice(i, 1)[0]);
        renderToDoList(todoList);
      }
    });
  }
}

addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const todoObj = {
    title: inputTitle.value,
    desc: inputDesc.value,
    done: false,
  };

  if (!inputTitle.value || !inputDesc.value) {
    throw new Error('Please fill in both of the fields!');
  } else {
    todoList.push(todoObj);
    renderToDoList(todoList);
  }
});

function removeTodo(index) {
  todoList.splice(index, 1);
  renderToDoList(todoList);
}

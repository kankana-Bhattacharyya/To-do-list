// Get DOM elements
const addTodoButton = document.getElementById('add-todo');
const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');

// Retrieve todos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to save todos to local storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to render the to-do list
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        
        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = todo;
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';
        
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTodo(index));
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(index));
        
        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);
        
        li.appendChild(todoText);
        li.appendChild(actionsDiv);
        todoList.appendChild(li);
    });
}

// Function to add a new to-do
function addTodo() {
    const todo = newTodoInput.value.trim();
    if (todo !== '') {
        todos.push(todo);
        saveTodos();
        renderTodos();
        newTodoInput.value = '';
    }
}

// Function to edit an existing to-do
function editTodo(index) {
    const newTodo = prompt('Edit your to-do:', todos[index]);
    if (newTodo !== null && newTodo.trim() !== '') {
        todos[index] = newTodo.trim();
        saveTodos();
        renderTodos();
    }
}

// Function to delete a to-do
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Add event listener to the "Add" button
addTodoButton.addEventListener('click', addTodo);

// Render the to-do list on page load
renderTodos();

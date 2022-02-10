//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const searchInput = document.querySelector('.search-input');



//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
searchInput.addEventListener("input", searchSimilarTodos);
//Functions



// class Document {
//     createElement(type) {
//         switch (type) {
//             case 'div': {
//                 return new HTMLDivElement();
//                 break;
//             }
//             case 'div': {
//                 return new HTMLParagraphElement();
//                 break;
//             }
//         }
//     }
// }

// class HTMLDivElement {
//     innerHTML
// }





function addTodo(event) {
    event.preventDefault();
    //Todo DIV

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //  Create li
    const newTodo = document.createElement('li');

    newTodo.innerText = todoInput.value;

    //Your cell is empty
    if (newTodo.innerText === "") {
        return alert("Your cell is empty")
    }
    

    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //console.log(todoList.innerText);


    //Add todo localstorig
    saveLocalTodos(todoInput.value);
    //chache Mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //chache TrASH button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    // if (true) {
    //     alert('already exist');
    //     return;
    // }

    //append to List
    todoList.appendChild(todoDiv);

    //clear to do input value

    todoInput.value = "";

}


function deleteCheck(e) {
    const item = e.target;
    //delete

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //aNIMATION
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    //check Mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (event.target.value) {
            case 'all':
                    todo.style.display = 'flex';
                    break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                            todo.style.display = 'none';
                }
                break;
        }
    })
}


function saveLocalTodos(todo) {
    //CHECK----HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    localArr = todos;
}

function getTodos() {
    //CHECK----HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //CHECK MARK BUTTON
        const comletedButton = document.createElement('button');
        comletedButton.innerHTML = '<i class="fas fa-check"></i>';
        comletedButton.classList.add('complete-btn');
        todoDiv.appendChild(comletedButton);
        //CHECK trash BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //APPENT TO LIST
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    //CHECK----HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function searchSimilarTodos() {
    for (i = 0; i < todoList.childNodes.length; i++) {
        if (!todoList.childNodes[i].firstChild.innerText.includes(searchInput.value)) {
            todoList.childNodes[i].style.display = "none";
        } else {
            todoList.childNodes[i].style.display = "flex";
        }
    }
}
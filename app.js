//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage); //Wenn Document geladen hat

//Functions
function addTodo(event){
    //verhindert, dass es submittet (Seite neu lädt)
    event.preventDefault();

    //Create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //Create Todo Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add Todo to Local Storage
    saveLocalTodos(todoInput.value);

    //Create Check Button
    const checkButton = document.createElement("button");
    checkButton.innerHTML =  '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-button");
    todoDiv.appendChild(checkButton);

    //Create Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML =  '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    //Append to List
    todoList.appendChild(todoDiv);

    //Clear input
    todoInput.value = "";
}

function deleteCheck(event){ //Event ändert sich, worauf man geklickt hat
    const item = event.target;

    //Delete Todo
    if(item.classList[0] === "delete-button"){
        const ganzesTodo = item.parentElement;

        //Animation
        ganzesTodo.classList.add("fall");
        removeTodosFromLocalStorage(ganzesTodo);
        ganzesTodo.addEventListener("transitionend", () => { //Wenn Transition endet => entferne es
            ganzesTodo.remove();
        });
    }

    //Check Mark
    if(item.classList[0] === "check-button"){
        const ganzesTodo = item.parentElement;
        ganzesTodo.classList.toggle("completed");
    }
}

function filterTodo(event){
    const todos = todoList.childNodes; //Alle Todos
    todos.forEach((todo) => {
        switch(event.target.value){ //Was angeklickt wird (all, completed, uncompleted)
            case "all": todo.style.display = "flex";
                break;
            case "completed": 
                if(todo.classList.contains("completed")){ //Alle Todos mit class="completed"
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted": 
                if(!todo.classList.contains("completed")){ //Alle Todos ohne class="uncompleted"
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            
            
        }
    });
}

//Local Storage
function saveLocalTodos(todo){

    //Check---Hey do i already have todos in there?
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //pushe neues Todo rein
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos)); //packe es in Local Storage
}

//Todos von Local Storage holen
function getTodosFromLocalStorage(){

    //Check---Hey do i already have todos in there?
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //Todos in Oberfläche packen
    todos.forEach((todo) => {

        //Create Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");

        //Create Todo Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Create Check Button
        const checkButton = document.createElement("button");
        checkButton.innerHTML =  '<i class="fas fa-check"></i>';
        checkButton.classList.add("check-button");
        todoDiv.appendChild(checkButton);

        //Create Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML =  '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);

        //Append to List
        todoList.appendChild(todoDiv);
    })
}

function removeTodosFromLocalStorage(todo){

    //Check---Hey do i already have todos in there?
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //Entfernen über den Index des Todos
    const todoIndex = todo.children[0].innerText; //Name vom Todo
    todos.splice(todos.indexOf(todoIndex), 1); //splice(index vom Todo, einmal entfernen) = Entfernt es vom Array
    localStorage.setItem("todos", JSON.stringify(todos)); //pack das neue Array in Local Storage
}

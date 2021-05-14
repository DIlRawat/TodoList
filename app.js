//selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//event listners

//Loding everything from the loacal storage
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(event){
    //prevent form from submittion
   event.preventDefault();
    //TODO Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add todo to the local storage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear todod input value
    todoInput.value = "";

}
//Deletes the selected todos once the animation is implementd. 
function deleteCheck(e){
    const item = e.target;

    //Delete the todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        //remove from localstorage
        removeLocalTodos(todo);
        todo.addEventListener("transitioned", function(){
        todo.remove();
        });
       
    }
     //check mark
     if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
     }

}

//Filter todos depending upon completed or not. 
//Can select all, completed, and incompleted and the list shows the respective todos
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                } 
                break;
        }
    });
}
//check if there is todo otherwise create a new array. 
//Also save todos to the local storage
function saveLocalTodos(todo){
    //check if there is todo already

    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
}

//Get todos from the local storge if any
function getTodos(){
        //check if there is todo already

        let todos;
        if(localStorage.getItem("todos") === null){
            todos = [];
        }
        else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.forEach(function(todo){
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            //Create LI
            const newTodo = document.createElement("li");
            newTodo.innerText = todo;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);

            //check mark button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);

            //check trash button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            //append to list
            todoList.appendChild(todoDiv);
        });
}

//Once the todos from local storage are displayed.
//Deleting the todos from local storage as per the users request
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
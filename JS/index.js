import { Todo } from "./classes/todo.js";



//finding elelements
const input = document.querySelector("#todo-input");
const form = document.querySelector("#todo-form");
const lists = document.getElementById("todo-lists");
const message = document.getElementById("todo-message");



//show message 
const showMessage =(text,status) =>
{
    message.textContent = text;
    message.classList.add(`bg-${status}`);
    setTimeout(()=>
    {
        message.textContent = "";
        message.classList.remove(`bg-${status}`);
    },1000);
   
};
//create todo 
const createTodo = (newTodo) =>
{
    const todoElement = document.createElement("li");
    todoElement.id = newTodo.todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
    <span> ${newTodo.todoValue} </span>
    <span> <button class = "btn" id = "deleteButton"> <i class ="fa fa-trash"> </i>
    </button>
    </span>
    `;
    lists.appendChild(todoElement);
    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click",deleteTodo);


};

//deleteTodo
const deleteTodo = (event) =>
{
    const selectedTodo = event.target.parentElement.parentElement.parentElement ;
   
    lists.removeChild(selectedTodo);
    showMessage("todo is deleted","danger");
    const todoId = selectedTodo.id;
    let todos = getTodosFromLocalStorage();
   todos=  todos.filter((todo)=>todo.todoId !=todoId);
   localStorage.setItem("mytodos",JSON.stringify(todos));
};


//get todos from local storage
const getTodosFromLocalStorage = () =>
{
  return  localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
};




//add todo
const addTodO = (event)=>
{
    event.preventDefault();
    const todoValue = input.value;

    //unique todo 
const todoId = Date.now().toString();

const newTodo = new Todo (todoId,todoValue);


createTodo(newTodo);
showMessage("todo is added" ,"success");



//add todo in to local storage 
const todos = getTodosFromLocalStorage();
todos.push(newTodo);
localStorage.setItem("mytodos",JSON.stringify(todos));

input.value = "";
};

//load todos

const LoadTodos = () =>
{
    const todos =  getTodosFromLocalStorage();
    todos.map((todo)=> createTodo(todo));

};

//adding listeners
form.addEventListener("submit",addTodO);
window.addEventListener("DOMContentLoaded",LoadTodos) ;









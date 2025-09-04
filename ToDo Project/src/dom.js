import createProject from "./project";
import createTodo from "./todo";
import {saveToLocalStorage} from "./index";

let selectedProject = null;

export function renderProjects(projects) {
  const projectList = document.querySelector("#project-list");
  projectList.innerHTML = "";

  projects.forEach((project, index) => {
    const projectDiv = document.createElement("div");
    const projectItem = document.createElement("div");
    projectItem.textContent = project.name;
    //projectItem.dataset.index = index;
    const deleteProjectBtn = document.createElement("div");
    deleteProjectBtn.textContent = "🗑️";
    deleteProjectBtn.style.cursor = "pointer";
    deleteProjectBtn.title = "Delete project";
    deleteProjectBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // prevent triggering project click
      projects.splice(index, 1);
      if(selectedProject === project){
        selectedProject = projects[0] || null;
      }
      renderProjects(projects);
      if (selectedProject) {
        renderToDos(selectedProject.todos, projects);
      } else {
        document.querySelector("#todo-list").innerHTML = "";
      }
      saveToLocalStorage(projects);
    });
    projectDiv.addEventListener("click", () => {
      renderToDos(project.todos, projects);
      selectedProject = project;
    })
    projectDiv.appendChild(projectItem);
    projectDiv.appendChild(deleteProjectBtn);
    projectDiv.style.display = "flex";
    projectDiv.style.flexDirection = "row";
    projectDiv.style.justifyContent = "space-between";

    
    
    projectList.appendChild(projectDiv);
  });

  if(selectedProject == null && projects.length > 0){
    selectedProject = projects[0];
  }
}

export function renderToDos(todos, projects) {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  const dialog = document.querySelector("#dialog-container");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogDescription = document.querySelector("#dialog-description");
  const dialogCloseBtn = document.querySelector("#dialog-close-btn");
  const deleteTodoBtn = document.querySelector("#delete-todo");

  todos.forEach((todo, index) => {
    const todoDiv = document.createElement("div");

    const todoCircle = document.createElement("div");
    todoCircle.style.border = "1px solid gray";
    todoCircle.style.borderRadius = "50%";
    todoCircle.style.width = "20px";
    todoCircle.style.height = "20px";
    todoCircle.style.backgroundColor = todo.isChecked ? "blue" : "white";
    todoCircle.addEventListener("click", () => {
      todo.isChecked = !todo.isChecked;
      todoCircle.style.backgroundColor = todo.isChecked ? "blue" : "white";
      saveToLocalStorage(projects);
    });
    todoDiv.appendChild(todoCircle);

    const titleSpan = document.createElement("span");
    titleSpan.textContent = todo.title;
    titleSpan.addEventListener("click", () => {
      dialogTitle.textContent = todo.title;
      dialogDescription.textContent = todo.description;
      deleteTodoBtn.addEventListener("click", () => {
        selectedProject.removeTodo(index);
        renderToDos(selectedProject.todos, projects);
        saveToLocalStorage(projects);
        dialog.close();
      });

      dialog.showModal();
    });
    todoDiv.appendChild(titleSpan);

    todoDiv.style.display = "flex";
    todoDiv.style.alignItems = "center";
    todoDiv.style.gap = "10px";
    todoDiv.style.margin = "10px";

    todoList.appendChild(todoDiv);
  });

  dialogCloseBtn.onclick = () => {
    dialog.close();
  };
}


export function promptAndAddProject(projects){
  const addBtn = document.querySelector("#add-project-btn");
  addBtn.addEventListener("click", () => {
    const name = prompt("Enter project name:");
    if (!name) return;

    const project = createProject(name);
    projects.push(project);

    renderProjects(projects);

    renderToDos(project.todos, projects);
    saveToLocalStorage(projects);
  });
}

export function promptAndAddToDo(projects){
  const addBtn = document.querySelector("#add-todo-btn");
  const dialog = document.querySelector("#dialog-add-todo");
  const dialogCloseBtn = document.querySelector("#close-form-btn");
  const formSubmitBtn = document.querySelector("#form-submit-btn");
  dialogCloseBtn.addEventListener("click", (event) =>{
    const errorDiv = document.querySelector("#form-error");
    errorDiv.style.display = "none";
    dialog.close();
  });
  formSubmitBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    const title = document.querySelector("#todo-title").value;
    const description = document.querySelector("#todo-description").value;
    const errorDiv = document.querySelector("#form-error");
    if (!title) {
      errorDiv.textContent = "Title cannot be empty!";
      errorDiv.style.display = "block";
      return;
    } else {
      errorDiv.style.display = "none";
    }
    const newToDo = createTodo(title, description);
    selectedProject.addTodo(newToDo);
    renderToDos(selectedProject.todos, projects);
    saveToLocalStorage(projects);
    dialog.close();
    dialog.querySelector("form").reset();
  });
  addBtn.addEventListener("click", () => {
    dialog.showModal();
  });
}


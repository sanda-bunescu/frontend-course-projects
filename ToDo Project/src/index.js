import "./style.css";
import createProject from "./project";
import createTodo from "./todo";
import { renderProjects, renderToDos, promptAndAddProject, promptAndAddToDo } from "./dom";

let projects = [];

init();

function init() {
  projects = loadFromLocalStorage();

  renderProjects(projects);

  if (projects.length > 0) {
    renderToDos(projects[0].todos, projects);
  }

  promptAndAddProject(projects);
  promptAndAddToDo(projects);
}

export function saveToLocalStorage(projects) {
  try {
    localStorage.setItem("projects", JSON.stringify(projects));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
}

function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem("projects");

    if (!data) {
      const defaultProject = createProject("Default");
      defaultProject.addTodo(
        createTodo("Sample todo", "This is a default task")
      );
      return [defaultProject];
    }

    const parsed = JSON.parse(data);
    return parsed.map((proj) => {
      const project = createProject(proj.name);
      proj.todos.forEach((todo) => {
        project.addTodo(
          createTodo(todo.title, todo.description, todo.isChecked)
        );
      });
      return project;
    });
  } catch (err) {
    console.error("Error loading from localStorage, resetting:", err);
    const defaultProject = createProject("Default");
    defaultProject.addTodo(
      createTodo("Sample todo", "This is a default task")
    );
    return [defaultProject];
  }
}

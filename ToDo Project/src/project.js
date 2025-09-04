function createProject(name) {
  let todos = [];

  function addTodo(todo) {
    todos.push(todo);
  }

  function removeTodo(index) {
    todos.splice(index, 1);
  }

  return { name, todos, addTodo, removeTodo };
}

export default createProject;

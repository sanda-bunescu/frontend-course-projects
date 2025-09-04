function createTodo(title, description = "", isChecked = false) {
  return { title, description, isChecked };
}

export default createTodo;

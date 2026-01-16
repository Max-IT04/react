export const setTodoInTodos = (todos, newTodoData) => todos.map((todo) => {
  if (todo.id === newTodoData.id) {
    return {
      ...todo, 
      ...newTodoData,
    };
  }
  return todo;
}); 

// export const setTodo = (todos, newTodoData) => 
//   todos.map((todo) => 
//     todo.id === newTodoData.id
//       ? {
//         ...todo,
//         ...newTodoData,
//       }
//       : todo,
//     );
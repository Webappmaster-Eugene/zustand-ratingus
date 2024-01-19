import {Button, Stack} from '@chakra-ui/react';
import {useFilter, useTodos} from "../store.js";
import {Todo} from "./Todo.jsx";
import {FetchTodos} from "./FetchTodos.jsx";

export const TodoList = () => {
  const filter = useFilter((state) => state.getFilter());
  const todos = useTodos((state) => {
    if (filter==='all') {
      return state.todos;
    } else if (filter==='uncompleted') {
      return state.todos.filter((todo) => todo.completed===false);
    } else if (filter==='completed') {
      return state.todos.filter((todo) => todo.completed===true);
    }
  });
  const removeAllTodos = useTodos((state) => state.removeAllTodos);

  return (
    <Stack minH="300px">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
        {todos.length!==0 && <Button onClick={() => removeAllTodos()}>Удалить все задачи</Button>}
    </Stack>
  );
};

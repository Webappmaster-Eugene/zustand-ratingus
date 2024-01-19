import { Text } from '@chakra-ui/react';
import {useTodos} from "../store.js";

export const TotalTodos = () => {
  const todosLength = useTodos((state) => state.todosCount());

  return <Text fontWeight="bold">Total: {todosLength}</Text>;
};

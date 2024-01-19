import {useTodos} from "../store.js";
import {Button, Checkbox, HStack, Text} from "@chakra-ui/react";

export const Todo = ({ id, value, completed }) => {
    const {changeTodo, removeTodo} = useTodos((state) => state);

    return (
        <HStack spacing={4}>
            <Checkbox isChecked={completed} onChange={(e) => changeTodo(id)}/>
            <Text>{value}</Text>
            <Button onClick={(e) => removeTodo(id)}>Del</Button>
        </HStack>
    );
};
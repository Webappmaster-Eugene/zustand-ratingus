import { Button, } from '@chakra-ui/react';
import {useTodos} from "../store.js";
import {useShallow} from "zustand/react/shallow";

export const FetchTodos = () => {
    const {
        loading,
        error,
        createAsyncTodos
    } = useTodos(useShallow((state) => (
    {
        loading: state.loading,
        error: state.error,
        createAsyncTodos: state.createAsyncTodos
    })));

    console.log('rerender FetchTodos')
    return (
        !loading && <Button onClick={() => createAsyncTodos()}>{error ? {error} : 'Sent'}</Button>
    );
};

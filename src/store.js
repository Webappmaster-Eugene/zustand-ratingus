import { create } from 'zustand'
import { nanoid } from 'nanoid'
import {createJSONStorage, devtools, persist} from "zustand/middleware";

export const useTodos = create(persist((set, get) => ({
    todos: [{value: 'Gulat', completed: true, id: 0}, {value: 'Kushat', completed: false, id: 1}, {value: 'Spat', completed: false, id: 2}],
    loading: false,
    error: null,
    todosCount: () => get().todos.length,
    addTodo: (newToDo) => {
        const finalToDo = {id: nanoid(), value: newToDo, completed: false};
        set((state) => ({ todos: [...get().todos, finalToDo] }))
    },
    removeTodo: (idToDo) => set((state) => ({todos: get().todos.filter((todo) => {
         return todo.id !== idToDo
    }) })),
    changeTodo: (idToDo) =>  {
        set((state) => ({ todos: get().todos.map((todo) => {

                if (todo.id === idToDo) {
                    todo.completed = !todo.completed;
                }
                return todo;
        }) }))
    },
    removeAllTodos: () => set({ todos: [] }),
    createAsyncTodos: async () => {
        set({loading: true})
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

            if (!res.ok) throw new Error('Ошибка при запросе к jsonplaceholder')

            const todosAll = await res.json();
            const todosFinal = todosAll.map((todo) => ({value: todo.title, ...todo}))
            set({error: null, todos: todosFinal})
        } catch (error) {
            set({error: error.message});
            console.log(error);
        } finally{
            set({loading: false})
        }
    }
}),
    {storage: createJSONStorage(() => localStorage)},
));

export const useFilter = create((set, get) => ({
    filter: 'all',
    getFilter: () => {
        return get().filter;
    },
    setFilter: (filterName) => {
        set(state => ({filter: filterName}));
    }
}))
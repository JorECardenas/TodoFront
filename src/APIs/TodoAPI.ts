import {api} from "./AxiosConfig";
import {FilterModel} from "../Models/FilterModel";
import {TodoItemDTO} from "../Models/TodoItemDTO";


export const TodoAPI = {
    Get: async function getTodos(params: FilterModel) {
        return api.request({
            url: '/api/todos',
            method: "GET",
            params: {
                page: params.page,
                textFilter: params.textFilter,
                sortBy: params.sortBy?.join(","),
                priorityOrder: params.priorityOrder,
                dueDateOrder: params.dueDateOrder,
                priorityFilter: params.priorityFilter?.join(","),
                stateFilter: params.stateFilter,
            }
        });
    },
    GetById: async function getTodoById(id: string) {
        return api.request({
            url: `/api/todos/${id}`,
            method: "GET"
        });
    },
    Create: async function createToto(body: TodoItemDTO) {
        return api.request({
            url: '/api/todos',
            method: "POST",
            data: body,
        });
    },
    Update: async function updateTodo(id: string, body: TodoItemDTO) {
        await api.request({
            url: `/api/todos/${id}`,
            method: "POST",
            data: body
        });
    },
    Delete: async function deleteTodo(id: string) {
        await api.request({
            url: `/api/todos/${id}`,
            method: "DELETE"
        });
    },
    MarkAsDone: async function todoDone(id: string) {
        await api.request({
            url: `/api/todos/${id}/done`,
            method: "POST"
        });
    },
    MarkAsUndone: async function todoUndone(id: string) {
        await api.request({
            url: `/api/todos/${id}/undone`,
            method: "POST"
        });
    },
    MarkAllDone: async function allTodosDone() {
        await api.request({
            url: `/api/todos/all/done`,
            method: "POST"
        });
    },
    MarkAllUndone: async function allTodosUndone() {
        await api.request({
            url: `/api/todos/all/undone`,
            method: "POST"
        });
    }

}
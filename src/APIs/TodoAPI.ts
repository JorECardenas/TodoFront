import {api} from "./config";
import {FilterModel} from "../Models/FilterModel";
import {TodoItemDTO} from "../Models/TodoItemDTO";


export const TodoAPI = {
    Get: async function getTodos(params: FilterModel) {
        const response = api.request({
            url: '/api/todos',
            method: "GET",
            params:{
                page: params.page,
                textFilter: params.textFilter,
                sortBy: params.sortBy,
                sortOrder: params.sortOrder,
                priorityFilter: params.priorityFilter,
                stateFilter: params.stateFilter,
            }
        })

        return response;
    },
    GetById: async function getTodoById(id: string) {
        const response = api.request({
            url: `/api/todos/${id}`,
            method: "GET"
        })

        return response;
    },
    Create: async function createToto(body: TodoItemDTO) {
        const response = api.request({
            url: '/api/todos',
            method: "POST",
            data: body,
        })

        return response;
    },
    Update: async function updateTodo(id: string, body: TodoItemDTO) {
        const response = api.request({
            url: `/api/todos/${id}`,
            method: "POST",
            data: body
        })
    },
    Delete: async function deleteTodo(id: string) {
        const response = api.request({
            url: `/api/todos/${id}`,
            method: "DELETE"
        })
    },
    MarkAsDone: async function todoDone(id: string) {
        const response = api.request({
            url: `/api/todos/${id}/done`,
            method: "POST"
        })
    },
    MarkAsUndone: async function todoUndone(id: string) {
        const response = api.request({
            url: `/api/todos/${id}/undone`,
            method: "POST"
        })
    },
    MarkAllDone: async function allTodosDone() {
        const response = api.request({
            url: `/api/todos/all/done`,
            method: "POST"
        })


    },
    MarkAllUndone: async function allTodosUndone() {
        const response = api.request({
            url: `/api/todos/all/undone`,
            method: "POST"
        })
    }

}
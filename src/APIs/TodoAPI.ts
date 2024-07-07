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
    Create: async function getTodos(body: TodoItemDTO) {
        const response = api.request({
            url: '/api/todos',
            method: "POST",
            data: body,
        })

        return response;
    }
}
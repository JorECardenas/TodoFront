import {TodoItem} from "./TodoItem";


interface ParameterData {
    textFilter?: string;
    priorityFilter?: string[];
    stateFilter?: string;
    sortBy?: string[];
    sortOrder?: string;
}

export interface PaginatedDataDTO {
    content: TodoItem[];
    parameters: ParameterData;
    currentPage: number;
    itemsInPage: number;
    totalPages: number;
    totalItems: number;
    firstPage: boolean;
    lastPage: boolean;
}
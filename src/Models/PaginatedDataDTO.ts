import {TodoItem} from "./TodoItem";


export interface ParameterData {
    textFilter?: string;
    priorityFilter?: string[];
    stateFilter?: string;
    sortBy?: string[];
    sortOrder?: string;
}

export interface AverageData {
    generalAverage: number;
    lowAverage: number;
    mediumAverage: number;
    highAverage: number;
}

export interface PaginatedDataDTO {
    content: TodoItem[];
    parameters: ParameterData;
    averageData: AverageData;
    currentPage: number;
    itemsInPage: number;
    totalPages: number;
    totalItems: number;
    firstPage: boolean;
    lastPage: boolean;
    allDone: boolean;
    completedItems: number;
}
export interface FilterModel {
    page: number;
    textFilter?: string;
    priorityFilter?: string[];
    stateFilter?: string;
    sortBy?: string[];
    sortOrder?: string;
}
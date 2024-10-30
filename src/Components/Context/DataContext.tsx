import {createContext, ReactNode, useState} from "react";
import {TodoAPI} from "../../APIs/TodoAPI";
import {FilterModel} from "../../Models/FilterModel";
import {PaginatedDataDTO} from "../../Models/PaginatedDataDTO";



export interface DataContextType {
    data: PaginatedDataDTO;
    setData: (data: PaginatedDataDTO) => void;
    reloadData: (params: FilterModel) => void;
}

export const defaultData:PaginatedDataDTO = {
    content: [],
    parameters: {
        textFilter: "",
        priorityFilter: [],
        stateFilter: "",
        sortBy: undefined,
        sortOrder: undefined,
    },
    averageData: {
        generalAverage: 0,
        lowAverage: 0,
        mediumAverage: 0,
        highAverage: 0,
    },
    currentPage: 1,
    itemsInPage: 0,
    totalItems: 0,
    totalPages: 0,
    firstPage: false,
    lastPage: false,
    allDone: false,
    completedItems: 0,
}


export const DataContext = createContext<DataContextType>({
    data: defaultData,
    setData:(data:PaginatedDataDTO) => {},
    reloadData: (params: FilterModel) => {},
})


export default function DataContextProvider({ children }: { children: ReactNode }) {

    const [data, setData] = useState<PaginatedDataDTO>(defaultData);

    const reloadData = (params: FilterModel) => {
        TodoAPI.Get(params).then((res) => {
            //console.log(res);
            setData(res.data);
        })
    }


    return (
        <DataContext.Provider value={{data, setData, reloadData}}>
            {children}
        </DataContext.Provider>
    )








}
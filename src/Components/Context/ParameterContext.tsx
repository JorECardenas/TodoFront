import {FilterModel} from "../../Models/FilterModel";
import {createContext} from "react";
import {PropsWithChildren, useState} from "react";


const defaultParameters: FilterModel = {
    page: 1,
    textFilter: "",
    priorityFilter: [],
    stateFilter: "",
    sortBy: undefined,
    priorityOrder: undefined,
    dueDateOrder: undefined,
}

export interface ParameterType {
    parameters: FilterModel;
    setParameters: (parameter: FilterModel) => void;
    resetParameters: () => void;
}

export const ParameterContext= createContext<ParameterType>({
    parameters: defaultParameters,
    setParameters: () => {},
    resetParameters: () => {}
});

export default function ParameterContextProvider({children}: PropsWithChildren) {

    const [filter, setFilter] = useState<FilterModel>(defaultParameters);

    const resetFilters = () => {
        setFilter({
            ...filter,
            textFilter:"",
            priorityFilter:[],
            stateFilter:"",
        });
    }



    return (
        <ParameterContext.Provider value={{parameters: filter, setParameters: setFilter, resetParameters: resetFilters}}>
            {children}
        </ParameterContext.Provider>
    )


}
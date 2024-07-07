import {FilterModel} from "../../Models/FilterModel";
import {createContext} from "react";
import {PropsWithChildren, useState} from "react";


const defaultParameters = {
    page: 1,
    textFilter: "",
    priorityFilter: [],
    stateFilter: "",
    sortBy: undefined,
    sortOrder: undefined,
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

    const resetFilters = () => {setFilter(defaultParameters)}



    return (
        <ParameterContext.Provider value={{parameters: filter, setParameters: setFilter, resetParameters: resetFilters}}>
            {children}
        </ParameterContext.Provider>
    )


}
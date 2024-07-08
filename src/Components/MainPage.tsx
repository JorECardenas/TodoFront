import FilterComponent from "./FilterComponent";
import TodoListComponent from "./TodoListComponent";
import ParameterContextProvider from "./Context/ParameterContext";
import DataContextProvider from "./Context/DataContext";
import AverageDataComponent from "./AverageDataComponent";




export default function MainPage() {

    return (
        <DataContextProvider>
            <ParameterContextProvider>
                <div className={"container p-5 flex flex-col items-center justify-center gap-4"}>
                    <FilterComponent />
                    <TodoListComponent/>
                    <AverageDataComponent/>
                </div>
            </ParameterContextProvider>
        </DataContextProvider>
    )



}


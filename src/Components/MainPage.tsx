import FilterComponent from "./FilterComponent";
import TodoListComponent from "./TodoListComponent";
import ParameterContextProvider from "./Context/ParameterContext";




export default function MainPage() {



    return (
        <ParameterContextProvider>
            <div className={"container p-5 flex flex-col items-center justify-center gap-4"}>
                <FilterComponent />
                <TodoListComponent/>
            </div>
        </ParameterContextProvider>
    )



}


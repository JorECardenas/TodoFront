import {DataContext, DataContextType, defaultData} from "./Context/DataContext";
import {render, screen} from "@testing-library/react";
import DataTable from "./DataTable";



const MockDataContext : DataContextType = {
    data: {
        ...defaultData,
        content: [
            {
                id: "testId",
                text: "test text",
                creationDate: new Date(),
                dueDate: new Date(),
                done: true,
                doneDate: new Date(),
                priority: "High",
            },
        ]
    },
    setData: () => {},
    reloadData: () => {}
}


test("Data table rendering correctly", async () => {

    const reload = () => {}

    render(
        <DataContext.Provider value={MockDataContext}>
            <DataTable reload={reload}/>
        </DataContext.Provider>
    )

    const dataText = screen.getByText("test text")

    expect(dataText).toBeInTheDocument()





})
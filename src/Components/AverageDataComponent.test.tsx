import {DataContext, DataContextType, defaultData} from "./Context/DataContext";
import {render, screen} from "@testing-library/react";
import DataTable from "./DataTable";
import AverageDataComponent from "./AverageDataComponent";


const MockDataContext : DataContextType = {
    data: {
        ...defaultData,
        averageData: {
            generalAverage: 0,
            lowAverage: 0,
            mediumAverage: 0,
            highAverage: 0,
        }
    },
    setData: () => {},
    reloadData: () => {}
}

test("Average data component renders correctly", async () => {

    render(
        <DataContext.Provider value={MockDataContext}>
            <AverageDataComponent/>
        </DataContext.Provider>
    )

    const generalAverage = screen.getByText("General Average:")

    expect(generalAverage).toBeInTheDocument()


})
import FilterComponent from "./FilterComponent";
import TodoListComponent from "./TodoListComponent";
import ParameterContextProvider from "./Context/ParameterContext";
import DataContextProvider from "./Context/DataContext";
import AverageDataComponent from "./AverageDataComponent";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';





export default function MainPage() {

    return (
        <DataContextProvider>
            <ParameterContextProvider>
                <div className={"container p-5 flex flex-col items-center justify-center gap-4"}>

                    <div className={"w-full"}>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h1>Filter section</h1>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FilterComponent />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <h1>Completion data</h1>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AverageDataComponent/>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                    <TodoListComponent/>
                </div>
            </ParameterContextProvider>
        </DataContextProvider>
    )



}


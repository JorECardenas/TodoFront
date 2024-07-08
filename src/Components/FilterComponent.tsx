import {Button, InputLabel, TextField} from "@mui/material";
import {PriorityLevelOption, StateOption} from "../Models/enums"
import {MultiSelect, Option} from "react-multi-select-component";
import {useContext, useEffect, useState} from "react";
import {ParameterContext, ParameterType} from "./Context/ParameterContext";
import {DataContext} from "./Context/DataContext";


export default function FilterComponent() {

    const context = useContext<ParameterType>(ParameterContext);

    const {parameters, setParameters, resetParameters} = context;
    const { reloadData } = useContext(DataContext);

    const [priorityLevel, setPriorityLevel] = useState<Option[]>([]);
    const [state, setState] = useState<Option[]>([]);


    useEffect(() => {

        reloadData(parameters)

    }, [parameters]);


    const reset = () => {
        setPriorityLevel([]);
        setState([])

        resetParameters()


    }

    const handlePriorityChange = (event:Option[]) => {

        //console.log(event)

        setPriorityLevel(event)


    }

    const handleStateChange = (event: Option[]) => {
        console.log(event)

        setState(event)
    }

    const SubmitSearch = () => {

        console.log("Sumbitted: ");

        let stateParam = ""

        switch (state.length) {
            case 0: {
                break
            }
            case 1: {
                if(state.includes(StateOption[0])){ // done
                    stateParam = "done"
                }
                if(state.includes(StateOption[1])){ // undone
                    stateParam = "undone"
                }
                break
            }
            case 2: {
                break
            }
        }


        setParameters({
            ...parameters,
            priorityFilter: priorityLevel.map((item) => item.value),
            stateFilter: stateParam,
        })


        reloadData(parameters)


    }



    return (
        <div className={"container flex flex-col gap-2 border-2 border-gray-200 p-4"}>

            <InputLabel htmlFor={"textFilter"}>Name</InputLabel>
            <TextField id={"textFilter"}
                       value={parameters.textFilter}
                       onChange={(e) => setParameters({...parameters, textFilter: e.target.value})}/>

            <InputLabel htmlFor={"priorityFilter"}>Priority</InputLabel>
            <MultiSelect options={PriorityLevelOption}
                         value={priorityLevel}
                         onChange={handlePriorityChange}
                         labelledBy={"Select priorities"}
                         overrideStrings={{
                             "allItemsAreSelected": "All, High, Medium, Low",
                         }}
            />

            <InputLabel htmlFor={"stateFilter"}>State</InputLabel>
            <MultiSelect options={StateOption}
                         value={state}
                         onChange={handleStateChange}
                         labelledBy={"Select state"}
                         overrideStrings={{
                             "allItemsAreSelected": "All, Done, Undone",
                         }}
            />

            <div className={"flex flex-row gap-2 justify-end"}>
                <Button onClick={reset}>Reset Filters</Button>
                <Button onClick={SubmitSearch}>Search</Button>
            </div>

        </div>
    )


}
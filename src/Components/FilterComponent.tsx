import {Button, InputLabel, TextField} from "@mui/material";
import {PriorityLevelOption, StateOption} from "../Models/enums"
import {useState} from "react";
import {MultiSelect} from "react-multi-select-component";


export default function FilterComponent() {

    const [PriorityFilter, setPriorityFilter] = useState([]);
    const [StateFilter, setStateFilter] = useState([])
    const [TextFilter, setTextFilter] = useState("");


    const SubmitSearch = () => {

        console.log("Sumbitted: ");
        console.log(StateFilter);
        console.log(TextFilter);
        console.log(PriorityFilter);


    }



    return (
        <div className={"container flex flex-col gap-2 border-2 border-black p-4"}>

            <InputLabel htmlFor={"textFilter"}>Name</InputLabel>
            <TextField id={"textFilter"} onChange={(e) => setTextFilter(e.target.value)}/>

            <InputLabel htmlFor={"priorityFilter"}>Priority</InputLabel>
            <MultiSelect options={PriorityLevelOption}
                         value={PriorityFilter}
                         onChange={setPriorityFilter}
                         labelledBy={"Select priorities"}
                         overrideStrings={{
                             "allItemsAreSelected": "All, High, Medium, Low",
                         }}
            />

            <InputLabel htmlFor={"stateFilter"}>Priority</InputLabel>
            <MultiSelect options={StateOption}
                         value={StateFilter}
                         onChange={setStateFilter}
                         labelledBy={"Select state"}
                         overrideStrings={{
                             "allItemsAreSelected": "All, Done, Undone",
                         }}
            />

            <Button onClick={SubmitSearch}>Search</Button>

        </div>
    )


}
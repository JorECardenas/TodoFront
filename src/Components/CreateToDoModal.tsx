import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField} from "@mui/material";
import {TodoAPI} from "../APIs/TodoAPI";
import {useState} from "react";
import {TodoItemDTO} from "../Models/TodoItemDTO";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const PriorityOptions = [
    "High",
    "Medium",
    "Low"
]



interface CreateToDoModalProps {
    open:boolean
    setClose:() => void
}

const defaultItem = {
    text: undefined,
    done: false,
    dueDate: new Date(),
    priority: undefined,
    creationDate: new Date(),
}
export default function CreateToDoModal({open, setClose}: CreateToDoModalProps) {

    const [item, setItem] = useState<TodoItemDTO>(
        defaultItem
    );

    const handleSubmit = () => {
        console.log(item);

        TodoAPI.Create(item)

        setItem(defaultItem);

        setClose()
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

        <Dialog open={open} onClose={setClose}>
            <DialogTitle>Create ToDo</DialogTitle>
            <DialogContent className={"flex flex-col gap-2 p-3"}>

                <TextField label={"To Do Description"}
                           placeholder={"Description"}
                           value={item.text ?? ""}
                           id={"text"}
                           onChange={(e) =>
                               setItem({...item, text: e.target.value})}
                />

                <DateTimePicker label={"Due Date"}
                                onChange={(e) =>
                                    e !== null ? setItem({...item, dueDate: e.toDate()}) : undefined}/>

                <Select id={"priority"}
                        value={item.priority !== undefined ? item.priority : ""}
                        label={"Priority Level"}
                        onChange={(e) =>
                            setItem({...item, priority: e.target.value})}
                >
                    <MenuItem value="" disabled>Select</MenuItem>
                    {PriorityOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>






            </DialogContent>
            <DialogActions>
                <Button onClick={setClose}>Close</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>

        </Dialog>
        </LocalizationProvider>
    )

}

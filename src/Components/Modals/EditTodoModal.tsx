import {TodoItem} from "../../Models/TodoItem";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {TodoItemDTO} from "../../Models/TodoItemDTO";
import {TodoAPI} from "../../APIs/TodoAPI";

const PriorityOptions = [
    "High",
    "Medium",
    "Low"
]

interface editTodoModalProps {
    open: boolean
    setClose: () => void
    item: TodoItem
    reload: () => void
}


export default function EditTodoModal({open, setClose, item, reload}: editTodoModalProps) {

    const [dto, setDto] = useState<TodoItemDTO>({
        text: item.text,
        priority: item.priority,
        dueDate: item.dueDate,
        creationDate: item.creationDate,
        done: item.done,
    });

    useEffect(() => {
        setDto({
            text: item.text,
            priority: item.priority,
            dueDate: item.dueDate,
            creationDate: item.creationDate,
            done: item.done,
        })


    }, [item])


    const handleClose = () => {

        setClose()
    }

    const handleSubmit = () => {

        TodoAPI.Update(item.id, dto).then(() => {
            reload()
        })

        setClose()

    }



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Dialog open={open}
                    onClose={setClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleSubmit,
                        sx:{
                           width:"100%" ,
                        }
                    }}
            >
                <DialogTitle>Create To Do</DialogTitle>
                <DialogContent style={{padding:'2%'}}>
                    <FormControl fullWidth className={"flex flex-col gap-5 p-3 mt-4"}>
                        {/*<InputLabel htmlFor="text">Description</InputLabel>*/}
                        <TextField label={"To Do Description"}
                                   placeholder={"Description"}
                                   value={dto.text ?? ""}
                                   id={"text"}
                                   onChange={(e) =>
                                       setDto({...dto, text: e.target.value})}
                                   required

                        />


                        {/*<InputLabel htmlFor={"priority"}>Priority</InputLabel>*/}
                        <TextField id={"priority"}
                                value={dto.priority !== undefined ? dto.priority : ""}
                                label={"Priority Level"}
                                onChange={(e) =>
                                    setDto({...dto, priority: e.target.value})}
                                required select
                        >
                            {PriorityOptions.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </TextField>

                        <DateTimePicker label={"Due Date"}
                                        value={dayjs(dto.dueDate)}
                                        onChange={(e) =>
                                            e !== null ? setDto({...dto, dueDate: e.toDate()}) : undefined}
                                        minDate={dayjs(new Date())}
                        />



                    </FormControl>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type={"submit"}>Edit</Button>
                </DialogActions>

            </Dialog>
        </LocalizationProvider>
    )



}
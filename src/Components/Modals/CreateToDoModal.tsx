import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {TodoAPI} from "../../APIs/TodoAPI";
import {useState} from "react";
import {TodoItemDTO} from "../../Models/TodoItemDTO";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import OutlinedInput from '@mui/material/OutlinedInput';


const PriorityOptions = [
    "High",
    "Medium",
    "Low"
]



interface CreateToDoModalProps {
    open:boolean
    setClose:() => void
    reload: () => void
}

const defaultItem = {
    text: undefined,
    done: false,
    dueDate: undefined,
    priority: undefined,
    creationDate: new Date(),
}
export default function CreateToDoModal({open, setClose, reload}: CreateToDoModalProps) {

    const [item, setItem] = useState<TodoItemDTO>(
        defaultItem
    );

    const handleSubmit = () => {
        console.log(item);

        TodoAPI.Create(item).then((result) => {
            reload()
            setItem(defaultItem);
        })



        setClose()
    }

    const handleClose = () => {

        setItem(defaultItem);

        setClose();


    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Dialog open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleSubmit,
                    }}
                    className={"min-w-80"}
            >
                <DialogTitle>Create To Do</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth className={"flex flex-col gap-5 p-3 min-h-80"}>
                        <TextField label={"To Do Description"}
                                   placeholder={"Description"}
                                   value={item.text ?? ""}
                                   id={"text"}
                                   type={"text"}
                                   inputProps={{
                                       maxLength: 120,
                                   }}
                                   multiline={true}
                                   onChange={(e) =>
                                       setItem({...item, text: e.target.value})}
                                   required
                        />

                        <TextField id={"priority"}
                                   label={"Priority Level"}
                                   value={item.priority !== undefined ? item.priority : ""}
                                   onChange={(e) =>
                                       setItem({...item, priority: e.target.value})}
                                   required
                                   select
                        >
                            {PriorityOptions.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </TextField>

                        <DateTimePicker label={"Due Date"}
                                        onChange={(e) =>
                                            e !== null ? setItem({...item, dueDate: e.toDate()}) : undefined}
                                        minDate={dayjs(new Date())}
                        />



                    </FormControl>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type={"submit"}>Create</Button>
                </DialogActions>

            </Dialog>
        </LocalizationProvider>
    )

}

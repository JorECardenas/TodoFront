import {
    Button,
    ButtonGroup,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import dayjs from "dayjs";
import {TodoItem} from "../Models/TodoItem";
import {TodoAPI} from "../APIs/TodoAPI";
import {useState} from "react";


interface DataTableProps {
    data: TodoItem[];
    reload: () => void;
}

export default function DataTable({data, reload}: DataTableProps){

    const [checked, setChecked] = useState(false);

    const handleGeneralChange = (done: boolean) => {
        setChecked(!checked);

        if(done){
            TodoAPI.MarkAllUndone()

        }else {
            TodoAPI.MarkAllDone()
        }

        reload();


    }

    const handleIndividualCheck = (item: TodoItem) => {

        if(item.done){

            TodoAPI.MarkAsUndone(item.id)
        } else {
            TodoAPI.MarkAsDone(item.id)
        }

        reload()


    }



    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><Checkbox checked={checked} onChange={() => handleGeneralChange(checked)}/></TableCell>
                        <TableCell>Text</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, key) => (
                        <TableRow key={key}>
                            <TableCell><Checkbox checked={item.done} onChange={() => handleIndividualCheck(item)}/></TableCell>
                            <TableCell>{item.text}</TableCell>
                            <TableCell>{item.priority}</TableCell>
                            <TableCell>{dayjs(item.dueDate).format("DD/MM/YYYY")}</TableCell>
                            <TableCell>
                                <ButtonGroup variant={"contained"}>
                                    <Button>Delete</Button>
                                    <Button>Edit</Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    )



}
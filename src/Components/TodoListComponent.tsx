import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import CreateToDoModal from "./CreateToDoModal";
import {TodoItem} from "../Models/TodoItem";
import dayjs from "dayjs";
import {TodoAPI} from "../APIs/TodoAPI";

export default function TodoListComponent() {

    const [openModal, setOpenModal] = useState(false);

    const openTodoModal = () => { setOpenModal(true); };
    const closeTodoModal = () => { setOpenModal(false); };

    const [data, setData] = useState<TodoItem[]>([])

    useEffect(() => {
        TodoAPI.Get({
            page: 1,
            textFilter:undefined,
            priorityFilter: [],
            stateFilter:undefined,
            sortBy: undefined,
            sortOrder: undefined,
        }).then((res) => {
            console.log(res);
            setData(res.data.content);
        })
    }, [])


    return (
        <div className={"container"}>

            <Button onClick={openTodoModal}>+ Create ToDo</Button>
            <CreateToDoModal open={openModal} setClose={closeTodoModal} />


            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>O</TableCell>
                            <TableCell>Text</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, key) => (
                            <TableRow key={key}>
                                <TableCell>O</TableCell>
                                <TableCell>{item.text}</TableCell>
                                <TableCell>{item.priority}</TableCell>
                                <TableCell>{dayjs(item.dueDate).format("DD/MM/YYYY")}</TableCell>
                                <TableCell>
                                    <Button>Delete</Button>
                                    <Button>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>









        </div>
    )


}
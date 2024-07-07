import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import CreateToDoModal from "./CreateToDoModal";
import dayjs from "dayjs";
import {TodoAPI} from "../APIs/TodoAPI";
import {ParameterContext, ParameterType} from "./Context/ParameterContext";
import {PaginatedDataDTO} from "../Models/PaginatedDataDTO";
import {DataContext, DataContextType} from "./Context/DataContext";




export default function TodoListComponent() {

    const [openModal, setOpenModal] = useState(false);

    const {data, setData, reloadData } = useContext<DataContextType>(DataContext);
    const {parameters} = useContext<ParameterType>(ParameterContext);

    const openTodoModal = () => { setOpenModal(true); };
    const closeTodoModal = () => { setOpenModal(false); reloadData(parameters); };



    useEffect(() => {
        reloadData(parameters)


    }, [])


    return (
        <div className={"container"}>

            <Button onClick={openTodoModal}>+ Create To Do</Button>
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
                        {data.content.map((item, key) => (
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
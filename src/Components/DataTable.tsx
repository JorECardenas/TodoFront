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
import {ReactElement, useContext, useEffect, useState} from "react";
import DeleteModal from "./Modals/DeleteModal";
import EditTodoModal from "./Modals/EditTodoModal";
import {ParameterContext} from "./Context/ParameterContext";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import {DataContext} from "./Context/DataContext";

interface DataTableProps {
    reload: () => void;
}

export default function DataTable({reload}: DataTableProps){

    const {parameters, setParameters} = useContext(ParameterContext)
    const {data} = useContext(DataContext);

    const [checked, setChecked] = useState(false);

    useEffect(() => {

        setChecked(data.allDone);

    }, [data.allDone])

    const [selectedItem, setSelectedITem] = useState<TodoItem>({} as TodoItem)


    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<boolean>(false)

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

    const openDeleteModal = () => {setDeleteModal(true)}
    const closeDeleteModal = () => {setDeleteModal(false)}

    const openEditModal = () => {setEditModal(true)}
    const closeEditModal = () => {setEditModal(false)}

    const handleSelectDeleteItem = (item: TodoItem) => {
        setSelectedITem(item)

        openDeleteModal()
    }

    const handleEditItem = (item : TodoItem) => {
        setSelectedITem(item)

        openEditModal()
    }


    const [priorityOrder, setPriorityOrder] = useState<string>("")
    const [duedateOrder, setDuedateOrder] = useState<string>("")

    const getIcon = (order: string): ReactElement => {

        switch (order) {
            case "DESC": {
                return (<ArrowUpwardIcon/>)
            }
            case "ASC": {
                return (<ArrowDownwardIcon/>)
            }
            case "":
                return (<SwapVertIcon/>)
        }

        return <SwapVertIcon/>



    }

    useEffect(() => {
        if(priorityOrder !== "" && duedateOrder !== ""){
            setParameters({...parameters,
                priorityOrder: priorityOrder,
                dueDateOrder: duedateOrder,
                sortBy:["priority","duedate"]
            })
        }
        else if(priorityOrder === "" && duedateOrder !== ""){
            setParameters({...parameters,
                priorityOrder: priorityOrder,
                dueDateOrder: duedateOrder,
                sortBy:["duedate"]
            })
        }
        else if(priorityOrder !== "" && duedateOrder === ""){
            setParameters({...parameters,
                priorityOrder: priorityOrder,
                dueDateOrder: duedateOrder,
                sortBy:["priority"]
            })
        }
        else if(priorityOrder !== "" && duedateOrder === ""){
            setParameters({...parameters,
                priorityOrder: priorityOrder,
                dueDateOrder: duedateOrder,
                sortBy:[]
            })
        }



        reload()
    }, [priorityOrder, duedateOrder]);

    const getNextOrder = (order: string, setOrder: (e: string) => void, priority: boolean): void => {

        switch (order) {
            case "": {
                setOrder("DESC")
                break
            }
            case "DESC": {
                setOrder("ASC")
                break
            }
            case "ASC":{
                setOrder("")
                break
            }

        }
    }



    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Checkbox checked={checked} onChange={() => handleGeneralChange(checked)}/></TableCell>
                            <TableCell>Text</TableCell>
                            <TableCell>
                                <button onClick={() => getNextOrder(priorityOrder, setPriorityOrder, true)}>
                                    Priority{getIcon(priorityOrder)}
                                </button>
                            </TableCell>
                            <TableCell>
                                <button onClick={() => getNextOrder(duedateOrder, setDuedateOrder, false)}>
                                    Due Date{getIcon(duedateOrder)}
                                </button>
                            </TableCell>
                            <TableCell>Completion Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.content.map((item, key) => (
                            <TableRow key={key}>
                                <TableCell><Checkbox checked={item.done} onChange={() => handleIndividualCheck(item)}/></TableCell>
                                <TableCell>{item.text}</TableCell>
                                <TableCell>{item.priority}</TableCell>
                                <TableCell>{dayjs(item.dueDate).isValid() ? dayjs(item.dueDate).format("DD/MM/YYYY hh:mm") : "No due date"}</TableCell>
                                <TableCell>{dayjs(item.doneDate).isValid() ? dayjs(item.doneDate).format("DD/MM/YYYY hh:mm") : "Not completed yet"}</TableCell>
                                <TableCell>
                                    <ButtonGroup variant={"contained"}>
                                        <Button onClick={() => handleSelectDeleteItem(item)}>Delete</Button>
                                        <Button onClick={() => handleEditItem(item)}>Edit</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            <DeleteModal open={deleteModal} setClose={closeDeleteModal} item={selectedItem} reload={reload}/>
            <EditTodoModal open={editModal} setClose={closeEditModal} item={selectedItem} reload={reload}/>


        </>


    )



}
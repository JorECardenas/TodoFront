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
    TableRow,
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
            TodoAPI.MarkAllUndone(parameters).then((result) => {reload()})

        }else {
            TodoAPI.MarkAllDone(parameters).then((result) => {reload()})
        }

        //reload();


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
                return (<ArrowDownwardIcon/>)
            }
            case "ASC": {
                return (<ArrowUpwardIcon/>)
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
        else if(priorityOrder === "" && duedateOrder === ""){
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

    const getTextStyle  = (state: boolean) => {


        return state ? "line-through" : ""

    }

    const getDoneDateState = (donedate: Date, duedate: Date, isDone: boolean) => {

        if(!isDone || !dayjs(donedate).isValid()) { return "" }

        const done = dayjs(donedate)
        const due = dayjs(duedate)

        if(!due.isValid()) { return "rounded bg-lime-200"}

        if(done.isBefore(due, "s")) {return "rounded bg-lime-200"}
        else {return "rounded bg-red-400"}





    }

    const getDateStyle = (duedate: Date, isDone: boolean) => {

        if(!dayjs(duedate).isValid()) { return "" }


        const today = dayjs(new Date());
        const due = dayjs(duedate)

        const diffInDays = due.diff(today, "days", true)

        console.log(today.format("DD/MM/YYY"), due.format("DD/MM/YYY"), diffInDays)

        if(diffInDays >= 14){
            return "rounded bg-lime-200"
        }
        else if(diffInDays >= 7){
            return "rounded bg-amber-200"
        }
        else if(diffInDays < 7){
            return "rounded bg-red-400"
        }




    }

    const getPriorityStyle = (priority: string, isDone: boolean) => {


        switch (priority) {
            case "High":{
                return "rounded bg-red-400"
            }
            case "Medium": {
                return "rounded bg-amber-200"
            }
            case "Low": {
                return "rounded bg-lime-200"
            }
        }

        return ""


    }



    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Checkbox checked={checked} onChange={() => handleGeneralChange(checked)}/></TableCell>
                            <TableCell>Description</TableCell>
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
                                <TableCell style={{ width: 340 }}><p className={"w-full " + getTextStyle(item.done)}>{item.text}</p></TableCell>
                                <TableCell><p className={"p-1 place-self-center w-16 text-center " + getPriorityStyle(item.priority, item.done)}>{item.priority}</p></TableCell>
                                <TableCell><p className={"p-1 w-fit " + getDateStyle(item.dueDate, item.done)}>{dayjs(item.dueDate).isValid() ? dayjs(item.dueDate).format("DD/MM/YYYY hh:mm") : "No due date"}</p></TableCell>
                                <TableCell><p className={"p-1 w-fit " + getDoneDateState(item.doneDate, item.dueDate, item.done)}>{dayjs(item.doneDate).isValid() ? dayjs(item.doneDate).format("DD/MM/YYYY hh:mm") : "Not completed yet"}</p></TableCell>
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
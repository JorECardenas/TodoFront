import {
    Button,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import CreateToDoModal from "./CreateToDoModal";
import {ParameterContext, ParameterType} from "./Context/ParameterContext";
import {DataContext, DataContextType} from "./Context/DataContext";
import DataTable from "./DataTable";



export default function TodoListComponent() {

    const [openModal, setOpenModal] = useState(false);

    const {data, reloadData } = useContext<DataContextType>(DataContext);
    const {parameters, setParameters} = useContext<ParameterType>(ParameterContext);

    const openTodoModal = () => { setOpenModal(true); };
    const closeTodoModal = () => { setOpenModal(false); reloadData(parameters); };


    const handlePageChange = (event: unknown, value: number) => {
        setParameters({
            ...parameters,
            page: value
        })


    }

    useEffect(() => {
        reloadData(parameters)


    }, [parameters])


    return (
        <div className={"container"}>

            <Button onClick={openTodoModal} variant={"contained"}>+ Create To Do</Button>

            <CreateToDoModal open={openModal} setClose={closeTodoModal} />

            <div className={"flex flex-col items-center justify-center gap-4 mt-4"}>

                <DataTable data={data.content} reload={() => reloadData(parameters)} />

                <Pagination count={data.totalPages} page={data.currentPage} onChange={handlePageChange}/>

            </div>

        </div>
    )


}
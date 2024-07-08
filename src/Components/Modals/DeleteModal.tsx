import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {TodoItem} from "../../Models/TodoItem";
import {TodoAPI} from "../../APIs/TodoAPI";
import {DataContext} from "../Context/DataContext";
import {useContext} from "react";
import {ParameterContext} from "../Context/ParameterContext";


interface CreateToDoModalProps {
    open:boolean
    setClose:() => void;
    item: TodoItem;
    reload: () => void;
}


export default function DeleteModal({open, setClose, item, reload}: CreateToDoModalProps) {

    const {reloadData} = useContext(DataContext)
    const {parameters} = useContext(ParameterContext);

    const handleDelete = () => {

        TodoAPI.Delete(item.id).then(() => {

            reloadData(parameters);
            reloadData(parameters);

        });

        setClose()

    }


    return (
        <Dialog open={open} onClose={setClose}>

            <DialogTitle>Delete To Do</DialogTitle>

            <DialogContent>Are you sure you want to delete "{item.text}"?</DialogContent>

            <DialogActions>
                <Button onClick={setClose}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>




        </Dialog>
    )





}
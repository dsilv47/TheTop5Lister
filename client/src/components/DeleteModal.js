import { useContext } from 'react';
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function DeleteModal() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext)

    const style = {
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    let listName = "";
    let open = false;
    if (store.listMarkedForDeletion) {
        open = true;
        listName = store.listMarkedForDeletion.name;
    }

    const handleDelete = () => {
        store.deleteMarkedList();
    }

    const handleCancel = () => {
        store.unmarkListForDeletion();
    }

    return (
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
            <Typography variant="h5" component="div">
            Delete the {listName} Top 5 List?
            </Typography>
            <Button variant="contained" onClick={handleDelete}>Confirm</Button>
            <Button variant="contained" onClick={handleCancel}>Cancel</Button>
        </Box>
      </Modal>
    );
}
import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal.js';
import ViewModeToolbar from './ViewModeToolbar.js';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const AllListsScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadLists("all");
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.top5Lists.map((list) => (
                    <ListCard
                        key={list._id}
                        top5List={list}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="all-lists-screen">
            <ViewModeToolbar/>
            <div id="top5-list-selector">
                <div id="list-selector-heading">
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    disabled={store.isListNameEditActive}
                >
                    <AddIcon />
                </Fab>
                    <Typography variant="h2">Your Lists (All)</Typography>
                </div>
                <div id="list-selector-list">
                    {
                        listCard
                    }
                </div>
                <DeleteModal></DeleteModal>
            </div>
        </div>)
}

export default AllListsScreen;
import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal.js';
import ViewModeToolbar from './ViewModeToolbar.js';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadLists("", "publishNew");
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#c4c4c4' }}>
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
        <div id="home-screen">
            <ViewModeToolbar/>
            <div id="top5-list-selector">
                <div id="list-selector-list">
                    {
                        listCard
                    }
                </div>
                <div id="list-selector-heading">
                <IconButton
                    size="large"
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    disabled={store.isListNameEditActive}
                >
                    <AddIcon sx={{width: 60, height: 60, color: 'black'}}/>
                </IconButton>
                    <Typography variant="h3">Your Lists</Typography>
                </div>
                <DeleteModal></DeleteModal>
            </div>
        </div>)
}

export default HomeScreen;
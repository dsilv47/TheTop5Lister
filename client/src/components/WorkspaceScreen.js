import { useContext, useEffect } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import ViewModeToolbar from './ViewModeToolbar.js'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }

    function handleSave() {
        //store.handleSave();
        store.closeCurrentList();
    }

    function handlePublish() {
        //store.handlePublish();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur(event);
        }
    }

    function handleBlur(event) {
        store.changeListName(event.target.value);
    }

    return (
        <div>
            <ViewModeToolbar/>
            <TextField
                        margin="normal"
                        fullWidth
                        id="change-list-name"
                        name="name"
                        autoComplete=""
                        defaultValue={store.currentList.name}
                        onKeyPress={handleKeyPress}
                        onBlur={handleBlur}
                    />
            <div id="top5-workspace">
                <div id="workspace-edit">
                    <div id="edit-numbering">
                        <div className="item-number"><Typography variant="h3">1.</Typography></div>
                        <div className="item-number"><Typography variant="h3">2.</Typography></div>
                        <div className="item-number"><Typography variant="h3">3.</Typography></div>
                        <div className="item-number"><Typography variant="h3">4.</Typography></div>
                        <div className="item-number"><Typography variant="h3">5.</Typography></div>
                    </div>
                    {editItems}
                </div>
            </div>
            <Button variant="contained" id="save-button" sx={{position: 'absolute', bottom: 0, right: 100}} onClick={handleSave}>Save</Button>
            <Button variant="contained" id="publish-button" sx={{position: 'absolute', bottom: 0, right: 0}} onClick={handlePublish}>Publish</Button>
        </div>
    )
}

export default WorkspaceScreen;
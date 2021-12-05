import { useContext, useEffect, useState } from 'react'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import ViewModeToolbar from './ViewModeToolbar.js'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    const [listName, setListName] = useState(store.currentList ? store.currentList.name : "");
    const [items, setItems] = useState(store.currentList ? store.currentList.items : []);

    useEffect(() => {
        if (!store.currentList) {
            props.history.push("/");
        }
    }, []);

    function handleSave() {
        store.currentList.name = listName;
        store.currentList.items = items;
        store.updateCurrentList();
        store.closeCurrentList();
    }

    function handlePublish() {
        store.currentList.name = listName;
        store.currentList.items = items;
        store.currentList.published = true;
        store.currentList.publishDate = new Date().toISOString();
        store.updateCurrentList();
        store.updateOrCreateCommunity();
        store.closeCurrentList();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur(event);
        }
    }

    function handleBlur(event) {
        setListName(event.target.value);
    }

    function handleItemKeyPress(event) {
        if (event.code === "Enter") {
            handleItemBlur(event);
        }
    }

    function handleItemBlur(event) {
        let list = [];
        let index = event.target.id.substring("top5-item-".length);
        for (let i = 0; i < items.length; i++) {
            list[i] = (("" + i) === index) ? event.target.value : items[i];
        }
        setItems(list);
    }

    function isSavable() {
        return !(listName === "");
    }

    function isPublishable() {
        if (listName === "") {
            return false;
        }
        if (store.alreadyPublished(listName)) {
            return false;
        }
        for (let i = 0; i < items.length; i++) {
            if (items[i] === "") {
                return false;
            }
            for (let j = (i+1); j < items.length; j++) {
                if (items[i] === items[j]) {
                    return false;
                }
            }
        }
        return true;
    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <Box sx={{borderRadius: 2, bgcolor: '#2e316e', marginLeft: '10px', width: '98%', height: '77%'}}>
                {
                    items.map((item, index) => (
                        <Box sx={{display: "flex", height: '20%'}}>
                            <Box sx={{display: "inline", borderRadius: 1, width: '50px', height: '45px', bgcolor: '#c8ae44', margin: '10px', marginRight: '10px'}}>
                                <Typography sx={{fontSize: '24px', fontWeight: 'bold', textAlign: 'center'}}>{index+1 + "."}</Typography>
                            </Box>
                            <TextField
                            margin="normal"
                            sx={{bgcolor: '#c8ae44', borderRadius: 1, display: "inline", width: '1000px', height: '45px', bottom: '6px'}}
                            InputProps={{style: {width: '100%', height: '100%'}}}
                            id={"top5-item-" + (index)}
                            name="item"
                            autoComplete=""
                            defaultValue={item}
                            onKeyPress={handleItemKeyPress}
                            onBlur={handleItemBlur}
                            />
                        </Box>
                    ))
                }
            </Box>;
    }
    let savable = isSavable();
    let publishable = isPublishable();

    return (
        <div>
            <ViewModeToolbar/>
            <div id="top5-workspace">
                <Box sx={{borderRadius: 1, border: 1, borderColor: 'black', bgcolor: '#d4d5f4', marginLeft: '5%', width: '90%', height: '90%'}}>
                    <TextField
                        margin="normal"
                        sx={{backgroundColor: 'white', width: '50%', marginLeft: '10px', height: '5%'}}
                        InputProps={{style: {width: '100%', height: '100%'}}}
                        id="change-list-name"
                        name="name"
                        autoComplete=""
                        defaultValue={listName}
                        onKeyPress={handleKeyPress}
                        onBlur={handleBlur}
                    />
                    {editItems}
                    <Button variant="contained" id="save-button" sx={{position: 'absolute', bottom: 50, right: 210, bgcolor: '#dddddd', color: 'black', border: 1, borderRadius: 1, borderColor: 'black', width: '100px', height: '40px', fontSize: '20px', fontWeight: 'bold', ':hover': {bgcolor: '#dddddd'}}} onClick={handleSave} disabled={!savable}>Save</Button>
                    <Button variant="contained" id="publish-button" sx={{position: 'absolute', bottom: 50, right: 72, bgcolor: '#dddddd', color: 'black', border: 1, borderRadius: 1, borderColor: 'black', width: '120px', height: '40px', fontSize: '20px', fontWeight: 'bold', ':hover': {bgcolor: '#dddddd'}}} onClick={handlePublish} disabled={!publishable}>Publish</Button>
                </Box>
                <div id="top5-workspace-footer">
                <IconButton
                    size="large"
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    disabled
                >
                    <AddIcon sx={{width: 60, height: 60, bgcolor: '#transparent'}}/>
                </IconButton>
                    <Typography variant="h3" sx={{color: '#00000050'}}>Your Lists</Typography>
            </div>
            </div>
        </div>);

            /*<TextField
                        margin="normal"
                        fullWidth
                        id="change-list-name"
                        name="name"
                        autoComplete=""
                        defaultValue={listName}
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
            <Button variant="contained" id="save-button" sx={{position: 'absolute', bottom: 0, right: 100, bgcolor: '#dddddd'}} onClick={handleSave} disabled={!savable}>Save</Button>
            <Button variant="contained" id="publish-button" sx={{position: 'absolute', bottom: 0, right: 0}} onClick={handlePublish} disabled={!publishable}>Publish</Button>
        </div>
    )*/
}

export default WorkspaceScreen;
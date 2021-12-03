import { useContext, useEffect, useState } from 'react'
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
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    items.map((item, index) => (
                        <TextField
                        margin="normal"
                        fullWidth
                        id={"top5-item-" + (index)}
                        name="item"
                        autoComplete=""
                        defaultValue={item}
                        onKeyPress={handleItemKeyPress}
                        onBlur={handleItemBlur}
                        />
                    ))
                }
            </List>;
    }
    let savable = isSavable();
    let publishable = isPublishable();

    return (
        <div>
            <ViewModeToolbar/>
            <TextField
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
            <Button variant="contained" id="save-button" sx={{position: 'absolute', bottom: 0, right: 100}} onClick={handleSave} disabled={!savable}>Save</Button>
            <Button variant="contained" id="publish-button" sx={{position: 'absolute', bottom: 0, right: 0}} onClick={handlePublish} disabled={!publishable}>Publish</Button>
        </div>
    )
}

export default WorkspaceScreen;
import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
            setText(props.text);
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let index = event.target.id.substring("item-".length)-1;
            store.updateItem(index, text);
            toggleEdit();
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let { index } = props;

    let itemClass = "top5-item";

    let itemElement = <ListItem
                id={'item-' + (index+1)}
                key={'top5-item-' + (index+1)}
                className={itemClass}
                sx={{ display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
            <Box sx={{ p: 1 }}>
                <IconButton disabled={store.isItemEditActive} onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'48pt'}}  />
                </IconButton>
            </Box>
                <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
            </ListItem>;

    if (editActive) {
        itemElement = <TextField
                margin="auto"
                required
                fullWidth
                id={"item-" + (index+1)}
                key={'top5-item-' + (index+1)}
                label="Top 5 Item Name"
                name="name"
                autoComplete="Top 5 Item Name"
                className={itemClass}
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={store.currentList.items[index]}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                draggable="false"
                autoFocus
            />
    }

    return (
            itemElement
    )
}

export default Top5Item;
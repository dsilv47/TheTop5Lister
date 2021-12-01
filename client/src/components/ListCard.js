import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [opened, setOpened] = useState(false);
    const { top5List } = props;

    /*function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
            setText(idNamePair.name);
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event) {
        event.stopPropagation();
        store.markListForDeletion(top5List._id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }*/

    function handleOpen() {
        if (!opened) {
            store.handleView(top5List._id);
        }
        let newOpened = !opened;
        setOpened(newOpened);
    }

    async function handleLike(event) {
        //event.stopPropagation();
        store.handleLike(top5List._id);
    }

    async function handleDislike(event) {
        //event.stopPropagation();
        store.handleDislike(top5List._id);
    }

    async function handleDeleteList(event) {
        event.stopPropagation();
        store.markListForDeletion(top5List._id);
    }

    function handleLoadList(event) {
        store.setCurrentList(top5List._id);
    }

    async function handleComment(event) {
        let comment = "hello";
        store.handleComment(top5List._id, comment);
    }

    let cardElement =
        <div>
            <div>
                <div style={{display: 'inline'}}>{top5List.name} </div>
                <div style={{display: 'inline'}} onClick={handleLike}>LikeButton </div>
                <div style={{display: 'inline'}}>{top5List.userLikes.length} Likes </div>
                <div style={{display: 'inline'}} onClick={handleDislike}>DislikeButton </div>
                <div style={{display: 'inline'}}>{top5List.userDislikes.length} Dislikes </div>
                <div style={{display: 'inline'}} onClick={handleDeleteList}>Delete</div>
            </div>
            <div>Made by: {top5List.ownerUsername}</div>
            <div>Views: {top5List.viewCount}</div>
            <div onClick={handleLoadList}>EDIT</div>
            <div onClick={handleOpen}>Open</div>
        </div>

    if (opened) {
        cardElement = 
            <div>
                <div>
                    <div style={{display: 'inline'}}>{top5List.name} </div>
                    <div style={{display: 'inline'}} onClick={handleLike}>LikeButton </div>
                    <div style={{display: 'inline'}}>{top5List.userLikes.length} Likes </div>
                    <div style={{display: 'inline'}} onClick={handleDislike}>DislikeButton </div>
                    <div style={{display: 'inline'}}>{top5List.userDislikes.length} Dislikes </div>
                    <div style={{display: 'inline'}} onClick={handleDeleteList}>Delete</div>
                </div>
                <div>Made by: {top5List.ownerUsername}</div>
                <div>Views: {top5List.viewCount}</div>
                <div onClick={handleLoadList}>EDIT</div>
                <div onClick={handleOpen}>Close</div>
                <div>{top5List.items[0]}</div>
                <div>{top5List.items[1]}</div>
                <div>{top5List.items[2]}</div>
                <div>{top5List.items[3]}</div>
                <div>{top5List.items[4]}</div>
                <div>Comments:</div>
                <div>
                    {top5List.usernameCommentPairs.map((pair) => <div>{pair.username}: {pair.comment}</div>)}
                </div>
                <div onClick={handleComment}>Add Comment</div>
            </div>
    }
    /*let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }
            }
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }*/
    return (
        cardElement
    );
}

export default ListCard;
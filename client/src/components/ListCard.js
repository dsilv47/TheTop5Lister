import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [opened, setOpened] = useState(false);
    const { top5List } = props;
    const history = useHistory();

    function handleOpen() {
        if (!opened && top5List.published) {
            store.handleView(top5List._id);
        }
        let newOpened = !opened;
        setOpened(newOpened);
    }

    async function handleLike(event) {
        //event.stopPropagation();
        if (top5List.published) {
            store.handleLike(top5List._id);
        }
    }

    async function handleDislike(event) {
        //event.stopPropagation();
        if (top5List.published) {
            store.handleDislike(top5List._id);
        }
    }

    async function handleDeleteList(event) {
        event.stopPropagation();
        store.markListForDeletion(top5List._id);
    }

    function handleLoadList(event) {
        store.setCurrentList(top5List._id);
    }

    async function handleComment(event) {
        if (event.code === "Enter" && top5List.published) {
            store.handleComment(top5List._id, event.target.value);
            event.target.value = "";
        }
    }

    let editOrPublished = (top5List.publishDate) ? <div>
        <Typography display="inline" fontSize="12px" fontWeight="bold" marginLeft="10px">Published: </Typography><Typography display="inline" fontSize="12px" fontWeight="bold" color="green">{new Date(top5List.publishDate).toDateString().substring(4)}</Typography></div> : <Typography sx={{textDecoration: 'underline', fontSize: '12px', color: 'red'}} marginLeft="10px" onClick={handleLoadList}>Edit</Typography>;

    let communityItems = [];
    if (top5List.isCommunity) {
        communityItems = Object.keys(top5List.itemScorePairs).sort((a,b) => top5List.itemScorePairs[b]-top5List.itemScorePairs[a]).slice(0, 5);
    }

    let items = (top5List.isCommunity) ? <Box sx={{marginLeft: '10px', borderRadius: 2, width: '98%', height: '75%', backgroundColor: '#2e316e'}}>
        {communityItems.map((item, index) => <div><Typography color="#bfa745" marginLeft="5px" fontSize="20px">{index+1 + ". " + item}</Typography><Typography color="#bfa745" marginLeft="5px" fontSize="10px">{"(" + top5List.itemScorePairs[item] + " Votes)"}</Typography></div>)}
    </Box> : <Box sx={{marginLeft: '10px', borderRadius: 2, width: '98%', height: '75%', backgroundColor: '#2e316e'}}>
        {top5List.items.map((item, index) => <Typography color="#bfa745" marginLeft="5px" fontSize="24px" marginBottom="10px">{index+1 + ". " + item}</Typography>)}
    </Box>;

    let comments =
        <Box sx={{width: '100%', height: '74%', display: 'inline-block', verticalAlign: 'top'}}>
            <Box sx={{ height: '73%', width: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <List>
                    {top5List.usernameCommentPairs.map((pair) => <Box sx={{borderRadius: 2, borderColor: 'black', border: 1, marginBottom: '5px', backgroundColor: '#c8ae44', width: '99%', height: '60px'}}>
                        <Typography sx={{fontSize: '10px', marginLeft: '5px', color: '#2e316e', textDecoration: 'underline'}}>{pair.username}</Typography>
                        <Typography sx={{fontSize: '16px', marginLeft: '5px'}}>{pair.comment}</Typography>
                        </Box>)}
                </List>
            </Box>
            <Box sx={{ height: '27%', width: '100%', verticalAlign: 'top'}}>
                <TextField
                    margin="normal"
                    sx={{borderRadius: 2, backgroundColor: auth.user ? 'white' : '#ffffff50', marginTop: '8px', width: '100%'}}
                    id="comment"
                    label="Add Comment"
                    name="comment"
                    autoComplete=""
                    onKeyPress={handleComment}
                    disabled={!auth.user}
                />
            </Box>
        </Box>;
    
    let liked = (auth.user ? top5List.userLikes.indexOf(auth.user.email) !== -1 : false);
    let disliked = (auth.user ? top5List.userDislikes.indexOf(auth.user.email) !== -1 : false);

    let deleteHidden = (history.location.pathname !== "/");

    let cardElement = 
        <Box sx={{borderRadius: 1, borderColor: 'black', border: 1, marginBottom: '5px', height: 73, backgroundColor: top5List.published ? '#d4d5f4' : '#fffff2'}}>
            <Box sx={{width: '50%', height: '100%', display: 'inline-block', verticalAlign: 'top'}}>
                <Typography margin="2px" marginLeft="10px" fontSize="18px" fontWeight="bold">{top5List.name}</Typography>
                <Typography display="inline" marginLeft="10px" fontSize="10px" fontWeight="bold" visibility={top5List.isCommunity ? "hidden" : "shown"}>By: </Typography>
                <Typography display="inline" visibility={top5List.isCommunity ? "hidden" : "shown"} sx={{fontSize: '10px', fontWeight: 'bold', textDecoration: 'underline', color: 'blue'}}>{top5List.ownerUsername}</Typography>
                {editOrPublished}
            </Box>
            <Box sx={{width: '50%', height: '100%', display: 'inline-block', verticalAlign: 'top'}}>
                <Box sx={{width: '100%', height: '50%', display: 'inline-block flex', justifyContent: 'flex-end'}}>
                    <IconButton display="inline" disabled={!top5List.published || !auth.user} onClick={handleLike}>{top5List.published ? (liked ? <ThumbUpIcon/> : <ThumbUpOutlinedIcon/>) : null}</IconButton>
                    <Typography display="inline" visibility={top5List.published ? "shown" : "hidden"} marginRight="40px" fontSize="18px" fontWeight="bold">{top5List.userLikes.length}</Typography>
                    <IconButton display="inline" disabled={!top5List.published || !auth.user} onClick={handleDislike}>{top5List.published ? (disliked ? <ThumbDownIcon/> : <ThumbDownOutlinedIcon/>) : null}</IconButton>
                    <Typography display="inline" visibility={top5List.published ? "shown" : "hidden"} marginRight="50px" fontSize="18px" fontWeight="bold">{top5List.userDislikes.length}</Typography>
                    <IconButton display="inline" disabled={deleteHidden} onClick={handleDeleteList}><DeleteOutlinedIcon sx={{color: deleteHidden ? '#00000000' : '#000000'}}/></IconButton>
                </Box>
                <Box sx={{width: '100%', height: '50%', display: 'inline-block flex', justifyContent: 'flex-end'}}>
                    <Typography display="inline" visibility={top5List.published ? "shown" : "hidden"} marginLeft="8px" fontSize="12px" fontWeight="bold" color="black">Views: </Typography>
                    <Typography display="inline" visibility={top5List.published ? "shown" : "hidden"} marginLeft="10px" marginRight="120px" fontSize="12px" fontWeight="bold" color="darkRed">{top5List.viewCount}</Typography>
                    <IconButton display="inline" onClick={handleOpen}><ExpandMoreIcon/></IconButton>
                </Box>
            </Box>
        </Box>

    if (opened) {
        cardElement = 
            <Box sx={{borderRadius: 1, borderColor: 'black', border: 1, marginBottom: '5px', height: 312, backgroundColor: top5List.published ? '#d4d5f4' : '#fffff2'}}>
                <Box sx={{width: '50%', height: '100%', display: 'inline-block', verticalAlign: 'top'}}>
                    <Typography margin="2px" marginLeft="10px" fontSize="18px" fontWeight="bold">{top5List.name}</Typography>
                    <Typography display="inline" marginLeft="10px" fontSize="10px" fontWeight="bold" visibility={top5List.isCommunity ? "hidden" : "shown"}>By: </Typography>
                    <Typography display="inline" visibility={top5List.isCommunity ? "hidden" : "shown"} sx={{fontSize: '10px', fontWeight: 'bold', textDecoration: 'underline', color: 'blue'}}>{top5List.ownerUsername}</Typography>
                    {items}
                    {editOrPublished}
                </Box>
                <Box sx={{width: '50%', height: '100%', display: 'inline-block', verticalAlign: 'top'}}>
                    <Box sx={{width: '100%', height: '16%', display: 'inline-block flex', justifyContent: 'flex-end'}}>
                        <IconButton display="inline" disabled={!top5List.published || !auth.user} onClick={handleLike}>{top5List.published ? (liked ? <ThumbUpIcon/> : <ThumbUpOutlinedIcon/>) : null}</IconButton>
                        <Typography display="inline" visibility={top5List.published ? "shown" : "hidden"} marginRight="40px" fontSize="18px" fontWeight="bold">{top5List.userLikes.length}</Typography>
                        <IconButton display="inline" disabled={!top5List.published || !auth.user} onClick={handleDislike}>{top5List.published ? (disliked ? <ThumbDownIcon/> : <ThumbDownOutlinedIcon/>) : null}</IconButton>
                        <Typography display="inline" visibility={top5List.published ? "shown" : "hidden"} marginRight="50px" fontSize="18px" fontWeight="bold">{top5List.userDislikes.length}</Typography>
                        <IconButton display="inline" disabled={deleteHidden} onClick={handleDeleteList}><DeleteOutlinedIcon sx={{color: deleteHidden ? '#00000000' : '#000000'}}/></IconButton>
                    </Box>
                    {top5List.published ? comments : <Box sx={{width: '100%', height: '74%', display: 'inline-block', verticalAlign: 'top'}}></Box>}
                    <Box sx={{width: '100%', height: '10%', display: 'inline-block flex', justifyContent: 'flex-end', verticalAlign: 'top'}}>
                        <Typography display="inline" visibility={top5List.published ? "shown" : "hidden"} marginLeft="8px" fontSize="12px" fontWeight="bold" color="black">Views: </Typography>
                        <Typography display="inline" visibility={top5List.published ? "shown" : "hidden"} marginLeft="10px" marginRight="120px" fontSize="12px" fontWeight="bold" color="darkRed">{top5List.viewCount}</Typography>
                        <IconButton display="inline" onClick={handleOpen}><ExpandLessIcon/></IconButton>
                    </Box>
                </Box>
            </Box>
    }

    return (
        cardElement
    );
}

export default ListCard;
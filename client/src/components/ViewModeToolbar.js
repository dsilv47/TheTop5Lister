import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';

export default function ViewModeToolbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const history = useHistory();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        setAnchorEl(null);
    };

    function handleSearch(event) {
        if (event.code === "Enter") {
            store.loadLists(event.target.value, store.sortParam);
        }
    }

    function handleSort(event) {
        let sortParam = event.target.id.substring("sort-".length);
        store.loadLists(store.searchParam, sortParam);
        handleMenuClose();
    }

    const sortMenu = <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem id="sort-publishNew" onClick={handleSort}>Publish Date (Newest)</MenuItem>
                        <MenuItem id="sort-publishOld" onClick={handleSort}>Publish Date (Oldest)</MenuItem>
                        <MenuItem id="sort-views" onClick={handleSort}>Views</MenuItem>
                        <MenuItem id="sort-likes" onClick={handleSort}>Likes</MenuItem>
                        <MenuItem id="sort-dislikes" onClick={handleSort}>Dislikes</MenuItem>
                    </Menu>

    let disabled = (history.location.pathname.indexOf('top5list') !== -1);
    let homeDisabled = (history.location.pathname === "/" || !auth.loggedIn);
    let allDisabled = (history.location.pathname === "/all");
    let usersDisabled = (history.location.pathname === "/users");
    let communityDisabled = (history.location.pathname === "/community");
    
    let toolbar = 
        <Toolbar>
            <Box sx={{width: 25}}></Box>
            <IconButton disabled={homeDisabled}>
                <Link to='/'><HomeOutlinedIcon sx={{width: 30, height: 30, color: homeDisabled ? '#00000050' : 'black'}}/></Link>
            </IconButton>
            <IconButton disabled={allDisabled}>
                <Link to='/all'><GroupsOutlinedIcon sx={{width: 30, height: 30, color: allDisabled ? '#00000050' : 'black'}}/></Link>
            </IconButton>
            <IconButton disabled={usersDisabled}>
                <Link to='/users'><PersonOutlinedIcon sx={{width: 30, height: 30, color: usersDisabled ? '#00000050' : 'black'}}/></Link>
            </IconButton>
            <IconButton disabled={communityDisabled}>
                <Link to='/community'><FunctionsIcon sx={{width: 30, height: 30, color: communityDisabled ? '#00000050' : 'black'}}/></Link>
            </IconButton>
            <TextField
                margin="normal"
                style={{backgroundColor: 'white', width: 610}}
                id="search-bar"
                label="Search"
                name="search"
                autoComplete=""
                onKeyPress={handleSearch}
            />
            <Box sx={{width: 170}}></Box>
            <Typography fontSize="20px" color="black">SORT BY</Typography>
            <IconButton
                    id="sort-button"
                    size="large"
                    edge="end"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <SortIcon sx={{width: 40, height: 40, color: 'black'}}/>
                </IconButton>
        </Toolbar>

    if (disabled) {
        toolbar = 
            <Toolbar>
                <Box sx={{width: 25}}></Box>
                <IconButton disabled>
                    <Link to='/'><HomeOutlinedIcon sx={{width: 30, height: 30, color: '#00000050'}}/></Link>
                </IconButton>
                <IconButton disabled>
                    <Link to='/all'><GroupsOutlinedIcon sx={{width: 30, height: 30, color: '#00000050'}}/></Link>
                </IconButton>
                <IconButton disabled>
                    <Link to='/users'><PersonOutlinedIcon sx={{width: 30, height: 30, color: '#00000050'}}/></Link>
                </IconButton>
                <IconButton disabled>
                    <Link to='/community'><FunctionsIcon sx={{width: 30, height: 30, color: '#00000050'}}/></Link>
                </IconButton>
                <TextField
                    margin="normal"
                    style={{backgroundColor: '#ffffff50', width: 610}}
                    id="search-bar"
                    label="Search"
                    name="search"
                    autoComplete=""
                    onKeyPress={handleSearch}
                    disabled
                />
                <Box sx={{width: 170}}></Box>
                <Typography fontSize="20px" color="#00000050">SORT BY</Typography>
                <IconButton
                        id="sort-button"
                        size="large"
                        edge="end"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                        disabled
                    >
                        <SortIcon sx={{width: 40, height: 40, bgcolor: 'transparent'}}/>
                    </IconButton>
            </Toolbar>
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" id="top5-view-mode-toolbar" sx={{backgroundColor: '#c4c4c4'}}>
                {toolbar}
            </AppBar>
            {sortMenu}
        </Box>
    );
}
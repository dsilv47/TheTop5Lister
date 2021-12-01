import { useContext, useState } from 'react';
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
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';

export default function ViewModeToolbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleSearch(event) {
        if (event.code === "Enter") {
            store.loadLists(event.target.value);
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" id="top5-view-mode-toolbar" sx={{backgroundColor: '#c4c4c4'}}>
                <Toolbar>
                    <IconButton size="large">
                        <Link to='/'><HomeIcon/></Link>
                    </IconButton>
                    <IconButton size="large">
                        <Link to='/all'><GroupsIcon/></Link>
                    </IconButton>
                    <IconButton size="large">
                        <Link to='/users'><PersonIcon/></Link>
                    </IconButton>
                    <IconButton size="large">
                        <Link to='/community'><FunctionsIcon/></Link>
                    </IconButton>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="search-bar"
                        label="Search"
                        name="search"
                        autoComplete=""
                        onKeyPress={handleSearch}
                    />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/*search bar & sort menu */}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
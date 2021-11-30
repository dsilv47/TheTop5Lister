import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <div id="splash-screen-head">
                <div id="splash-screen1">Welcome to the </div>
                <div id="splash-screen2">Top 5 Lister</div>
            </div>
            <div id="splash-screen-desc">A place to create, compare, and show off lists of your 5 favorite things!</div>
            <div id="splash-screen-dev">Developed by David Silverman</div>
            <Link to='/register/' style={{textDecoration: 'none'}}><Button variant="contained" id="splash-screen-button" >Create Account</Button></Link>
            <Link to='/login/' style={{textDecoration: 'none'}}><Button variant="contained" id="splash-screen-button">Login</Button></Link>
            <Button variant="contained" id="splash-screen-button">Continue as Guest</Button>
        </div>
    )
}
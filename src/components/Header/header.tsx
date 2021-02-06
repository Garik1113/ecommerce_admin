import classes from './header.css';
import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import { useHeader } from 'src/talons/Header/useHeader';
import { Link } from 'react-router-dom';

const logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Boomerang_tv_logo.png/758px-Boomerang_tv_logo.png"
const Header = () => {
    const { isSignedIn, handleSignOut } = useHeader();
    return (
        <div>
            <div className={classes.myCard}>
                <div className={classes.logo}>
                    <img src={logoUrl} alt="logo"/>
                </div>
                {
                    isSignedIn
                    ?   <div className={classes.button}>
                           <Button prsecondaryimary="true" onClick={handleSignOut}>Log Out</Button> 
                        </div>
                      
                    :   <div className={classes.button}>
                            <Link to="/">
                                <Button prsecondaryimary="true">Sign up</Button> 
                            </Link>
                            <Link to="/signin">
                                <Button prsecondaryimary="true">Sign in</Button>
                            </Link>        
                        </div>
                }
                
            </div>
        </div>
    )
}

export default Header;
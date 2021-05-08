import classes from './header.css';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHeader } from 'src/talons/Header/useHeader';
import { Link } from 'react-router-dom';
const Header = () => {
    const { isSignedIn, handleSignOut, logoSrc } = useHeader();
    
    return (
        <div>
            <div className={classes.myCard}>
                <div className={classes.logo}>
                    {
                        logoSrc
                        ?   <img src={logoSrc} alt="logo"/>
                        :   null
                    }
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
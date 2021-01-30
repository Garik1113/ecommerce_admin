import classes from './main.css';
import Menu from 'components/Menu';
import React, { ReactChild, useEffect, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import routes from 'src/routes/routes';
import authRoutes from 'src/routes/authRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/store';
import ErrorField from 'components/ErrorField';
import { handleDeleteError } from 'src/store/actions/error/error';
import { useHistory, useLocation } from 'react-router';
import { Console } from 'console';
import Header from 'components/Header';

const Main = () => {
    const isSignedIn = useSelector((state: AppState) => state.user.isSignedIn);
    const hasError = useSelector((state: AppState) => state.error.haseError);
    const newError = useSelector((state: AppState) => state.error.error);
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (hasError) {
            setError(newError)
        } else {
            setError(null)
        }
    }, [hasError]);
    
    let content:ReactChild;
    if (isSignedIn) {
        content = (
            <div className={classes.grid}>
                <Menu/>
                <div>
                    {renderRoutes(routes())} 
                </div>
            </div>
        )
    } else {
        history.push('/')
        content = renderRoutes(authRoutes())
    }
    
    return (
        <div className={classes.main}>
            <Header/>
            {content}
            {
                error 
                ?   <ErrorField error={error} onClose={() => dispatch(handleDeleteError())}/>
                :   null
            }
            
        </div>
    )
}

export default Main
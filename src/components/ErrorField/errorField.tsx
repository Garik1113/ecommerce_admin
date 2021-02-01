import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { ErrorActionPayload } from 'src/store/actions/error/types';
import classes from './errorField.css';
interface ErrorProps {
    error: ErrorActionPayload,
    onClose: any
}

const ErrorField = (props: ErrorProps) => {
    const { error, onClose } = props;

    return (
        <div className={classes.root}>
            <div className={classes.error}>
                <Message error>
                    <Button icon="delete" onClick={onClose} className={classes.close}/>
                    <div className={classes.message}>
                        <p>{error.message}</p> 
                    </div>
                    <div className={classes.statusCode}>
                        Status Code {error.statusCode}
                    </div>
                </Message>
            </div>
        </div>
    )
}

export default ErrorField;
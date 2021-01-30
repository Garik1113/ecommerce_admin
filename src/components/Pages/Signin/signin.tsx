import React from 'react';
import classes from './signin.css';
import { Input, Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSignin } from 'src/talons/Signin/useSignin';

const Signin = () => {
    const { formik } = useSignin();
    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div className={classes.field}>
                    <Input 
                        type="text" 
                        name="email"
                        placeholder="Email"
                        className={classes.input}
                        value={formik.values.email} 
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={classes.field}>
                    <Input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        className={classes.input}
                        value={formik.values.password} 
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={classes.button}>
                    <Button primary type="submit">Signin</Button>
                </div>
                <Message className={classes.message}>
                    Dont have an account ? 
                    <Link to='/' className={classes.signinLink}>Sign up</Link>
                </Message>
            </form>
        </div>
    )
}

export default Signin;
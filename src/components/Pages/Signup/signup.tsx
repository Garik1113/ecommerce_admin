import React from 'react';
import classes from './signup.css';
import { Input, Button, Message } from 'semantic-ui-react';
import { useSignup } from 'src/talons/Signup/useSignup';
import { Link } from 'react-router-dom';

const Signup = () => {
    const { formik } = useSignup();
    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div className={classes.field}>
                    <Input 
                        type="text" 
                        name="name"
                        placeholder="Name"
                        className={classes.input}
                        value={formik.values.name} 
                        onChange={formik.handleChange}
                    />
                </div>
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
                    <Button primary type="submit">Signup</Button>
                </div>
                <Message className={classes.message}>
                    Have an account ? 
                    <Link to='/signin' className={classes.signinLink}>Sign in</Link>
                </Message>
            </form>
        </div>
    )
}

export default Signup;
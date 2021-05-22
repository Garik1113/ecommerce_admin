import FaqGrid from 'components/FaqGrid';
import React from 'react';
import classes from './faq.css';

const Faq = () => {
    return (
        <div className={classes.root}>
            <FaqGrid/>
        </div>
    )
}

export default Faq;
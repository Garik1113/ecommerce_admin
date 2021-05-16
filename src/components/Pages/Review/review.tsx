import ReviewGrid from 'components/ReviewGrid';
import React from 'react';
import classes from './review.css';

const Review = () => {
    return (
        <div className={classes.root}>
            <ReviewGrid/>
        </div>
    )
}

export default Review;
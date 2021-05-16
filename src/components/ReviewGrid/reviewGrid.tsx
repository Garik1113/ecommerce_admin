import ReviewModal from 'components/ReviewModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useReviewGrid } from 'src/talons/ReviewGrid/useReviewGrid';
import classes from './reviewGrid.css';


const ReviewGrid = () => {
    const { 
        reviews, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingReview,
        handleAddNewBanner,
        reloadData
    } = useReviewGrid({classes});

    return (
        <div className={classes.root}>
            <DataGrid
                totals={false}
                columns={columns} 
                items={reviews} 
                title="Filters"
                isSubmitting={isSubmitting}
                buttons={[]}
            />
            {
                showModal 
                &&  <ReviewModal 
                        visible={showModal} 
                        onClose={handleHideModal}
                        review={editingReview}
                        reloadData={reloadData}
                        handleHideModal={handleHideModal}
                    />
            }
        </div>
    )
}
export default ReviewGrid;
import ReviewModal from 'components/ReviewModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useProductSubscribersGrid } from 'src/talons/ProductSubscribersGrid/useProductSubscribersGrid';
import classes from './productSubscribers.css';


const ProductSubscribersGrid = () => {
    const { 
        productSubscriptions, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingReview,
        reloadData
    } = useProductSubscribersGrid({classes});

    return (
        <div className={classes.root}>
            <DataGrid
                totals={false}
                columns={columns} 
                items={productSubscriptions} 
                title="Ապրանքների Ծանուցումներ"
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
export default ProductSubscribersGrid;
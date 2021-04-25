import OrderModal from 'components/OrderModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useOrderGrid } from 'src/talons/OrderGrid/useOrderGrid';
import classes from './orderGrid.css';


const OrderGrid = () => {
    const { 
        orders, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingOrder,
        handleAddNewBanner,
        reloadData
    } = useOrderGrid({classes});

    return (
        <div className={classes.root}>
            <DataGrid 
                columns={columns} 
                items={orders} 
                title="Orders"
                isSubmitting={isSubmitting}
                buttons={[]}
            />
            {
                showModal 
                &&  <OrderModal 
                        visible={showModal} 
                        onClose={handleHideModal}
                        order={editingOrder}
                        reloadData={reloadData}
                        handleHideModal={handleHideModal}
                    />
            }
        </div>
    )
}
export default OrderGrid;
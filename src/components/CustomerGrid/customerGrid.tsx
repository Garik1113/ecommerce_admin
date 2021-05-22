import BannerModal from 'components/BannerModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useCustomerGrid } from 'src/talons/CustomerGrid/useCustomerGrid';
import classes from './customerGrid.css';


const CustomerGrid = () => {
    const { 
        customers, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingBanner,
        reloadData
    } = useCustomerGrid({classes});

    return (
        <div className={classes.root}>
            <DataGrid 
                columns={columns} 
                items={customers} 
                title="Օգտատերեր"
                isSubmitting={isSubmitting}
                buttons={[]}
            />
            {
                showModal 
                &&  <BannerModal 
                        visible={showModal} 
                        onClose={handleHideModal}
                        banner={editingBanner}
                        reloadData={reloadData}
                        handleHideModal={handleHideModal}
                    />
            }
        </div>
    )
}
export default CustomerGrid;
import BannerModal from 'components/BannerModal';
import CategoryModal from 'components/CategoryModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useBannerGrid } from 'src/talons/BannerGrid/useBannerGrid';
import classes from './bannerGrid.css';


const BannerGrid = () => {
    const { 
        banners, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingBanner,
        handleAddNewBanner,
        reloadData
    } = useBannerGrid();

    return (
        <div className={classes.root}>
            <DataGrid 
                columns={columns} 
                items={banners} 
                title="Categories"
                isSubmitting={isSubmitting}
                buttons={[
                    {
                        onClick: handleAddNewBanner,
                        type: 'submit',
                        label: "Add new banner",
                        isSubmitting: false
                    }
                ]}
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
export default BannerGrid;
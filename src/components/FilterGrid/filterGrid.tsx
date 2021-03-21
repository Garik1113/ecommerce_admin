import FilterModal from 'components/FilterModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useFilterGrid } from 'src/talons/FilterGrid/useFilterGrid';
import classes from './filterGrid.css';


const FilterGrid = () => {
    const { 
        filters, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingFilter,
        handleAddNewBanner,
        reloadData
    } = useFilterGrid();

    return (
        <div className={classes.root}>
            <DataGrid 
                columns={columns} 
                items={filters} 
                title="Filters"
                isSubmitting={isSubmitting}
                buttons={[
                    {
                        onClick: handleAddNewBanner,
                        type: 'submit',
                        label: "Add new filter",
                        isSubmitting: false
                    }
                ]}
            />
            {
                showModal 
                &&  <FilterModal 
                        visible={showModal} 
                        onClose={handleHideModal}
                        filter={editingFilter}
                        reloadData={reloadData}
                        handleHideModal={handleHideModal}
                    />
            }
        </div>
    )
}
export default FilterGrid;
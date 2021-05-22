import CategoryModal from 'components/CategoryModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useCategoryGrid } from 'src/talons/CategoryGrid/useCategoryGrid';
import classes from './categoryGrid.css';


const CategoryGrid = () => {
    const { 
        categories, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingCategory,
        handleAddNewCategory,
        reloadData
    } = useCategoryGrid();

    return (
        <div className={classes.root}>
            <DataGrid 
                columns={columns} 
                items={categories} 
                title="Կատեգորիաներ"
                isSubmitting={isSubmitting}
                buttons={[
                    {
                        onClick: handleAddNewCategory,
                        type: 'submit',
                        label: "Ավելացնել նորը",
                        isSubmitting: false
                    }
                ]}
            />
            {
                showModal 
                &&  <CategoryModal 
                        visible={showModal} 
                        onClose={handleHideModal}
                        category={editingCategory}
                        reloadData={reloadData}
                        handleHideModal={handleHideModal}
                    />
            }
        </div>
    )
}
export default CategoryGrid;
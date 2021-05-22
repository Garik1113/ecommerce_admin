import DataGrid from 'components/DataGrid';
import ProductModal from 'components/ProductModal';
import React from 'react';
import { useProductGrid } from 'src/talons/ProductGrid/useProductGrid';
import classes from './productGrid.css';


const ProductGrid = () => {
    const { 
        products, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingProduct,
        handleAddNewProduct,
        reloadData,
        totals,
        queryParams
    } = useProductGrid({classes});

    return (
        <div className={classes.root}>
            <DataGrid 
                columns={columns} 
                items={products} 
                title="Ապրանքներ"
                isSubmitting={isSubmitting}
                totals={totals}
                queryParams={queryParams}
                buttons={[
                    {
                        onClick: handleAddNewProduct,
                        type: 'submit',
                        label: "Ավելացնել նորը",
                        isSubmitting: false
                    }
                ]}
            />
            {
                showModal 
                &&  <ProductModal 
                        visible={showModal} 
                        onClose={handleHideModal}
                        product={editingProduct}
                        reloadData={reloadData}
                        handleHideModal={handleHideModal}
                    />
            }
        </div>
    )
}
export default ProductGrid;
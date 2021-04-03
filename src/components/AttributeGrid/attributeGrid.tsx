import AttributeModal from 'components/AttributeModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useAttributeGrid } from 'src/talons/AttributeGrid/useAttributeGrid';
import classes from './attributeGrid.css';


const AttributeGrid = () => {
    const { 
        attributes, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingAttribute,
        handleAddNewBanner,
        reloadData
    } = useAttributeGrid();

    return (
        <div className={classes.root}>
            <DataGrid 
                columns={columns} 
                items={attributes} 
                title="Attributes"
                isSubmitting={isSubmitting}
                buttons={[
                    {
                        onClick: handleAddNewBanner,
                        type: 'submit',
                        label: "Add new Attribute",
                        isSubmitting: false
                    }
                ]}
            />
            {
                showModal 
                &&  <AttributeModal 
                        visible={showModal} 
                        onClose={handleHideModal}
                        attribute={editingAttribute}
                        reloadData={reloadData}
                        handleHideModal={handleHideModal}
                    />
            }
        </div>
    )
}
export default AttributeGrid;
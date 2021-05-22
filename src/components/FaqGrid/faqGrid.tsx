import FaqModal from 'components/FaqModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useFaqGrid } from 'src/talons/FaqGrid/useFaqGrid';
import classes from './faqGrid.css';


const FaqGrid = () => {
    const { 
        faqs, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingFaq,
        handleAddNewBanner,
        reloadData
    } = useFaqGrid({classes});

    return (
        <div className={classes.root}>
            <DataGrid 
                columns={columns} 
                items={faqs} 
                title="Հաճախ տրվող հարցեր"
                isSubmitting={isSubmitting}
                buttons={[
                    {
                        onClick: handleAddNewBanner,
                        type: 'submit',
                        label: "Ավելացնել նորը",
                        isSubmitting: false
                    }
                ]}
            />
            {
                showModal 
                &&  <FaqModal 
                        visible={showModal} 
                        onClose={handleHideModal}
                        faq={editingFaq}
                        reloadData={reloadData}
                        handleHideModal={handleHideModal}
                    />
            }
        </div>
    )
}
export default FaqGrid;
import SliderModal from 'components/SliderModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useFilterGrid } from 'src/talons/SliderGrid/useSliderGrid';
import classes from './sliderGrid.css';


const SliderGrid = () => {
    const { 
        sliders, 
        columns,
        handleHideModal,
        showModal,
        isSubmitting,
        editingSlider,
        handleAddNewSlider,
        reloadData
    } = useFilterGrid();

    return (
        <div className={classes.root}>
            <DataGrid 
                columns={columns} 
                items={sliders} 
                title="sliders"
                isSubmitting={isSubmitting}
                buttons={[
                    {
                        onClick: handleAddNewSlider,
                        type: 'submit',
                        label: "Add new slider",
                        isSubmitting: false
                    }
                ]}
            />
            {
                showModal 
                &&  <SliderModal 
                        visible={showModal} 
                        onClose={handleHideModal}
                        slider={editingSlider}
                        reloadData={reloadData}
                        handleHideModal={handleHideModal}
                    />
            }
        </div>
    )
}
export default SliderGrid;
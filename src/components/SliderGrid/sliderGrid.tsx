import SliderModal from 'components/SliderModal';
import DataGrid from 'components/DataGrid';
import React from 'react';
import { useSliderGrid } from 'src/talons/SliderGrid/useSliderGrid';
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
    } = useSliderGrid();

    return (
        <div className={classes.root}>
            <DataGrid 
                columns={columns} 
                items={sliders} 
                title="Սլայդերներ"
                isSubmitting={isSubmitting}
                buttons={[
                    {
                        onClick: handleAddNewSlider,
                        type: 'submit',
                        label: "Ավելացնել նորը",
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
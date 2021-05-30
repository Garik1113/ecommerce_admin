import ColorSwatch from 'components/Attributes/colorSwatch';
import Swatch from 'components/Attributes/swatch';
import React from 'react';
import classes from './productList.css'

const ItemList = (props) => {
    const { items, currency } = props;

    return (
        <div className={classes.list}>
            {
                items.map((e, i) => {
                    return (
                        <div key={i} className={classes.item}>
                            <div className={classes.product}>
                                <div className={classes.imageField}>
                                    <img 
                                        className={classes.image} 
                                        src={`api/images/product/${e.product.images[0].thumbnail_image}`}
                                    />
                                </div>
                                <div className={classes.nameField}>
                                    {e.product.name}
                                    <div className={classes.priceField}>
                                        Գին: {e.product.discountedPrice || e.product.price} {currency.name}
                                    </div>
                                    <div className={classes.attributes}>
                                        {
                                            e.product.configurableAttributes.map((e,l) => {
                                                const attributeName = e.attribute.name;
                                                const type = e.attribute.type;
                                                const valueName = e.value.name;
                                                if (type == "swatch") {
                                                    return (
                                                        <div key={l} className={classes.attribute}>
                                                            <div className={classes.attributeName}>{attributeName}:</div>
                                                            <Swatch value={e.value} />
                                                        </div>
                                                        
                                                    )
                                                } else if (type == "colorSwatch") {
                                                    return (
                                                        <div key={l} className={classes.attribute}>
                                                            <div className={classes.attributeName}>{attributeName}:</div>
                                                            <ColorSwatch value={e.value} key={l}/>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={l}>
                                                            {attributeName}: {valueName}
                                                        </div>
                                                    )
                                                }
                                                
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={classes.quantity}>
                                Քանակ: {e.quantity}
                            </div>
                        </div>
                    ) 
                })
            }
        </div>
    )
}

export default ItemList
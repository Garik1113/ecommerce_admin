import React from 'react';
import classes from './productList.css'

const ItemList = (props) => {
    const { items, currency } = props;

    return (
        <div className={classes.list}>
            {
                items.map((e, i) => {
                 return   <div key={i} className={classes.item}>
                        <div className={classes.product}>
                            <div className={classes.imageField}>
                                <img 
                                    className={classes.image} 
                                    src={`api/images/product/${e.product.images[0].thumbnail_image}`}
                                />
                            </div>
                            <div className={classes.nameField}>
                                {e.product.name}
                            </div>
                            <div className={classes.priceField}>
                                Price: {e.product.discountedPrice || e.product.price} {currency.name}
                            </div>
                            <div className={classes.attributes}>
                                {
                                    e.product.configurableAttributes.map((e,l) => {
                                        const attributeName = e.attribute.name;
                                        const valueName = e.selectedValue.name;
                                        return (
                                            <div>
                                                {attributeName}: {valueName}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={classes.quantity}>
                            Qty: {e.quantity}
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default ItemList
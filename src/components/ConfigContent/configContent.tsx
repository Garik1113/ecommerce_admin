import React from 'react';
import classes from './configContent.css';
import { Button, Checkbox, Dropdown, Input } from 'semantic-ui-react';
import { useConfigContent } from 'src/talons/ConfigContent/useConfigContent'
import ImageUploader from 'components/ImageUploader';
import { handleImageError } from 'src/helpers/handleImageError';

const ConfigContent = () => {
    const { 
        formik, 
        handleAddNewSocialSite,
        baseCurrencyOptions,
        handleOnDrop,
        message
    } = useConfigContent();

    return (
        <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.button}>
                    <Button onClick={formik.handleSubmit} primary>Պահպանել</Button>
                </div>
                {
                    message
                    ?   <div className={classes.message}>{message}</div>
                    :   null
                }
                <div className={classes.field}>
                    <div className={classes.fieldTitle}>
                        Խանութի Լոգո
                    </div>
                    <div className={classes.imageField}>
                        <ImageUploader handleOnDrop={handleOnDrop}/>
                        {
                            formik.values.logo
                            ?   <img 
                                    className={classes.image} 
                                    src={`api/images/config/${formik.values.logo}`} 
                                    onError={handleImageError}
                                />
                            :   null
                        }
                        
                    </div>
                </div>
                <div className={classes.field}>
                    <div className={classes.fieldTitle}>
                        Խանութի Էլ հասցե
                    </div>
                    <Input 
                        type="text" 
                        name="storeEmail"
                        placeholder="Store Email"
                        className={classes.input}
                        value={formik.values.storeEmail} 
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={classes.field}>
                    <div className={classes.fieldTitle}>
                        Խանութի Հեռախոսահամար
                    </div>
                    <Input 
                        type="text" 
                        name="storePhone"
                        placeholder="Store Phone"
                        className={classes.input}
                        value={formik.values.storePhone} 
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={classes.field}>
                    <div className={classes.fieldTitle}>
                        Արժույթ
                    </div>
                    <Dropdown
                        onChange={(e, data) => formik.setFieldValue('baseCurrency', data.value)}
                        value={formik.values.baseCurrency}
                        name="baseCurrency"
                        selection
                        fluid
                        id="baseCurrency"
                        options={baseCurrencyOptions}
                    />
                </div>
                <div className={classes.field}>
                    <div className={classes.fieldTitle}>
                        Ապրանքների քանակը էջում
                    </div>
                    <Input 
                        type="number" 
                        name="productsPerPage"
                        placeholder="Ապրանքների քանակը էջում"
                        className={classes.input}
                        value={formik.values.productsPerPage} 
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={classes.paymentMethodfield}>
                    <div className={classes.shippingFieldTitle}>
                        Վճարման եղանակներ
                    </div>
                    {
                        formik.values.paymentMethods.map((e:any, i) => {
                            return (
                                <div className={classes.method}>
                                    <div>{e.methodName}</div>
                                    <div className={classes.methodEnabled}>
                                        <Checkbox
                                            checked={formik.values.paymentMethods[i].enabled || false}
                                            type="checkbox"
                                            label="Enabled"
                                            id={`paymentMethods[${i}].enabled`}
                                            name={`paymentMethods[${i}].enabled`}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={classes.paymentMethodfield}>
                    <div className={classes.shippingFieldTitle}>
                        Առաքման եղանակներ
                    </div>
                    {
                        formik.values.shippingMethods.map((e:any, i) => {
                            return (
                                <div className={classes.shippingMethod}>
                                    <div className={classes.field}>
                                        <div className={classes.fieldTitle}>
                                            Անուն
                                        </div>
                                        <Input 
                                            type="text" 
                                            name={`shippingMethods[${i}].methodName`}
                                            placeholder="Անուն"
                                            className={classes.input}
                                            value={formik.values.shippingMethods[i].methodName} 
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className={classes.field}>
                                        <div className={classes.fieldTitle}>
                                            Եղանակի կոդ
                                        </div>
                                        <Input 
                                            type="text" 
                                            name={`shippingMethods[${i}].methodCode`}
                                            placeholder="Method Code"
                                            className={classes.input}
                                            value={formik.values.shippingMethods[i].methodCode} 
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className={classes.field}>
                                        <div className={classes.fieldTitle}>
                                            Գին
                                        </div>
                                        <Input 
                                            type="number" 
                                            name={`shippingMethods[${i}].price`}
                                            placeholder="Գին"
                                            className={classes.input}
                                            value={formik.values.shippingMethods[i].price} 
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className={classes.methodEnabled}>
                                        <Checkbox
                                            checked={formik.values.shippingMethods[i].enabled || false}
                                            type="checkbox"
                                            label="Թույլատրված է"
                                            id={`shippingMethods[${i}].enabled`}
                                            name={`shippingMethods[${i}].enabled`}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={classes.socialButton}>
                        <Button type="button" 
                            onClick={() => { 
                                formik.setFieldValue("shippingMethods", [...formik.values.shippingMethods, {
                                        methodName: "",
                                        methodCode: "",
                                        price: 0,
                                        enabled: false
                                        
                                    }])
                                }
                            } 
                            primary
                        >
                            Ավելացնել նորը
                        </Button>
                    </div>
                </div>
                <div className={classes.fieldTitle}>
                    Սոցիալական կայքեր
                </div>
                {
                    formik.values.socialSites.map((e:any, i) => {
                        return (
                            <div className={classes.socialSite} key={i}>
                                <Input 
                                    type="text" 
                                    name={`socialSites[${i}.name]`}
                                    placeholder="Site Name"
                                    className={classes.input}
                                    value={formik.values.socialSites[i].name}
                                    onChange={formik.handleChange}
                                />
                                <Input 
                                    type="text" 
                                    name={`socialSites[${i}.url]`}
                                    placeholder="Site Url"
                                    className={classes.input}
                                    value={formik.values.socialSites[i].url}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        )
                    })
                }
                <div className={classes.socialButton}>
                    <Button type="button" onClick={handleAddNewSocialSite} primary>Ավելացնել Սոցիալական կայք</Button>
                </div>
                <div className={classes.button}>
                    <Button onClick={formik.handleSubmit} primary>Պահպանել</Button>
                </div>
            </form>
        </div>
    )
}

export default ConfigContent;
import BannerGrid from 'components/BannerGrid';
import Category from 'components/Pages/Category';
import Filter from 'components/Pages/Filter';
import Product from 'components/Pages/Product';
import Slider from 'components/Pages/Slider';
import Attribute from 'components/Pages/Attribute';
import { RouteConfig } from "react-router-config";

const routes = ():RouteConfig[] => {
    return [
        {
            component: Product,
            path: '/products',
            exact: true
        },
        {
            component: Category,
            path: '/categories',
            exact: true
        },
        {
            component: BannerGrid,
            path: '/banners',
            exact: true
        },
        {
            component: Filter,
            path: '/filters',
            exact: true
        },
        {
            component: Slider,
            path: '/sliders',
            exact: true
        },
        {
            component: Attribute,
            path: '/attributes',
            exact: true
        }
    ]
}


export default routes
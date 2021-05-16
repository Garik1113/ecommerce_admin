import BannerGrid from 'components/BannerGrid';
import Category from 'components/Pages/Category';
import Review from 'components/Pages/Review';
import Product from 'components/Pages/Product';
import Slider from 'components/Pages/Slider';
import Attribute from 'components/Pages/Attribute';
import { RouteConfig } from "react-router-config";
import Customer from 'components/Pages/Customer';
import Order from 'components/Pages/Order';
import OrderReport from 'components/Pages/OrderReport';
import ProductSubscribers from 'components/Pages/ProductSubscribers';
import Config from 'components/Pages/Config';

const routes = ():RouteConfig[] => {
    return [
        {
            component: OrderReport,
            path: '/',
            exact: true
        },
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
            component: Review,
            path: '/reviews',
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
        },
        {
            component: Customer,
            path: '/customers',
            exact: true
        },
        {
            component: ProductSubscribers,
            path: '/subscribers',
            exact: true
        },
        {
            component: Order,
            path: '/orders',
            exact: true
        },
        {
            component: Config,
            path: '/config',
            exact: true
        }
    ]
}


export default routes
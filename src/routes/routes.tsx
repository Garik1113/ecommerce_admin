import BannerGrid from 'components/BannerGrid';
import Category from 'components/Pages/Category';
import Product from 'components/Pages/Product';
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
        }
    ]
}


export default routes
import React from 'react';
import {RouteConfig} from "react-router-config"
import Signup from 'components/Pages/Signup';
import Signin from 'components/Pages/Signin';

const authRoutes = ():RouteConfig[] => {
    return [
        {
            component: Signup,
            path: '/',
            exact: true
        },
        {
            component: Signin,
            path: '/signin',
            exact: true
        }
    ]
}


export default authRoutes
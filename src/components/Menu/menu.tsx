import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Menu } from 'semantic-ui-react'
import classes from './menu.css';

const MenuList = () => {
    const location = useLocation();
    const path = location.pathname;
    return (
        <div className={classes.root}>
          <Menu vertical className={classes.mainMenu}>
                <Link to="/">
                    <Menu.Item
                        className={classes.item}
                        name='Order Report'
                        active={path === '/'}
                    />
              </Link>
              <Link to="/categories">
                    <Menu.Item
                        className={classes.item}
                        name='Categories'
                        active={path === '/categories'}
                    />
              </Link>
              <Link to="/products">
                    <Menu.Item
                        name='Products'
                        active={path === '/products'}
                    />
              </Link>
              <Link to="/banners">
                    <Menu.Item
                        name='Banners'
                        active={path === '/banners'}
                    />
              </Link>
              <Link to="/reviews">
                    <Menu.Item
                        name='Reviews'
                        active={path === '/reviews'}
                    />
              </Link>
              <Link to="/sliders">
                    <Menu.Item
                        name='Sliders'
                        active={path === '/sliders'}
                    />
              </Link>
              <Link to="/attributes">
                    <Menu.Item
                        name='Attributes'
                        active={path === '/attributes'}
                    />
              </Link>
              <Link to="/customers">
                    <Menu.Item
                        name='Customers'
                        active={path === '/customers'}
                    />
              </Link>
              <Link to="/subscribers">
                    <Menu.Item
                        name='Product Notifications'
                        active={path === '/subscribers'}
                    />
              </Link>
              <Link to="/orders">
                    <Menu.Item
                        name='Orders'
                        active={path === '/orders'}
                    />
              </Link>
              <Link to="/config">
                    <Menu.Item
                        name='Config'
                        active={path === '/config'}
                    />
              </Link>
          </Menu>
        </div>
    )
}

export default MenuList;
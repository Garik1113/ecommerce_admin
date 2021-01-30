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
              <Link to="/testimonials">
                    <Menu.Item
                        name='Testimonials'
                        active={path === '/testimonials'}
                    />
              </Link>
          </Menu>
        </div>
    )
}

export default MenuList;
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
                    >
                        <i className="fas fa-border-none"></i>
                        <div className={classes.titleField}>
                            <span>Հաշվետվություն</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/categories">
                    <Menu.Item
                        className={classes.item}
                        name='Categories'
                        active={path === '/categories'}
                    >
                        <i className="fas fa-folder-open"></i>
                        <div className={classes.titleField}>
                            <span>Կատեգորիաներ</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/products">
                    <Menu.Item
                        className={classes.item}
                        name='Products'
                        active={path === '/products'}
                    >
                        <i className="fas fa-tshirt"></i>
                        <div className={classes.titleField}>
                            <span>Ապրանքներ</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/banners">
                    <Menu.Item
                        name='Banners'
                        className={classes.item}
                        active={path === '/banners'}
                    >
                        <i className="fas fa-film"></i>
                        <div className={classes.titleField}>
                            <span>Բաներներ</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/reviews">
                    <Menu.Item
                        className={classes.item}
                        name='Reviews'
                        active={path === '/reviews'}
                    >
                        <i className="fas fa-comments"></i>
                        <div className={classes.titleField}>
                            <span>Մեկնաբանություններ</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/sliders">
                    <Menu.Item
                        className={classes.item}
                        name='Sliders'
                        active={path === '/sliders'}
                    >
                        <i className="fas fa-chalkboard"></i>
                        <div className={classes.titleField}>
                            <span>Սլայդերներ</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/attributes">
                    <Menu.Item
                        className={classes.item}
                        name='Attributes'
                        active={path === '/attributes'}
                    >
                        <i className="fas fa-tools"></i>
                        <div className={classes.titleField}>
                            <span>Ատրիբուտներ</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/customers">
                    <Menu.Item
                        className={classes.item}
                        name='Customers'
                        active={path === '/customers'}
                    >
                        <i className="fas fa-user-friends"></i>
                        <div className={classes.titleField}>
                            <span>Օգտատերեր</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/subscribers">
                    <Menu.Item
                        className={classes.item}
                        name='Product Notifications'
                        active={path === '/subscribers'}
                    >
                        <i className="fas fa-bell"></i>
                        <div className={classes.titleField}>
                            <span>Ապրանքների Ծանուցումներ</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/orders">
                    <Menu.Item
                        className={classes.item}
                        name='Orders'
                        active={path === '/orders'}
                    >
                        <i className="fas fa-money-check-alt"></i>
                        <div className={classes.titleField}>
                            <span>Պատվերներ</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/faqs">
                    <Menu.Item
                        className={classes.item}
                        name='Faqs'
                        active={path === '/faqs'}
                    >
                        <i className="far fa-question-circle"></i>
                        <div className={classes.titleField}>
                            <span>Հաճախ տրվող հարցեր</span>
                        </div>
                    </Menu.Item>
              </Link>
              <Link to="/config">
                    <Menu.Item
                        className={classes.item}
                        name='Config'
                        active={path === '/config'}
                    >
                        <i className="fas fa-cogs"></i>
                        <div className={classes.titleField}>
                            <span>Կարգավորումներ</span>
                        </div>
                    </Menu.Item>
              </Link>
          </Menu>
        </div>
    )
}

export default MenuList;
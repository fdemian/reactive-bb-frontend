import { useState, Suspense } from 'react';
import { Drawer, Spin, Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignIn } from '@fortawesome/free-solid-svg-icons';
import DrawerToggleButton from './DrawerToggleButton';

const NavbarMobileUnlogged = ({ t }:{ t: (key:string) => string; }) => {

    const [drawerVisible, setDrawerVisible] = useState(false);
    const closeDrawer = () => setDrawerVisible(false);
    const openDrawer = () => setDrawerVisible(true);

    const items: MenuProps['items']  = [
        {
            key: 'login',
            label: (
                <Link
                    className="login-menu-link-mobile"
                    onClick={closeDrawer}
                    to="/login"
                    data-testid="login-link"
                >
                    <FontAwesomeIcon icon={faSignIn} />
                    &nbsp;
                    {t('login')}
                </Link>
            )
        },
        {
            key: 'register',
            label: (
                <Link className="login-menu-link-mobile" onClick={closeDrawer} to="/register">
                    <FontAwesomeIcon icon={faUserPlus} />
                    &nbsp;
                    {t('register')}
                </Link>
            )
        }
    ];


    return (
        <>
          <span className="mobile-drawer-toggle">
              <DrawerToggleButton
                t={t}
                openDrawer={openDrawer}
                isLoggedIn={false}
                showBadge={false}
                user={null}
              />
          </span>
            <Drawer
                open={drawerVisible}
                placement="right"
                onClose={closeDrawer}
                className="drawer-navbar"
                title={null}
            >
                <Suspense fallback={<Spin />}>
                    <Menu
                       onClick={undefined}
                       defaultSelectedKeys={[]}
                       defaultOpenKeys={[]}
                       mode="inline"
                       items={items}
                    />
                </Suspense>
            </Drawer>
        </>
    )
}

export default NavbarMobileUnlogged;



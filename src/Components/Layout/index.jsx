import { Link, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ThemeController from '../ThemeController/ThemeController';

const MENUS = [
    {
        name: 'Activity',
        link: '/',
        id: '123',
    },
    {
        name: 'Archive',
        link: '/archives',
        id: '235',
    },
];

const HideNavMenu = ['/details'];

const Layout = () => {
    const location = useLocation();

    const renderNavmenus = MENUS.map((menu) => (
        <Link
            to={menu.link}
            key={`navmenu-${menu.id}`}
            role="tab"
            className={`text-2xl tab ${
                menu.link === location.pathname ? 'tab-active rounded-sm' : ''
            }`}
        >
            {menu.name}
        </Link>
    ));

    return (
        <>
            <div className="flex items-center justify-end w-full !max-w-[1020px]">
                <ThemeController />
            </div>
            <main className="App !max-w-[820px] w-full">
                {!HideNavMenu.find((item) =>
                    location.pathname.includes(item)
                ) && (
                    <nav role="tablist" className="tabs tabs-boxed">
                        {renderNavmenus}
                    </nav>
                )}
                <Outlet />
            </main>
            <Toaster position="top-right" />
        </>
    );
};

export default Layout;

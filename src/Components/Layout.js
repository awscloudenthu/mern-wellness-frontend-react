import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from "./Navigation";
import Hero from './Hero';

const Layout = () => {
    const location = useLocation();
    return (
        <>
            <Navigation />
            {(location.pathname === "/" ||
                location.pathname === "/signin" ||
                location.pathname === "/signup" ||
                location.pathname === "/signout" ||
                location.pathname === "/about")
                && <Hero />}
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
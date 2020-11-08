import Link from 'next/link';
import React from 'react';

export const Menu = () => {

    const menu_items = [
        {
            link: '/dashboard',
            name: 'Dashboard',
        },
        {
            link: '/users',
            name: 'Users',
        },
        {
            link: '/roles',
            name: 'Roles',
        },
        {
            link: '/products',
            name: 'Products',
        },
        {
            link: '/orders',
            name: 'Orders',
        },
    ];

    const menu: JSX.Element[] = [];
    menu_items.forEach(({ name, link }) => {
        menu.push(
            <li className="nav-item" key={name}>
                <Link href={`${link}`}>
                    <a className="nav-link">{name}</a>
                </Link>
            </li>
        );
    });

    return (
        <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
            <div className="sidebar-sticky pt-3">
                <ul className="nav flex-column">{menu}</ul>
            </div>
        </nav>
    );
};

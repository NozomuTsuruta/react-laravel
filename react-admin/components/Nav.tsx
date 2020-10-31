import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useCookies } from 'react-cookie';

export const Nav = () => {
    const [, , delete_cookies] = useCookies();
    const route = useRouter();

    const logout = () => {
        delete_cookies('token');
        route.push('/login');
    };

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
                Company name
            </a>

            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <a className="nav-link" onClick={logout}>
                        Sign out
                    </a>
                </li>
            </ul>
        </nav>
    );
};

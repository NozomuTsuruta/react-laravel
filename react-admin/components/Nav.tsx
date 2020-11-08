import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { IStore } from '../redux/store';

export const Nav = () => {
    const [, , delete_cookies] = useCookies();
    const route = useRouter();
    const user = useSelector((state: IStore) => state.user);

    const logout = () => {
        delete_cookies('token');
        route.push('/login');
    };

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
                Company name
            </a>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link href={'/profile'}>
                    <a className="p-2 text-white">
                        {user?.first_name}
                        {user?.last_name}
                    </a>
                </Link>
                <a className="p-2 text-white" onClick={logout}>
                    Sign out
                </a>
            </ul>
        </nav>
    );
};

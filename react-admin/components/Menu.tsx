import Link from 'next/link';
import React from 'react';

export const Menu = () => (
    <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
        <div className="sidebar-sticky pt-3">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link href="/dashboard">
                        <a className="nav-link active" href="#">
                            Dashboard
                        </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/users/">
                        <a className="nav-link">
                            Users
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
);

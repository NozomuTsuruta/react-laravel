import Link from 'next/link';
import React, { FC } from 'react';

interface IProps {
    page: number;
    last_page: number;
    endpoint: string;
}

export const Paginetor: FC<IProps> = ({ page, last_page, endpoint }) => (
    <nav>
        <ul className="pagination">
            <li className="page-item">
                {page > 1 && (
                    <Link href={`/${endpoint}?page=${page - 1}`}>
                        <a className="page-link">Previous</a>
                    </Link>
                )}
            </li>
            <li className="page-item">
                {page < last_page && (
                    <Link href={`/${endpoint}?page=${page + 1}`}>
                        <a className="page-link">Next</a>
                    </Link>
                )}
            </li>
        </ul>
    </nav>
);

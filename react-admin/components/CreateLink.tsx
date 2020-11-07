import Link from 'next/link';
import React, { FC } from 'react';

interface IProps {
    endpoint: string;
}

export const Creater: FC<IProps> = ({ endpoint }) => (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border">
        <div className="btn-toolbar mb-2 mb-md-0">
            <Link href={`/${endpoint}/create`}>
                <a className="btn btn-sm btn-outline-secondary">Add</a>
            </Link>
        </div>
    </div>
);

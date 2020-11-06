import Axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IRole } from '../../Types';

const Roles = () => {
    const [roles, set_roles] = useState<IRole[]>([]);

    useEffect(() => {
        (async () => {
            const res = await Axios.get('/roles');
            set_roles(res.data.data);
        })();
    });

    const on_click_delete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await Axios.delete(`users/${id}`);
                set_roles((prev) => prev.filter((role) => role.id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link href="/roles/create">
                        <a className="btn btn-sm btn-outline-secondary">Add</a>
                    </Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map(({ id, name }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link href={`/roles/${id}/edit`}>
                                            <a className="btn btn-sm btn-outline-secondary">
                                                Edit
                                            </a>
                                        </Link>
                                        <a
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => on_click_delete(id)}
                                        >
                                            Delete
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Roles;

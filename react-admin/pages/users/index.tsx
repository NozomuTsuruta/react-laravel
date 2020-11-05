import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { IUser } from '../../Types';
import { useRouter } from 'next/dist/client/router';

const Users = () => {
    const [users, set_users] = useState<IUser[]>([]);
    const [last_page, set_last_page] = useState(0);
    const router = useRouter();
    const page = router.query.page;

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/users?page=${page}`);
            set_users(res.data.data);
            set_last_page(res.data.meta.last_page);
            if (!router.query.page) {
                router.push('/users?page=1');
            }
        })();
    }, [page]);

    const on_click_delete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`users/${id}`);
                set_users((prev) => prev.filter((user) => user.id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="d-flex justyfy-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mbo-md-0">
                    <Link href="/users/create">
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
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}r</td>
                                <td>{user.role.name}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <a className="btn btn-sm btn-outline-secondary">
                                            Edit
                                        </a>
                                        <a
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() =>
                                                on_click_delete(user.id)
                                            }
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

            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        {Number(page) > 1 && (
                            <Link href={`/users?page=${Number(page) - 1}`}>
                                <a className="page-link">Previous</a>
                            </Link>
                        )}
                    </li>
                    <li className="page-item">
                        {Number(page) < last_page && (
                            <Link href={`/users?page=${Number(page) + 1}`}>
                                <a className="page-link">Next</a>
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Users;

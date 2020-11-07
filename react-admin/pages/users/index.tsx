import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { IUser } from '../../Types';
import { useRouter } from 'next/dist/client/router';
import { Paginetor } from '../../components/Paginetor';
import { Deleter } from '../../components/Deleter';
import { Creater } from '../../components/CreateLink';
import { Table } from '../../components/Table';

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

    const handle_delete = (id: number) => {
        set_users((prev) => prev.filter((user) => user.id !== id));
    };

    return (
        <>
            <Creater endpoint="users" />
            <Table array={['Name', 'Email', 'Role', 'Action']}>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}r</td>
                        <td>{user.role.name}</td>
                        <td>
                            <div className="btn-group mr-2">
                                <Link href={`/users/${user.id}/edit`}>
                                    <a className="btn btn-sm btn-outline-secondary">
                                        Edit
                                    </a>
                                </Link>
                                <Deleter
                                    id={user.id}
                                    endpoint="users"
                                    handle_delete={handle_delete}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
            <Paginetor
                page={Number(page)}
                last_page={last_page}
                endpoint="users"
            />
        </>
    );
};

export default Users;

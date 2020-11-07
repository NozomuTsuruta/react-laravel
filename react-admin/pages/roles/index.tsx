import Axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Creater } from '../../components/CreateLink';
import { Deleter } from '../../components/Deleter';
import { IRole } from '../../Types';
import { Table } from '../../components/Table';

const Roles = () => {
    const [roles, set_roles] = useState<IRole[]>([]);

    useEffect(() => {
        (async () => {
            const res = await Axios.get('/roles');
            set_roles(res.data.data);
        })();
    }, []);

    const handle_delete = async (id: number) => {
        set_roles((prev) => prev.filter((role) => role.id !== id));
    };

    return (
        <>
            <Creater endpoint="roles" />
            <Table array={['Name','Action']}>
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
                                <Deleter
                                    id={id}
                                    endpoint="roles"
                                    handle_delete={handle_delete}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
        </>
    );
};

export default Roles;

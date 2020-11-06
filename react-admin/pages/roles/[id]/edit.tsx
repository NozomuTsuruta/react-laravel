import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IPermission, IRole } from '../../../Types';

interface IForm {
    name: string;
    [name: string]: string;
}

const RoleEdit = () => {
    const [role, set_role] = useState<IRole>();
    const [permissions, set_permissions] = useState<IPermission[]>([]);
    const { reset, register, handleSubmit } = useForm<IForm>();

    const router = useRouter();
    console.log(router.query.id);

    useEffect(() => {
        if (router.query.id) {
            (async () => {
                let res = await Axios.get('/permissions');
                set_permissions(res.data.data);
                res = await Axios.get(`/roles/${router.query.id}`);
                set_role(res.data.data);
            })();
        }
    }, [router.query.id]);

    const on_submit = async (data: IForm) => {
        const _permissions = Object.values(data)
            .map((value) => Number(value))
            .filter((value) => value && !isNaN(value));
        await Axios.put(`/roles/${router.query.id}`, {
            name: data.name,
            permissions: _permissions,
        });
        reset();
        router.push('/roles');
    };

    const default_checked = (id: number) => {
        const match_id = role?.permissions.find(
            (permission) => permission.id === id
        );
        return Boolean(match_id);
    };

    return (
        <form onSubmit={handleSubmit(on_submit)}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        ref={register({ required: true })}
                        defaultValue={role?.name}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Permissions</label>
                <div className="col-sm-10">
                    {permissions.length > 0 &&
                        permissions.map(({ name, id }) => (
                            <div
                                className="form-check form-check-inline col-3"
                                key={id}
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={name}
                                    name={name}
                                    ref={register}
                                    value={id}
                                    checked={default_checked(id)}
                                />
                                <label htmlFor={name}>{name}</label>
                            </div>
                        ))}
                </div>
            </div>
            <button className="btn btn-outline-secondary">Save</button>
        </form>
    );
};

export default RoleEdit;

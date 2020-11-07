import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IRole, IUser } from '../../../Types';

interface IForm {
    first_name: string;
    last_name: string;
    email: string;
    role_id: string;
}

const UserEdit = () => {
    const [roles, set_roles] = useState<IRole[]>([]);
    const { reset, register, handleSubmit } = useForm<IForm>();
    const router = useRouter();
    const [user, set_user] = useState<IUser>();

    useEffect(() => {
        if (router.query.id) {
            (async () => {
                let res = await Axios.get('/roles');
                set_roles(res.data.data);
                res = await Axios.get(`/users/${router.query.id}`);
                set_user(res.data.data);
            })();
        }
    }, [router.query.id]);

    const on_submit = async (data: IForm) => {
        await Axios.put(`/users/${router.query.id}`, data);
        reset();
        router.push('/users');
    };

    return (
        <form onSubmit={handleSubmit(on_submit)}>
            <div className="form-group">
                <label htmlFor="role">First Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    ref={register({ required: true })}
                    defaultValue={user?.first_name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    ref={register({ required: true })}
                    defaultValue={user?.last_name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    ref={register({ required: true })}
                    defaultValue={user?.email}
                />
            </div>
            <div className="form-group">
                <label htmlFor="role_id">Role</label>
                <select
                    name="role_id"
                    id="role_id"
                    className="form-control"
                    ref={register({ required: true })}
                >
                    {roles.length > 0 &&
                        roles.map(({ name, id }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                </select>
            </div>
            <button className="btn btn-outline-secondary">Save</button>
        </form>
    );
};

export default UserEdit;

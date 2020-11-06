import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IPermission } from '../../Types';

interface IForm {
    name: string;
    [name: string]: string;
}

const RoleCreate = () => {
    const [permissions, set_permissions] = useState<IPermission[]>([]);
    const { reset, register, handleSubmit } = useForm<IForm>();

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const res = await Axios.get('/permissions');
            set_permissions(res.data.data);
            console.log(res.data.data)
        })();
    }, []);

    const on_submit = async (data: IForm) => {
        await Axios.post('/roles', data);
        reset();
        router.push('/roles');
    };

    return (
        <form onSubmit={handleSubmit(on_submit)}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    ref={register({ required: true })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="role_id">Role</label>
                {permissions.length > 0 &&
                    permissions.map(({ name, id }) => (
                        <div className="form-check form-check-inline col-3" key={id}>
                            <input type="checkbox" className="form-check-input" id={name} name={name} ref={register} />
                            <label htmlFor={name}>
                              {name}
                            </label>
                        </div>
                    ))}
            </div>
            <button className="btn btn-outline-secondary">Save</button>
        </form>
    );
};

export default RoleCreate;

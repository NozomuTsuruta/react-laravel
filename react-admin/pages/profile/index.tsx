import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../redux/store';
import { set_user } from '../../redux/user/actions';

interface IUserInfo {
    first_name: string;
    last_name: string;
    email: string;
}

interface IUserPassword {
    password: string;
    password_confirm: string;
}

const Profile = () => {
    const user_info = useForm<IUserInfo>();
    const user_password = useForm<IUserPassword>();
    const user = useSelector((state: IStore) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const res = await Axios.get('/user');
            dispatch(set_user(res.data.data));
        })();
    }, []);

    const update_info = async (data: IUserInfo) => {
        await axios.put('/user/info', {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
        });
        user_info.reset();
    };

    const update_password = async (data: IUserPassword) => {
        await Axios.put('user/password', {
            password: data.password,
            password_confirm: data.password_confirm,
        });
        user_password.reset();
    };
    return (
        <>
            <form onSubmit={user_info.handleSubmit(update_info)}>
                <h2>Account Information</h2>
                <hr />
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="FirstName"
                        className="form-control"
                        placeholder="First Name"
                        name="first_name"
                        ref={user_info.register({ required: true })}
                        defaultValue={user?.first_name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        name="last_name"
                        ref={user_info.register({ required: true })}
                        defaultValue={user?.last_name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        name="email"
                        ref={user_info.register({ required: true })}
                        defaultValue={user?.email}
                    />
                </div>
                <button className="btn btn-outline-secondary" type="submit">
                    Save
                </button>
            </form>
            <form onSubmit={user_password.handleSubmit(update_password)}>
                <h2 className="mt-4">Change Password</h2>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        ref={user_password.register({ required: true })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Password Confirm</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        className="form-control"
                        placeholder="Password Confirm"
                        name="password_confirm"
                        ref={user_password.register({ required: true })}
                    />
                </div>
                <button className="btn btn-outline-secondary" type="submit">
                    Save
                </button>
            </form>
        </>
    );
};

export default Profile;

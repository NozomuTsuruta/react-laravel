import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../config/axios';

type FormData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirm: string;
};

const Register = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();

    //register
    const on_submit = async (data: FormData) => {
        try {
            const res = await axios.post(
                '/register',
                data
            );
            reset();
            console.log(res);
        } catch (res) {
            console.log(res);
        }
    };

    return (
        <form className="form-signin" onSubmit={handleSubmit(on_submit)}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="firstName" className="sr-only">
                First Name
            </label>
            <input
                type="text"
                id="FirstName"
                className="form-control"
                placeholder="First Name"
                name="first_name"
                ref={register({ required: true })}
            />
            <label htmlFor="lastName" className="sr-only">
                Last Name
            </label>
            <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Last Name"
                name="last_name"
                ref={register({ required: true })}
            />
            <label htmlFor="inputEmail" className="sr-only">
                Email address
            </label>
            <input
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                name="email"
                ref={register({ required: true })}
            />
            <label htmlFor="inputPassword" className="sr-only">
                Password
            </label>
            <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                name="password"
                ref={register({ required: true })}
            />
            <label htmlFor="passwordConfirm" className="sr-only">
                Password Confirm
            </label>
            <input
                type="password"
                id="passwordConfirm"
                className="form-control"
                placeholder="Password Confirm"
                name="password_confirm"
                ref={register({ required: true })}
            />
            <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
                Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
        </form>
    );
};

export default Register;

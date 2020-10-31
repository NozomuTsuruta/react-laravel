import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const router = useRouter();
    const [, set_cookies] = useCookies();

    const on_submit = async (data: FormData) => {
        const res = await axios.post('/login', {
            email: data.email,
            password: data.password,
        });
        set_cookies('token', res.data.token, { path: '/', maxAge: 3600 * 24 });
        console.log(data);
        router.push('/');
    };

    return (
        <form className="form-signin" onSubmit={handleSubmit(on_submit)}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
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

export default Login;

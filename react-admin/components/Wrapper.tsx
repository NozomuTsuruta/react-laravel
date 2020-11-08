import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { set_user } from '../redux/user/actions';

export const Wrapper: FC = ({ children }) => {
    const route = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const res = await Axios.get('/user');
                dispatch(set_user(res.data.data));
                if (
                    route.pathname === '/login' ||
                    route.pathname === '/register'
                ) {
                    route.push('/');
                }
            } catch {
                if (route.pathname !== '/register') {
                    route.push('/login');
                }
            }
        })();
    }, []);
    return <div>{children}</div>;
};

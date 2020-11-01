import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import { Nav } from '../components/Nav';
import { Menu } from '../components/Menu';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useCookies } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) {
    const [cookies] = useCookies();
    console.log(cookies['token']);
    axios.defaults.baseURL = 'http://localhost:8080/api';
    axios.defaults.headers.post['Content-Type'] =
        'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.Authorization = `Bearer ${cookies['token']}`;

    const route = useRouter();
    useEffect(() => {
        (async () => {
            try {
                await axios.get('/user');
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

    return (
        <div className="App">
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    <main
                        role="main"
                        className="col-md-9 ml-sm-auto col-lg-10 px-md-4"
                    >
                        <Component {...pageProps} />{' '}
                    </main>
                </div>
            </div>
        </div>
    );
}

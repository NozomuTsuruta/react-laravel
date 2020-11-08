import React from 'react';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import { Nav } from '../components/Nav';
import { Menu } from '../components/Menu';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Wrapper } from '../components/Wrapper';

export default function App({ Component, pageProps }: AppProps) {
    const [cookies] = useCookies();
    Axios.defaults.baseURL = 'http://localhost:8080/api';
    Axios.defaults.headers.post['Content-Type'] =
        'application/json;charset=utf-8';
    Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    Axios.defaults.headers.Authorization = `Bearer ${cookies['token']}`;

    return (
        <Provider store={store}>
            <Wrapper>
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
            </Wrapper>
        </Provider>
    );
}

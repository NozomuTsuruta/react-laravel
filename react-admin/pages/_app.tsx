import React from 'react'
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import { Nav } from '../components/Nav';
import { Menu } from '../components/Menu';

export default function App({ Component, pageProps }: AppProps) {
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

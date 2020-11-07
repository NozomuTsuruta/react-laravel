import Axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IProduct } from '../../Types';

const Roles = () => {
    const [products, set_products] = useState<IProduct[]>([]);

    useEffect(() => {
        (async () => {
            const res = await Axios.get('/products');
            set_products(res.data.data);
        })();
    }, []);

    const on_click_delete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await Axios.delete(`products/${id}`);
                set_products((prev) =>
                    prev.filter((product) => product.id !== id)
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link href="/products/create">
                        <a className="btn btn-sm btn-outline-secondary">Add</a>
                    </Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} width="50" />
                                </td>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link
                                            href={`/roles/${product.id}/edit`}
                                        >
                                            <a className="btn btn-sm btn-outline-secondary">
                                                Edit
                                            </a>
                                        </Link>
                                        <a
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() =>
                                                on_click_delete(product.id)
                                            }
                                        >
                                            Delete
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Roles;

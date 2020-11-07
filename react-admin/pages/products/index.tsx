import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IProduct } from '../../Types';
import { Paginetor } from '../../components/Paginetor';
import { Deleter } from '../../components/Deleter';
import { Creater } from '../../components/CreateLink';
import { Table } from '../../components/Table';

const Roles = () => {
    const [products, set_products] = useState<IProduct[]>([]);

    const [last_page, set_last_page] = useState(0);
    const router = useRouter();
    const page = router.query.page;

    useEffect(() => {
        (async () => {
            const res = await Axios.get(`/products?page=${page}`);
            set_products(res.data.data);
            set_last_page(res.data.meta.last_page);
            if (!router.query.page) {
                router.push('/products?page=1');
            }
        })();
    }, [page]);

    const handle_delete = async (id: number) => {
        set_products((prev) => prev.filter((product) => product.id !== id));
    };

    return (
        <>
            <Creater endpoint="products" />
            <Table array={['Image', 'Title', 'Description', 'Price', 'Action']}>
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
                                <Link href={`/products/${product.id}/edit`}>
                                    <a className="btn btn-sm btn-outline-secondary">
                                        Edit
                                    </a>
                                </Link>
                                <Deleter
                                    id={product.id}
                                    endpoint="products"
                                    handle_delete={handle_delete}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
            <Paginetor
                page={Number(page)}
                last_page={last_page}
                endpoint="products"
            />
        </>
    );
};

export default Roles;

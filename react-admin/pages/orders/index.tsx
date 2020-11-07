import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Paginetor } from '../../components/Paginetor';
import { Table } from '../../components/Table';
import { IOrder } from '../../Types';

const Orders = () => {
    const [orders, set_orders] = useState<IOrder[]>([]);
    const [last_page, set_last_page] = useState(0);
    const router = useRouter();
    const page = router.query.page;

    useEffect(() => {
        (async () => {
            const res = await Axios.get(`/orders?page=${page}`);
            set_orders(res.data.data);
            set_last_page(res.data.meta.last_page);
            if (!router.query.page) {
                router.push('/orders?page=1');
            }
        })();
    }, [page]);
    return (
        <>
            <Table array={['Name', 'Email', 'Total', 'Action']}>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>
                            {order.first_name}
                            {order.last_name}
                        </td>
                        <td>{order.email}</td>
                        <td>{order.total}</td>
                        <td>
                            <div className="btn-group mr-2">
                                <Link href={`orders/${order.id}`}>
                                    <a className="btn btn-sm btn-outline-secondary">
                                        View
                                    </a>
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
            <Paginetor
                page={Number(page)}
                last_page={last_page}
                endpoint="orders"
            />
        </>
    );
};

export default Orders;

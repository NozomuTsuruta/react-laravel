import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { IOrderItem } from '../../Types';

const OrderItems = () => {
    const [order_items, set_order_items] = useState<IOrderItem[]>([]);
    const router = useRouter();
    useEffect(() => {
        if (router.query.id) {
            (async () => {
                const res = await Axios.get(`/orders/${router.query.id}`);
                set_order_items(res.data.data.order_items);
            })();
        }
    }, []);

    return (
        <Table array={['Product Title', 'Price', 'Quantity']}>
            {order_items.map((order_item) => (
                <tr key={order_item.id}>
                    <td>{order_item.id}</td>
                    <td>
                        {order_item.product_title}
                    </td>
                    <td>{order_item.price}</td>
                    <td>{order_item.quantity}</td>
                </tr>
            ))}
        </Table>
    );
};

export default OrderItems;

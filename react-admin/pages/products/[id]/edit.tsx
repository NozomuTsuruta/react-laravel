import Axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageUpload } from '../../../components/ImageUpload';
import { IProduct } from '../../../Types';

interface IForm {
    title: string;
    description: string;
    image_name: string;
    price: number;
}

const ProductCreate = () => {
    const { reset, register, handleSubmit } = useForm<IForm>();
    const [product, set_product] = useState<IProduct>();
    const [image_url, set_image_url] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            (async () => {
                const res = await Axios.get(`/products/${router.query.id}`);
                set_product(res.data.data);
                set_image_url(res.data.data.image)
            })();
        }
    }, [router.query.id]);

    const on_submit = async (data: IForm) => {
        await Axios.post('/products', data);
        reset();
        router.push('/products');
    };

    const image_changed = (image: string) => {
        set_image_url(image);
    };

    return (
        <form onSubmit={handleSubmit(on_submit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    ref={register({ required: true })}
                    defaultValue={product?.title}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    ref={register({ required: true })}
                    defaultValue={product?.description}
                >
                </textarea>
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        name="image"
                        id="image"
                        value={image_url}
                        ref={register({ required: true })}
                    />
                    <ImageUpload image_changed={image_changed} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    className="form-control"
                    name="price"
                    ref={register({ required: true })}
                    defaultValue={String(product?.price)}
                />
            </div>
            <button className="btn btn-outline-secondary">Save</button>
        </form>
    );
};

export default ProductCreate;

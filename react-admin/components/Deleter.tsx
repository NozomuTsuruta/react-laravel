import Axios from 'axios';
import React, { FC } from 'react';

interface IProps {
    id: number;
    endpoint: string;
    handle_delete: (id: number) => void;
}

export const Deleter: FC<IProps> = ({ id, endpoint, handle_delete }) => {
    const on_click_delete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await Axios.delete(`${endpoint}/${id}`);
                handle_delete(id);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <a
            className="btn btn-sm btn-outline-secondary"
            onClick={() => on_click_delete(id)}
        >
            Delete
        </a>
    );
};

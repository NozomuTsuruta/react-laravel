import Axios from 'axios';
import React, { FC } from 'react';

interface IProps {
    image_changed: (image: string) => void;
}

export const ImageUpload: FC<IProps> = ({ image_changed }) => {
    const upload = async (files: FileList | null) => {
        if (files === null) return;

        const data = new FormData();
        data.append('image', files[0]);

        const res = await Axios.post('/upload', data);
        image_changed(res.data.url);
    };
    return (
        <div className="input-group-append">
            <label className="btn btn-primary">
                Upload{' '}
                <input
                    type="file"
                    hidden
                    name="upload"
                    onChange={(e) => upload(e.target.files)}
                />
            </label>
        </div>
    );
};

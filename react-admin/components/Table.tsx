import React, { FC } from 'react';

interface IProps {
    array: string[];
}

export const Table: FC<IProps> = ({ array, children }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        {array.map((el) => {
                            <th>{el}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
};

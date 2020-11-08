import React, { useEffect } from 'react';
import c3 from 'c3';
import Axios from 'axios';

const DashBoard = () => {
    useEffect(() => {
        (async () => {
            let chart = c3.generate({
                bindto: '#chart',
                data: {
                    x: 'x',
                    columns: [['x'], ['Sales']],
                    types: {
                        Sales: 'bar',
                    },
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y-%m-%d',
                        },
                    },
                },
            });

            const res = await Axios.get('/chart');

            const records: { date: string; sum: number }[] = res.data.data;

            chart.load({
                columns: [
                    ['x', ...records.map((r) => r.date)],
                    ['Sales', ...records.map((r) => r.sum)],
                ],
            });
        })();
    }, []);
    return (
        <>
            <h2>Daily Sales</h2>
            <div id="chart" />
        </>
    );
};

export default DashBoard;

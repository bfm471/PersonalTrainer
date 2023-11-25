import React, { useState, useEffect } from 'react';
import { AgChartsReact } from 'ag-charts-react';

export default function ChartExample() {

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setOptions({ ...options, data: exercises });
    }, [exercises]);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                setExercises(responseData);
                console.log(responseData);
            })
            .catch(error => console.error(error));
    };

    const [options, setOptions] = useState({
        data: exercises,
        theme: "ag-solar",
        title: { text: 'Reservations per type of activity' },
        subtitle: { text: 'in minutes' },
        width: window.innerWidth*0.8,
        height: window.innerHeight*0.8,
        padding: {
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
        },
        series: [
            { type: 'column', xKey: 'activity', yKey: 'duration' },
        ],
        axes: [
            {
                type: 'category',
                position: 'bottom',
            },
            {
                type: 'number',
                position: 'left',
                title: { text: 'Duration (min)' },
            },
        ],
    });
    return (
        <div>
        <AgChartsReact options={options} />
        </div>
    )
}

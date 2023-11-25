import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = dayjsLocalizer(dayjs)

export default function MyCalendar() {
    const [myEventsList, setMyEventsList] = useState([])
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                const formatData = data.map((exercise) => ({
                    title: `${exercise.activity} / ${exercise.customer.firstname} ${exercise.customer.lastname}`,
                    start: new Date(exercise.date),
                    end: new Date(dayjs(exercise.date).add(exercise.duration, 'minutes')),
                    customer: exercise.customer,
                  }));                
                  console.log(formatData)
                setMyEventsList(formatData);
            })
            .catch(error => console.error(error))
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: window.innerHeight*0.87, width: window.innerWidth*0.95 }}
            />
        </div>
    )
};


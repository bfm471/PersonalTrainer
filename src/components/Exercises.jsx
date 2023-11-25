import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Exercises() {

    useEffect(() => fetchData(), []);

    const [exercises, setExercises] = useState([]);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                setExercises(data)
            })
            .catch(error => console.error(error))
    };

    const deleteExercise = id => {
        const options = { method: 'delete' }
        const href = "https://traineeapp.azurewebsites.net/api/trainings/" + id
        console.log(href)

        if (window.confirm('Delete exercise?')) {
            fetch(href, options)
                .then(_ => fetchData())
                .catch(error => console.error(error))
        }
    };

    const columns = [
        { field: "activity" },
        {
            field: "date",
            headerName: "Date",
            valueGetter: params => {
                const formattedDate = dayjs(params.data.date).format('DD/MM/YYYY, hh:mm A');
                return formattedDate;
            }

        },
        { field: "duration" },
        {
            headerName: "Customer Name",
            valueGetter: params => {
                const customer = params.data.customer;
                return `${customer.firstname} ${customer.lastname}`;
            }
        },
        {
            headerName: "",
            sortable: false,
            filter: false,
            floatingFilter: false,
            width: 10,
            cellRenderer: params => {
                return (
                    <Tooltip title="Delete exercise">
                        <DeleteIcon
                            color='error'
                            cursor='pointer'
                            fontSize='small'
                            onClick={() => {
                                // console.log(params.data.id)
                                deleteExercise(params.data.id)
                            }}
                        />
                    </Tooltip>
                )
            }
        }
    ];

    return (
        <div>
            <div className='ag-theme-material'
                style={{ height: "1000px", width: "1600px", margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={exercises}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        floatingFilter: true
                    }}>
                </AgGridReact>
            </div>
        </div>
    );
};


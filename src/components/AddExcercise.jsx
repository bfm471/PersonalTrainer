import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export default function AddExercise(props) {

    const { customer, saveObject } = props;
    const [open, setOpen] = useState(false);
    const [exercise, setExercise] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: customer.data.links[0].href
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChangeInput = event => {
        if (event.target.name === 'date') {
            const isoDate = new Date(event.target.value).toISOString();
            setExercise({ ...exercise, date: isoDate })
        } else {
            setExercise({ ...exercise, [event.target.name]: event.target.value })
        }
    };

    const handleSave = () => {
        saveObject(exercise, 'https://traineeapp.azurewebsites.net/api/trainings', 'post')
        handleClose
    }

    return (
        <div>
            <Tooltip title="Add exercise">
                <AddIcon
                    color='primary'
                    cursor='pointer'
                    fontSize='small'
                    onClick={handleClickOpen}
                />
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add exercise</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        value={`${customer.data.firstname} ${customer.data.lastname}`}
                        label='Customer'
                        type='text'
                        fullWidth
                        variant='standard'
                        inputProps={{readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        id='date'
                        name='date'
                        label='Date'
                        type='datetime-local'
                        fullWidth
                        variant='standard'
                        onChange={event => handleChangeInput(event)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        id='duration'
                        name='duration'
                        label='Duration (min)'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={event => handleChangeInput(event)}
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        id='activity'
                        name='activity'
                        label='Activity'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={event => handleChangeInput(event)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
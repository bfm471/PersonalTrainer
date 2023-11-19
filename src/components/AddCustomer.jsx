import React from "react";
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from "@mui/material";

export default function AddCustomer(props) {
    

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });
    const { saveObject } = props;

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChangeInput = event => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    };

    const handleSave = () => {
        saveObject(customer, 'http://traineeapp.azurewebsites.net/api/customers', 'post');
        setOpen(false);
    };
    

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                New Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        label="Firstname"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={event => handleChangeInput(event)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        label="Lastname"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={event => handleChangeInput(event)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="streetaddress"
                        name="streetaddress"
                        label="Streetaddress"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={event => handleChangeInput(event)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="postcode"
                        name="postcode"
                        label="Postcode"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={event => handleChangeInput(event)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={event => handleChangeInput(event)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={event => handleChangeInput(event)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="phone"
                        type="Phone"
                        fullWidth
                        variant="standard"
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
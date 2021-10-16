import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState, useRef } from 'react'
import API from '../api';


const CheckIn = () => {
    let input = useRef(null);
    let name = useRef(null);
    let message = useRef(null);
    let id = useRef(null);
    let [newUser, setNewuser] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {

            if (newUser) {
                // get name create entry in db
                name.current = input.current.value;
                API.post('/hackers', {
                    "tech": [],
                    "id": id.current,
                    "name": name.current,
                    "checkedIn": true
                }).then(res => {
                    if (res.status === 200) {
                        message.current = 'User Created: ' + name.current;
                        handleOpen();
                        setNewuser(false);
                    }
                })
            }
            else {
                // get id and check if id exist
                id.current = input.current.value;
                API.get('/hackers/' + id.current).then(res => {
                    if (res.data.Item) {
                        // update status
                        let hacker = res.data.Item;
                        hacker.checkedIn = !hacker.checkedIn;
                        API.put('/hackers/' + id.current, hacker).then(res => {
                            if (res.status === 200) {
                                if (hacker.checkedIn) {
                                    console.log('User Checked In');
                                    message.current = 'User Checked In: ' + hacker.name;
                                    handleOpen();
                                }
                                else {
                                    console.log('User Checked Out');
                                    message.current = 'User Checked Out: ' + hacker.name;
                                    handleOpen();
                                }
                            }
                        })
                    }
                    else {
                        setNewuser(true);
                    }
                })


            }
            input.current.value = '';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: '20vh', mb: '20vh' }}>
            <Snackbar
                open={open}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message.current}
                </Alert>
            </Snackbar>
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
            >
                <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                    <Typography variant="h1" gutterBottom component="div">
                        {newUser ? 'Enter Your Full Name' : 'Check In/Out'}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        fullWidth
                        onKeyPress={handleKeyPress}
                        inputRef={input}
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default CheckIn;
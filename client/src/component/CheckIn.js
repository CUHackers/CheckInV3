import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState, useRef } from 'react'
import API from '../api';


const CheckIn = () => {
    let input = useRef(null);
    let name = useRef(null);
    let id = useRef(null);
    let [newUser, setNewuser] = useState(false);

    // need to test which one to use
    const handleOnChange = (event) => {
        console.log(event.target.value);
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
                    if (res.status == 200) {
                        setNewuser(false);
                    }
                })
            }
            else {
                // get id and check if id exist
                id.current = input.current.value;
                console.log(id.current)
                API.get('/hackers/' + id.current).then(res => {
                    if (res.data.Item) {
                        // update status
                        let hacker = res.data.Item;
                        hacker.checkedIn = !hacker.checkedIn;
                        API.put('/hackers/' + id.current, hacker).then(res => {
                            if (res.status == 200) {
                                if (hacker.checkedIn) {
                                    console.log('User Checked In');
                                }
                                else {
                                    console.log('User Checked Out');
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
        <Container maxWidth="xl" sx={{ mt: '20vh', mb: '20vh' }}>
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
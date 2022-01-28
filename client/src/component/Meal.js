import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import API from '../api';

const Meal = () => {
    let input = useRef(null);
    let id = useRef(null);
    let mealNum = useRef(1);
    let message = useRef(null);
    const [open, setOpen] = useState(false);
    const [meal1Active, setMeal1] = React.useState(true);
    const [meal2Active, setMeal2] = React.useState(false);
    const [meal3Active, setMeal3] = React.useState(false);
    const [meal4Active, setMeal4] = React.useState(false);
    const [meal5Active, setMeal5] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    // Handles entering rfid
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            id.current = input.current.value;
            input.current.value = '';

            API.get('/hackers/' + id.current).then(res => {
                if (res.data.Item) {
                    let hacker = res.data.Item;
                    if (hacker){
                        
                        // Takes away a meal swipe for the correct meal
                        let validSwipe = true;
                        switch(mealNum.current){
                            case 1:
                                if (hacker.meal1){
                                    hacker.meal1 = false;
                                } else {
                                    validSwipe = false;
                                }
                                break;
                            case 2:
                                if (hacker.meal2){
                                    hacker.meal2 = false;
                                } else {
                                    validSwipe = false;
                                }
                                break;
                            case 3:
                                if (hacker.meal3){
                                    hacker.meal3 = false;
                                } else {
                                    validSwipe = false;
                                }
                                break;
                            case 4:
                                if (hacker.meal4){
                                    hacker.meal4 = false;
                                } else {
                                    validSwipe = false;
                                }
                                break;
                            case 5:
                                if (hacker.meal5){
                                    hacker.meal5 = false;
                                } else {
                                    validSwipe = false;
                                }
                                break;
                            default:
                        }
                        
                        // If it was a valid meal swipe display a success message
                        // Else display an error message
                        if (validSwipe){
                            API.put('/hackers/' + hacker.id, hacker).then(res => {
                                if (res.status === 200){
                                    message.current = hacker.hackerName + ' used meal swipe ' + mealNum.current;
                                    handleOpen();
                                }
                            })
                        } else {
                            message.current = hacker.hackerName + ' has already used a meal swipe for this meal!';
                            handleOpen();
                        }
                    }
                } else {
                    console.log('User not found');
                }                
            })
        }
    };

    // Sets the current meal to the selected meal swipe
    const handleButtonPress = (value) => {
        setMeal1(false);
        setMeal2(false);
        setMeal3(false);
        setMeal4(false);
        setMeal5(false);

        switch(value){
            case 1:
                setMeal1(true);
                mealNum.current = 1;
                break;
            case 2:
                setMeal2(true);
                mealNum.current = 2;
                break;
            case 3:
                setMeal3(true);
                mealNum.current = 3;
                break;
            case 4:
                setMeal4(true);
                mealNum.current = 4;
                break;
            case 5:
                setMeal5(true);
                mealNum.current = 5;
                break;
            default:
                break;
        }
    }

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
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
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
                        Meal
                    </Typography>
                    <Box sx={{ '& button': { m: 1 } }}>
                        <div>
                            <Button variant="contained" size="large" disabled={meal1Active} onClick={() => handleButtonPress(1)}>
                            Meal 1
                            </Button>
                            <Button variant="contained" size="large" disabled={meal2Active} onClick={() => handleButtonPress(2)}>
                            Meal 2
                            </Button>
                            <Button variant="contained" size="large" disabled={meal3Active} onClick={() => handleButtonPress(3)}>
                            Meal 3
                            </Button>
                            <Button variant="contained" size="large" disabled={meal4Active} onClick={() => handleButtonPress(4)}>
                            Meal 4
                            </Button>
                            <Button variant="contained" size="large" disabled={meal5Active} onClick={() => handleButtonPress(5)}>
                            Meal 5
                            </Button>
                        </div>
                    </Box>
                    <Typography 
                    variant="h3" 
                    gutterBottom component="div" 
                    style={{
                        paddingTop: '30px',
                    }}>
                        Scan RFID Card
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

export default Meal;
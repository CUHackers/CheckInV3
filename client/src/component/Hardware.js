import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useRef, useState } from 'react'

const HardwareList = () => {
    let input = useRef(null);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value);
            input.current.value = '';
        }
    }
    
    return (
        <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
        >
            <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                <Typography variant="h1" gutterBottom component="div">
                    Hardware
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
    );
} 

const IdInput = () => {
    let input = useRef(null);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value);
            input.current.value = '';
        }
    }
    
    return (
        <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
        >
            <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                <Typography variant="h1" gutterBottom component="div">
                    Hardware
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
    );
} 

const Hardware = () => {
    let [user, setUser] = useState(false);

    return (
        <Container maxWidth="lg" sx={{ mt: '20vh', mb: '20vh' }}>
            {user ? <HardwareList /> : <IdInput />}
        </Container>
    );

}

export default Hardware;
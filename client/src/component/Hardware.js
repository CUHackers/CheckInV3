import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { Fragment, useRef, useState } from 'react'

const Hardware = () => {
    let tech = useRef(null);
    let id = useRef(null);
    let input = useRef(null);
    let [user, setUser] = useState(false);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            id.current = input.current.value;
            console.log(id.current);
            input.current.value = '';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: '20vh', mb: '20vh' }}>
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
            >
                {user ? 
                    <Fragment>
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
                    </Fragment>
                    :
                    <Fragment>
                        <Grid item xs={12} md={6}>
                            
                        </Grid>
                    </Fragment>

                }
            </Grid>
        </Container>
    );

}

export default Hardware;
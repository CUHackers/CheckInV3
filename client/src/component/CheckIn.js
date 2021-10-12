import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const CheckIn = () => {
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
                        Check In/Out
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth id="outlined-basic" variant="outlined" />
                </Grid>
            </Grid>
        </Container>
    );
}

export default CheckIn;
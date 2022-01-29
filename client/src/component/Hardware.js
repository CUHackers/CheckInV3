import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import React, { Fragment, useRef, useState, useEffect } from 'react'
import API from '../api';

const Hardware = () => {
    let id = useRef(null);
    let hacker = useRef(null);
    let input = useRef(null);
    let [techs, setTechs] = useState([]);
    let [user, setUser] = useState(false);
    let techItem;

    const toggleUser = () => {
        setUser(false);
    }

    const deleteItem = (tech) => {
        let index = hacker.current.tech.indexOf(tech);
        if (index !== -1) {
            hacker.current.tech.splice(index, 1);
        }
        console.log(hacker.current.tech)
        API.put('/hackers/' + id.current, hacker.current).then(res => {
            if (res.status === 200) {
                setTechs([...hacker.current.tech]);
                console.log('Item Deleted');
            }
        })
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (!user) {
                id.current = input.current.value;
                API.get('/hackers/' + id.current).then(res => {
                    if (res.data.Item) {
                        // get current tech
                        hacker.current = res.data.Item;
                        setTechs([...hacker.current.tech]);
                        setUser(true);
                    }
                })
            }
            else {
                techItem = input.current.value;
                hacker.current.tech.push(techItem);
                API.put('/hackers/' + id.current, hacker.current).then(res => {
                    if (res.status === 200) {
                        setTechs([...hacker.current.tech]);
                        console.log('Tech List Updated');
                    }
                })
            }
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
                {!user ?
                    <Fragment>
                        <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                            <Typography variant="h1" gutterBottom component="div">
                                Hardware
                            </Typography>
                        </Grid>
                    </Fragment>
                    :
                    <Fragment>
                        <Grid item xs={12} md={6}>
                            <List
                                sx={{ bgcolor: 'background.paper', maxHeight: 200, overflow: 'auto' }}
                                subheader={
                                    <ListSubheader>
                                        <IconButton onClick={toggleUser}>
                                            <ChevronLeftIcon />
                                        </IconButton>
                                        <Divider />
                                        <Typography>
                                            {hacker.current.name}
                                        </Typography>
                                        <Divider />
                                    </ListSubheader>
                                }
                            >
                                {techs.length > 0 ?
                                    <Fragment>
                                        {techs.map(tech => (
                                            <ListItem key={tech}
                                                secondaryAction={
                                                    <IconButton onClick={() => deleteItem(tech)} edge="end" aria-label="delete">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                }
                                            >
                                                <ListItemText
                                                    primary={tech}
                                                />
                                            </ListItem>
                                        ))}
                                    </Fragment>
                                    :
                                    <ListItem>
                                        <ListItemText
                                            primary="No Hardware Checked Out"
                                        />
                                    </ListItem>
                                }
                            </List>

                        </Grid>
                    </Fragment>
                }
                <Typography 
                    variant="h3"
                    style={{ textAlign: "center" }}
                >
                    Scan RFID Card
                </Typography>
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

export default Hardware;
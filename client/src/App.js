import React from "react";
import Home from "./component/Home";
import NotFound from "./component/NotFound";
import NavBar from "./component/NavBar/NavBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./component/Register";
import Checkin from "./component/Checkin"
import Meal from "./component/Meal";
import Hardware from "./component/Hardware";

function App() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Router>
                <NavBar />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Switch>
                        <Route exact path = "/" component={Home} />
                        <Route exact path = "/register" component={Register} />
                        <Route exact path = "/checkin" component={Checkin}/>
                        <Route exact path = "/meal" component={Meal} />
                        <Route exact path = "/hardware" component={Hardware} />
                        <Route component ={NotFound} />
                    </Switch>
                </Box >
            </Router>
        </Box >
    );
}

export default App;
import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HandymanIcon from '@mui/icons-material/Handyman';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

function ListItemLink(props) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef(function Link(itemProps, ref) {
                return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
            }),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

const NavList = () => {
    return (
        <List>
            <div>
                <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
                <ListItemLink to="/register" primary="Register" icon={<AddBoxIcon />} />
                <ListItemLink to="/checkin" primary="Check In/Out" icon={<PersonIcon />}/>
                <ListItemLink to="/meal" primary="Meal" icon={<FastfoodIcon />} />
                <ListItemLink to="/hardware" primary="Hardware" icon={<HandymanIcon />} />
            </div>
        </List>
    );
}

export default NavList;
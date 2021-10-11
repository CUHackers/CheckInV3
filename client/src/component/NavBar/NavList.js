import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HandymanIcon from '@mui/icons-material/Handyman';
import EventNoteIcon from '@mui/icons-material/EventNote';

const NavList = () => {
    return (
        <List>
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <EventNoteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Status" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Check In/Out" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <FastfoodIcon />
                    </ListItemIcon>
                    <ListItemText primary="Meal" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <HandymanIcon />
                    </ListItemIcon>
                    <ListItemText primary="Hardware" />
                </ListItem>
            </div>
        </List>
    );
}

export default NavList;
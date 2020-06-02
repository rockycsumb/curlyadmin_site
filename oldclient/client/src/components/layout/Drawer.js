import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
	
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >  
	  <List>
          <ListItem button>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
		  <ListItem button>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
            <ListItemText primary="Services" />
          </ListItem>
		  <ListItem button>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
		  <ListItem button>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
      </List>
      
    </div>
  );

  return (
    <div>
		  
		  	
				
		{['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
			<IconButton>
				<MenuIcon />  
			</IconButton>	 
		  </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
			  
			
		
      
    </div>
  );
}
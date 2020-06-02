import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@material-ui/styles';
import FaceIcon from '@material-ui/icons/Face';
import Drawer from './Drawer';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
      primary: {
		  main: orange[500]
	  },
	  secondary: green
  },
});


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
	  width: "100%"
  },
  menuButton: {
    marginRight: theme.spacing(2),
	
  },
  title: {
    flexGrow: 1,
  },
	linkButtons: {
		marginLeft: theme.spacing(1),
		marginTop: "5px",
		[theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  hamburger: {
	 
	  [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  }
	

}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
		<ThemeProvider theme={theme}>
		  <AppBar position="fixed" elevation={0} color="primary">
			<Toolbar >
			  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

			  </IconButton>
			  <Typography variant="h6" className={classes.title}>
				  <FaceIcon style={{verticalAlign: "-5px"}}/>
				VirtualAdmin.io
			  </Typography>
				<div className={classes.linkButtons}>
					<Button color="inherit">Home</Button>
					<Button color="inherit">Services</Button>
					<Button color="inherit">Contact</Button>
					<Button color="inherit">Login</Button>
				</div>
				

				<div className={classes.hamburger}>
					<Drawer  />
				</div>
				
			</Toolbar>
		  </AppBar>
		</ThemeProvider>
		  
		  
    </div>
  );
}
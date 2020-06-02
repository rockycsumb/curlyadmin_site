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
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@material-ui/styles';
import FaceIcon from '@material-ui/icons/Face';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
      primary: {
		  main: orange[300]
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

}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
		<ThemeProvider theme={theme}>
		  <AppBar color="primary">
			<Toolbar >
			  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

			  </IconButton>
			  <Typography variant="h6" className={classes.title}>
				  <FaceIcon style={{verticalAlign: "-5px"}}/>
				VirtualAdmin.io
			  </Typography>
			  <Button color="inherit">Login</Button>
			</Toolbar>
		  </AppBar>
		</ThemeProvider>
    </div>
  );
}
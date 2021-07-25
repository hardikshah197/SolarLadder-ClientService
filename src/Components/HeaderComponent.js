import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));


export default function Header() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Book Tabs
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar>
                <Typography variant="h6" color="primary" noWrap>
                    <Button style={{color:"blue"}} onClick={() => window.open(`${process.env.REACT_APP_LOCAL_URL}/inventry`, '_self')} >
                        Add Inventry
                    </Button>
                </Typography>
                <Typography variant="h6" color="inherit" noWrap>
                    <Button style={{color:"blue"}} onClick={() => window.open(`${process.env.REACT_APP_LOCAL_URL}/item`, '_self')}>
                        Add Item
                    </Button>
                </Typography>
                <Typography variant="h6" color="inherit" noWrap>
                    <Button style={{marginLeft:1500,color:"blue"}} onClick={() => window.open(`${process.env.REACT_APP_LOCAL_URL}`, '_self')} >
                        Dashboard
                    </Button>
                </Typography>
            </Toolbar>
        </React.Fragment>
    )
}
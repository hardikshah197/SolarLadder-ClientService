import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Header from './HeaderComponent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import {useLocation} from 'react-router-dom';
import fetch from 'node-fetch';


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
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Item(props) {
  const location = useLocation();
  const classes = useStyles();
  const [item, setItem] = useState({
    "category": [
      "C1"
    ],
    "item_type": "A",
    "name": "",
    "item_code": "",
    "item_detail": "",
    "amount": 0,
    "item_image": "",
    "tax_rate": 0,
    "is_inventry":false,
    "unit":"FEETS"
  })

  useEffect(()=> {
    if(location.state){
      setItem(location.state.item);
      console.log(location.state.item)
    }
  },[]);

  const handleChange = e => {
    let {name,value} = e.target;
    console.log(name+" --- "+value)
    if(name === 'category'){
      setItem({...item, [name]: value === 10 ? ['C1'] : ['C2'] });
    }
    else if(name === 'unit'){
      setItem({...item, [name]: value === 10 ? 'FEETS' : 'INCHES'})
    }
    else if(name === 'item_type'){
      setItem({...item, [name]: value === 10 ? 'A' : 'B'})
    }
    else if(name === 'item_code'){
      setItem({...item, [name]: value === 10 ? 'i-001' : 'i-002'})
    }
    else {
      setItem({...item, [name]:value });
    }
  }

  const handleSubmit = () => {
    let method='POST';
    if(item._id){
      method='PUT'
      item['itemId'] = item._id
    }
    fetch(`${process.env.REACT_APP_URL}/api/item`,{
      method,
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify(item)
    })
    .then(resp => resp.json())
    .then(data => alert(data.message))
    .catch(err => alert(JSON.stringify(err.message)));
  }

  return (
    <React.Fragment>
      <Header />
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Fill Information
          </Typography>
          <Typography variant="h6" gutterBottom>
              General Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  value={item.name}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="details"
                  name="item_detail"
                  label="Details"
                  value={item.item_detail}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Units</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="unit"
                    value={item.unit === 'INCHES' ? 20 : 10}
                    onChange={handleChange}
                    label="Units"
                  >
                    <MenuItem value={10}>FEETS</MenuItem>
                    <MenuItem value={20}>INCHES</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Item Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="item_type"
                    value={item.item_type === 'A' ? 10 : 20}
                    onChange={handleChange}
                    label="Item Type"
                  >
                    <MenuItem value={10}>A</MenuItem>
                    <MenuItem value={20}>B</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Group</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="category"
                    value={item.category[0] === 'C1' ? 10 : 20}
                    onChange={handleChange}
                    label="Category"
                  >
                    <MenuItem value={10}>C1</MenuItem>
                    <MenuItem value={20}>C2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl} style={{marginLeft: 50}}>
                  <InputLabel id="demo-simple-select-outlined-label">Item Code</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={item.item_code === 'i-001' ? 10 : 20}
                      onChange={handleChange}
                      name="item_code"
                      label="Item Code"
                    >
                      <MenuItem value={10}>i - 001</MenuItem>
                      <MenuItem value={20}>i - 002</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="amount"
                  name="amount"
                  label="Amount"
                  value={item.amount}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="taxRate"
                  name="tax_rate"
                  label="Tax Rate %"
                  value={item.tax_rate}
                  onChange={handleChange}
                  fullWidth
                />
                <FormHelperText>Enter 0 for no tax charges</FormHelperText>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Image Upload
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload File :-
                  <input
                    type="file"
                    name="item_image"
                    onChange={handleChange}
                  />
                </Button>
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.button}
              >
              {'Record'}
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
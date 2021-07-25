import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from './HeaderComponent';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import fetch from 'node-fetch';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    flexGrow: 1,
  },
});


export default function Dashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  const [setTab, setSetTab] = useState(1);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/api/item`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(rows);
        setRows(data['data'].filter(i => i.is_inventry));
      })
      .catch(err => alert(JSON.stringify(err)))
  },[])

  const handleChange = (event, newValue) => {
    console.log('Tab switched :: '+newValue);
    setSetTab(newValue);
    if(newValue === 0){
      fetch(`${process.env.REACT_APP_URL}/api/item`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(data => {
        console.log('item');
        setRows(data.data);
      })
      .catch(err => alert(JSON.stringify(err)))
    }
    else {
      fetch(`${process.env.REACT_APP_URL}/api/item`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(data => {
        console.log('inventry');
        setRows(data['data'].filter(i => i.is_inventry));
      })
      .catch(err => alert(JSON.stringify(err)))
    }
  };

  const handleEdit = (event, item, route) => {
    history.push({
      pathname:`/${route}`,
      state:{
        item
      }
    });
  }

  return (
    <TableContainer component={Paper}>
      <Header />
      <Paper className={classes.root}>
        <Tabs
          value={setTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
        <Tab value={0} label="Item" />
        <Tab value={1} label="Inventry" />
      </Tabs>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Group</TableCell>
            <TableCell align="right">Item Type</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Item Code</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.category[0]}</TableCell>
              <TableCell align="right">{row.item_type}</TableCell>
              <TableCell align="right">{row.amount + row.amount*row.tax_rate/100}</TableCell>
              <TableCell align="right">{row.item_code}</TableCell>
              <TableCell align="right">{row.is_inventry ? 'Inventry' : 'Item'}</TableCell>
              <TableCell align="right">{
                setTab === 0 ? !row.is_inventry ? <button onClick={e => handleEdit(e,row,'item')}>edit</button> : 'NA' :
                <button onClick={e => handleEdit(e,row,'inventry')}>edit</button>
              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </TableContainer>
  );
}
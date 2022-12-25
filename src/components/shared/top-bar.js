import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@mui/material/Button';



const useStyles = makeStyles({
  root: {
    width: "calc(100%-12px)",
    height: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 'auto',
    padding: '6px'
  },
  radio: {
    width: '30px !important',
    height: '30px !important',
    '&$checked': {
      color: '#4E342E !important',
    }
  },
  checked: {}
});


const TopBar = () => {
  // const state = useSelector((state) => state.authReducers);
  // let { isLoggedIn } = state;
  let token = localStorage.getItem('token');
  const classes = useStyles();
   
  const logoutClicked = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (<div className={classes.root}>
         {token? <Button onClick={logoutClicked}>Log Out</Button>:<></>}
  </div>);
}
export default TopBar;

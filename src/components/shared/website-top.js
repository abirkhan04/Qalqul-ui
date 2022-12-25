import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles=makeStyles({
    root: {
      minHeight: "40px",
      width: '100%'
    }
});

export const WebsiteTop=()=> {
    const classes = useStyles();
   return (<div className={classes.root}>
   </div>)
}

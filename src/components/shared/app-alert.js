import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    message: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: '999',
        width: '90%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '10px'
    },
    errors: {
        color: 'white',
        backgroundColor: '#EF5350',
        padding: '5px 20px',
        borderRadius: '6px'
    },
    success: {
        color: 'white',
        backgroundColor: '#00695C',
        padding: '5px 20px',
        borderRadius: '6px',
    }
});

export const AppAlert = ({ message }) => {
    const classes = useStyles();
    return (<> <div className={classes.message}>
        {message.errorMessage ? <span className={classes.errors}>{message.errorMessage}</span> : <></>}
        {message.successMessage ? <span className={classes.success}>{message.successMessage}</span> : <></>}
    </div>
    </>)
}

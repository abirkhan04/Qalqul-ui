import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const AppSpinner = () => {
     return (<CircularProgress style={{position: 'absolute', top: 'calc(50vh - 20px)', left: 'calc(50vw - 20px)' }}/>)
}

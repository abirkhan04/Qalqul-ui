import React from 'react';
import Styles from './TopNav.module.css';
import { Button } from '@material-ui/core';

export default function TopNav() {

    const logoutClicked = () => {
        localStorage.clear();
        setTimeout(()=> {
            window.location.reload();
        }, 500)
    }

    return <div className={Styles.root}>
          <Button size="small" className={Styles.logout} onClick={()=> logoutClicked()}>Log out</Button>
    </div>
}

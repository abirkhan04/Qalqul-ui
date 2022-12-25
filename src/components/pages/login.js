import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FacebookLogin from 'react-facebook-login';

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#8D6E63',
        width: '320px',
        height: 'fit-content',
        borderRadius: '6px'
    },
    outer: {
        width: '100vw',
        height: 'calc(100vh - 30px)',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    controls: {
        width: 'calc(100% - 8px)',
        padding: '10px 4px 4px !important',
        margin: '4px 0 !important',
        backgroundColor: 'white',
        borderRadius: '6px'
    },
    linkWrapper: {
        width: '320px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    links: {
        textDecoration: 'none',
        color: 'red'
    },
    register : {
       textDecoration: 'none',
       color: 'black'
    },
    reset: {
        color: '#4E342E !important',
        backgroundColor: 'white !important'
    },
    validation: {
        color: 'red',
        background: 'white',
        marginBottom: '4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '4px 14px',
        height: 'fit-content',
        borderRadius: '6px'
    }
})

export default function Login() {
    const classes = useStyles();
    const { t } = useTranslation();

    const responseFacebook = (response) => {
        console.log(response);
      }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reset = () => {

    }

    return (
        <div className={classes.outer}>
            <Card className={classes.wrapper}>
                    <CardContent>
                    <FacebookLogin
                        appId="1592386377900696"
                        autoLoad={true}
                        fields="name,email,picture"
                        // onClick={componentClicked}
                        callback={responseFacebook} />
                    </CardContent>
            </Card>
            <div className={classes.linkWrapper}>
                <Link className={classes.links} to='forget-password'>{t('Forgot password ?')}</Link>
                <Link className={classes.register} to='sign-up'>{t('Sign up')}</Link>
            </div>
        </div>)
}

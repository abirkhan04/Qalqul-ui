import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import FacebookLogin from 'react-facebook-login';
import { sendAccessToken } from '../../actions/auth-actions';
import { useHistory } from 'react-router-dom';

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
    const dispatch = useDispatch();
    const history = useHistory();

    const responseFacebook = (response) => {
        console.log("accessToken: "+ response.accessToken);
        dispatch(sendAccessToken(response.accessToken));
        history.push('/');
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.outer}>
                <FacebookLogin
                        appId="1592386377900696"
                        autoLoad={true}
                        fields="name,email,picture,user_posts"
                        // onClick={componentClicked}
                        callback={responseFacebook} />
        </div>)
}

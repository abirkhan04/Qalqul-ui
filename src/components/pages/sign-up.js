import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { ItemForm } from "../shared/item-form";
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { registerUser } from "../../actions/auth-actions";
import { resetApiAction } from "../../actions/error-actions";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: 'auto',
        width: '350px',
        flexDirection: 'column',
        alignItems: 'center',
    },
    linkWrapper: {
        width: '350px',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    links: {
        textDecoration: 'none',
        color: 'black'
    },
});

const signUpFields = [
    {
        prop: 'firstName',
        label: 'First Name',
    }, {
        prop: 'lastName',
        label: 'Last Name',
    },
    {
        prop: 'username',
        label: 'Username',
        required: true,
    },
    {
        prop: 'storeId',
        label: 'Store Id',
        required: true,
    },
    {
        prop: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        span: 2
    },
    {
        prop: 'phoneNumber',
        label: 'Phone Number',
    }, {
        prop: 'email',
        label: 'Email',
    },
];



export default function SignUp() {
    const { message } = useSelector((state) => state.apiActionReducers);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { t } = useTranslation();

    const handleSubmit = (user) => {
        user.roles = [{ id: 1, role: 'USER' }];
        dispatch(registerUser(user));
    }

    useEffect(() => {
        if (message.errors) toast(t(message.errors.message), { type: 'error' });
        if (message.success) toast(t(message.success), { type: 'success' });
        if (message.success) dispatch(resetApiAction());
        if (message.errors || message.success) dispatch(resetApiAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    return (<div className={classes.root}>
        <ItemForm fields={signUpFields}
            formTitle={t('Sign Up')}
            handleSubmit={handleSubmit}
        />
        <div className={classes.linkWrapper}>
            <Link className={classes.links} to='login'>{t('Return to login')}</Link>
        </div>
    </div>);
}

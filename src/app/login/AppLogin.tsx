import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { IkeyValue } from '../interfaces/app-interfaces';
import { ItemForm } from '../shared/ItemForm';
import { loginAsync, selectStatus } from '../login/LoginSlice';
import Styles from './AppLogin.module.css';
import { useAppSelector } from '../hooks';
import { toast } from 'react-toastify';
import { setStatus } from './LoginSlice';

export default function AppLogin() {

    const status = useAppSelector(selectStatus);

    const dispatch = useAppDispatch();
    const formTitle: string = 'Login Form';
    useEffect(() => {
        if (status === 'Authentication failed') toast.error(status);
        dispatch(setStatus('idle'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    const handleSubmit = (credentials: IkeyValue) => {
        dispatch(loginAsync(credentials)).then((response: IkeyValue) => {
            if (response.payload.token) {
                window.location.reload();
            }
        });
    }

    return <div className={Styles.root}><ItemForm
        formTitle={formTitle}
        fields={[{ prop: 'username', label: 'Username', span: 2, required: true }, { prop: 'password', label: 'Password', span: 2, type: 'password', required: true }]}
        handleSubmit={handleSubmit}
    /></div>
}

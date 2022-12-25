import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { TextField, Button, FormControl } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { IkeyValue } from '../interfaces/app-interfaces';
import Styles from './ItemForm.module.css';

type AppProps = {
    formTitle: string;
    fields: Array<IkeyValue>;
    handleSubmit: (value: IkeyValue) => void;
    handleAutoCompleteSearch?: (value: IkeyValue) => void;
};

export const ItemForm = ({ formTitle, fields, handleSubmit, handleAutoCompleteSearch }: AppProps) => {
    const [messages, setMessages] = React.useState<Array<string>>([]);
    const initialValue: IkeyValue = fields.reduce<IkeyValue>((value: IkeyValue, field: IkeyValue) => {
        value[field.prop] = '';
        return value;
    }, {});
    
    const [value, setValue] = React.useState(initialValue);
    const Reset = () => {
        setMessages([]);
        setValue(initialValue);
    }

    const Valid = (fields: IkeyValue[], value: IkeyValue) => {
        const messages: Array<string> = fields.reduce<Array<string>>((messages, field, index) => {
            if (field.required && !value[field.prop]) messages[index] = field.label + " is required.";
            if (field.type === 'number' && value[field.prop] !== '') {
                if (field.min !== undefined && value[field.prop] < field.min) messages[index] = field.label + " must be greater than or equal to " + field.min + ".";
                if (field.max !== undefined && value[field.prop] > field.max) messages[index] = field.label + " must be less than or equal to" + field.max + ".";
            }
            return messages;
        }, []);
        setMessages(messages);
        if (messages.length === 0) return true;
        return false;
    }


    const getValue = (value: IkeyValue) => {
        const valueToPost = { ...value };
        fields.filter((field: IkeyValue) => field.type === 'number').forEach((field: IkeyValue) => {
            if (!value[field.prop]) valueToPost[field.prop] = 0;
        });
        return valueToPost;
    }

    return <Card className={Styles.wrapper} color="primary">
        <form className={Styles.form} onSubmit={(event) => { event.preventDefault(); if (Valid(fields, value)) handleSubmit(getValue(value)) }}>
            <CardHeader title={formTitle} className={Styles.header} />
            <CardContent className={Styles.content}>
                {messages.length > 0 ? <div className={Styles.validation}>{messages.map((message) => <span key={message}>{message}&nbsp;</span>)}</div> : <></>}
                <div className={Styles.controlsWrapper}>
                    {fields.map((field: IkeyValue) => <FormControl key={field.prop} className={Styles.controls} style={{ width: field.span ? `calc(${field.span * 50}% - 8px` : `calc(50% - 8px` }}>{
                        field.type === 'number' ?
                            <TextField
                                id={field.prop}
                                label={field.label}
                                variant="outlined"
                                type={field.type}
                                value={value[field.prop]}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, [field.prop]: event.target.value ? parseFloat(event.target.value) : '' })} />
                            : field.type === 'password' ?
                                <TextField
                                    id={field.prop}
                                    label={field.label}
                                    variant="outlined"
                                    type="password"
                                    value={value[field.prop] ? value[field.prop] : ''}
                                    autoComplete="on"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, [field.prop]: event.target.value })} />
                                : <TextField
                                    id={field.prop}
                                    label={field.label}
                                    variant="outlined"
                                    type="text"
                                    value={value[field.prop] ? value[field.prop] : ''}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, [field.prop]: event.target.value })} />
                    }</FormControl>)}
                </div>
            </CardContent>
            <CardActions className={Styles.actions}>
                <Button className={Styles.actionButtons} color="secondary" onClick={Reset}>Reset</Button>
                <Button className={Styles.actionButtons} color="primary" type="submit">Submit</Button>
            </CardActions>
        </form>
    </Card>
}

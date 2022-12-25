import React from 'react';
import { Autocomplete } from '@mui/material';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { TextField, Button, FormControl } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import DatePicker from '@mui/lab/DatePicker';


const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        height: 'fit-content',
        width: '100%',
        backgroundColor: '#8D6E63',
        borderRadius: '6px'
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '8px !important',
    },
    tableWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    form: {
        width: '100%'
    },
    controlsWrapper: {
        width: '100%',
        background: 'white',
        borderRadius: '6px',
        paddingTop: '2px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content: {
        padding: '0 8px !important'
    },
    controls: {
        padding: '6px 4px 4px !important',
    },
    reset: {
        backgroundColor: 'white !important',
        color: '#4E342E !important'
    },
    header: {
        textAlign: 'center',
        color: 'white',
        padding: '8px !important'
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
});



export const ItemForm = ({ formTitle, fields, handleSubmit, handleAutoCompleteSearch }) => {
    const { t } = useTranslation();
    const [messages, setMessages] = React.useState([]);
    const initialValue = fields.reduce((value, field) => {
        if (field.type === 'reference') value[field.prop] = null;
        else if (field.type === 'multiple') value[field.prop] = [];
        else
            value[field.prop] = '';
        return value;
    }, {});
    const [value, setValue] = React.useState(initialValue);
    const classes = useStyles();
    const Reset = () => {
        setMessages([]);
        setValue(initialValue);
    }

    const handleAutoCompleteChange = (autoCompleteValue, field) => {
        autoCompleteValue = autoCompleteValue.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.place === thing.place && t[field.displayProperty] === thing[field.displayProperty]
            )));
        setValue({ ...value, [field.prop]: autoCompleteValue });
    }

    const Valid = (fields, value) => {
        const messages = fields.reduce((messages, field, index) => {
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


    const getValue = (value) => {
        const valueToPost = { ...value };
        if (fields.filter((field) => field.type === 'number').forEach((field) => {
            if (!value[field.prop]) valueToPost[field.prop] = 0;
        }));
        return valueToPost;
    }

    const handleDateChange = (dateValue, field) => {
        setValue({ ...value, [field.prop]: dateValue });
    }

    return <Card className={classes.wrapper}>
        <form className={classes.form} onSubmit={(event) => { event.preventDefault(); if (Valid(fields, value)) handleSubmit(getValue(value)) }}>
            <CardHeader title={formTitle} className={classes.header} />
            <CardContent className={classes.content}>
                {messages.length > 0 ? <div className={classes.validation}>{messages.map((message) => <span key={message}>{t(message)}&nbsp;</span>)}</div> : <></>}
                <div className={classes.controlsWrapper}>
                    {fields.map((field) => <FormControl key={field.prop} className={classes.controls} style={{ width: field.span ? `calc(${field.span * 50}% - 8px` : `calc(50% - 8px` }}>{
                        field.type === 'number' ?
                            <TextField
                                id={field.prop}
                                label={t(field.label)}
                                variant="outlined"
                                type={field.type}
                                value={value[field.prop]}
                                onChange={(event) => setValue({ ...value, [field.prop]: event.target.value ? parseFloat(event.target.value) : '' })} />
                            : field.type === 'date' ?
                                <DatePicker
                                    label={t(field.label)}
                                    value={value[field.prop] || null}
                                    onChange={(newValue) => handleDateChange(newValue, field)
                                    }
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                : field.type === 'password' ?
                                    <TextField
                                        id={field.prop}
                                        label={t(field.label)}
                                        variant="outlined"
                                        type="password"
                                        value={value[field.prop] ? value[field.prop] : ''}
                                        autoComplete="on"
                                        onChange={(event) => setValue({ ...value, [field.prop]: event.target.value })} />
                                    : field.type === 'reference' ?
                                        <Autocomplete
                                            noOptionsText={t('No Options')}
                                            id={field.prop}
                                            options={field.options}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            value={value[field.prop]}
                                            onChange={(event, autoCompleteValue) => { setValue({ ...value, [field.prop]: autoCompleteValue }); }}
                                            getOptionLabel={(option) => option[field.bindProperty]}
                                            renderInput={(params) => <TextField {...params} label={t(field.label)} variant="outlined" onInput={(event) => handleAutoCompleteSearch(event)} />}
                                        /> : field.type === 'multiple' ?
                                            <Autocomplete
                                                noOptionsText={t('No Options')}
                                                id={field.id}
                                                options={field.options}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                multiple
                                                value={value[field.prop] || []}
                                                onChange={(event, autoCompleteValue) => handleAutoCompleteChange(autoCompleteValue, field)}
                                                getOptionLabel={(option) => option[field.displayProperty]}
                                                renderInput={(params) => <TextField {...params} label={t(field.label)} variant="outlined" />}
                                            />
                                            : <TextField
                                                id={field.prop}
                                                label={t(field.label)}
                                                variant="outlined"
                                                type="text"
                                                value={value[field.prop] ? value[field.prop] : ''}
                                                onChange={(event) => setValue({ ...value, [field.prop]: event.target.value })} />
                    }</FormControl>)}
                </div>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button variant="contained" className={classes.reset} onClick={Reset}>{t('button.reset')}</Button>
                <Button variant="contained" type="submit">{t('button.submit')}</Button>
            </CardActions>
        </form>
    </Card>
}

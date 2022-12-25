import { FormControl } from '@material-ui/core';
import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles';
import { TextField, Button } from '@material-ui/core';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({
    controls: {
        background: 'white',
        padding: '10px 4px 4px!important',
        marginRight: '4px !important',
        borderRadius: '6px'
    },
    form: {
        width: '100%'
    },
    reset: {
        backgroundColor: 'white !important',
        color: '#4E342E !important'
    },
    searchByDates: {
        padding: '0 0 6px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    textField: {
        '& .MuiInputBase-input': { padding: '4px' },
    }
});

const datesFields = [
    {
        prop: 'from',
        label: 'From'
    },
    {
        prop: 'to',
        label: 'To'
}];

export const getDatesBetween = () => {
    const datesBetween = {};
    let date = new Date();
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(date.getDate() +1);
    let dateString = moment(tomorrow).format('YYYY-MM-DD');
    datesBetween.to = moment(new Date(dateString)).format('YYYY-MM-DD');
    today.setDate(date.getDate());
    dateString = moment(today).format('YYYY-MM-DD');
    datesBetween.from = moment(new Date(dateString)).format('YYYY-MM-DD');
    return datesBetween;
}

export const SearchByDates = ({dateChangeHandler, width, resetHandler})=> {
    const [datesBetween, setDatesBetween ] = useState(getDatesBetween());
    const {t} = useTranslation();

    const handleChange = (event, field) => {
        const changedDates  = {...datesBetween, [field.prop]: event.target.value };
        setDatesBetween({...datesBetween, [field.prop]: event.target.value});
        dateChangeHandler(changedDates);
    }

    const Reset = ()=> {
        setDatesBetween(getDatesBetween());
        dateChangeHandler(getDatesBetween());
        resetHandler(getDatesBetween())
    }

    const classes = useStyles();
    return (<div className={classes.searchByDates} style={{width}}>
        <div>
     {datesFields.map((field) =>
                    <FormControl key={field.prop} className={classes.controls}>
                        <TextField
                            className={classes.textField}
                            id={field.prop}
                            InputLabelProps={{ shrink: true }}
                            label={t(field.label)}
                            type="date"
                            variant="outlined"
                            value={datesBetween[field.prop] ? datesBetween[field.prop] : 0}
                            onChange={(event) => handleChange(event, field)} />
                    </FormControl>
                )}
            </div>
            <div>
                <Button variant="outlined" className={classes.reset} onClick={Reset}>{t('button.reset')}</Button>
            </div> 
    </div>);
}

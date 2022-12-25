import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import authService from "../../services/auth-service";
import { DataTable } from '../../components/shared/data-table';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { TextField, FormControl, Button } from '@material-ui/core';
import {LineChartReact} from  '../shared/line-chart-react';
import moment from 'moment';
import DatePicker from '@mui/lab/DatePicker';

const useStyles = makeStyles({
    wrapper: {
        width: '80%',
        margin: 'auto',
        marginBottom: '6px'
    },
    controls: {
        background: 'white',
        padding: '10px 4px 4px!important',
        marginRight: '4px !important',
        borderRadius: '6px',
        '& .MuiOutlinedInput-root': {
            paddingRight: '6px'
        }
    },
    form: {
        width: '100%'
    },
    content: {
        backgroundColor: 'white',
        display: 'flex',
        width: 'calc(100% - 12px)',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    reset: {
        backgroundColor: 'white !important',
        color: '#4E342E !important',
    },
    searchByDates: {
        width: '80%',
        padding: '0 0 6px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    textField: {
        '& .MuiInputBase-input': { padding: '4px' },
        width: '170px'
    }
});

const columns = [
    { id: 'id', numeric: false, disablePadding: false, label: 'Id', hidden: true },
    { id: 'invoiceNumber', numeric: false, disablePadding: false, label: 'Invoice Number', type:"anchor", link:"invoice-detail" },
    { id: 'total', numeric: false, disablePadding: false, label: 'Total Price' },
];

const datesFields = [
    {
        prop: 'from',
        label: 'From'
    },
    {
        prop: 'to',
        label: 'To'
    }];

const getDatesBetween = (dayBefore) => {
    const datesBetween = {};
    let date = new Date();
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(date.getDate() +1);
    let dateString = moment(tomorrow).format('MM-DD-YYYY');
    datesBetween.to = moment(new Date(dateString)).format('MM-DD-YYYY');
    today.setDate(date.getDate() - dayBefore);
    dateString = moment(today).format('MM-DD-YYYY');
    datesBetween.from = moment(new Date(dateString)).format('MM-DD-YYYY');
    return datesBetween;
}

const Dashboard = () => {
    const { invoices } = useSelector((state) => state.invoiceReducers);
    const { invoiceSalesToDates} = useSelector((state)=> state.invoiceReducers);
    const [datesBetween, setDatesBetween] = useState(getDatesBetween(0));
    const [title, setTitle] = useState("Today's Sales");
    const [lineChartTitle, setLineChartTitle] = useState("30 Days' Sales");
    const { t } = useTranslation();

    const handleChange = (value, field) => {
        const datesUpdated = { ...datesBetween, [field.prop]: value}
        setDatesBetween(datesUpdated);
        setTitle('');
        setLineChartTitle('');
    };

    const getFormattedDate = (date)=>  moment(new Date(date)).format('MM-DD-YYYY');


    const Reset = () => {
        setDatesBetween(getDatesBetween(0));
        setTitle("Today's Sales");
        setLineChartTitle("30 Days' Sales");
    }

    const totalSales = () => {
        return invoices.reduce((totalSales, invoice) => {
            totalSales += invoice.total;
            return totalSales;
        }, 0).toFixed(2);
    }

    useEffect(() => {
        if( authService.getUser()){
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datesBetween])
    const classes = useStyles();
    return (<>
        <div className={classes.searchByDates}>
            <div>
                {datesFields.map((field) =>
                    <FormControl key={field.prop} classes={{root:classes.controls}}>
                            <DatePicker
                                    label={t(field.label)}
                                    value={datesBetween[field.prop] ? datesBetween[field.prop] : null}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(newValue) => handleChange(newValue, field)
                                    }
                                    renderInput={(params) => <TextField  className={classes.textField} {...params} />}
                                />
                    </FormControl>
                )}
            </div>
            <FormControl classes={{root:classes.controls}}>
            <TextField
                className={classes.textField}
                id="totalSales"
                InputLabelProps={{ shrink: true }}
                label={t("Total Sales")}
                type="text"
                variant="outlined"
                value={totalSales()}
                readOnly={true} />
            </FormControl>
            <div>
                <Button variant="contained" className={classes.reset} onClick={Reset}>{t('button.reset')}</Button>
            </div>
        </div>
        <Card className={classes.wrapper}>
            <CardHeader  title={title ? t(title): `${getFormattedDate(datesBetween.from)} ${t("to")} ${getFormattedDate(datesBetween.to)}`}/>
            <CardContent> <DataTable tableRows={invoices} columns={columns} name={'Sales'}
                addHidden={true} />
            </CardContent>
        </Card>
        <Card className={classes.wrapper}>
            <CardHeader  title={lineChartTitle? t(lineChartTitle): `${getFormattedDate(datesBetween.from)} ${t("to")} ${getFormattedDate(datesBetween.to) }`} />
            <CardContent > <div className={classes.content}><LineChartReact data={invoiceSalesToDates} xKey={'date'} yKey={'dayTotal'} width={(window.innerWidth  - 262) * 0.8 - 60} /></div>
            </CardContent>
        </Card>
        </>)
}

export default Dashboard;

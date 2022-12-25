import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete } from '@mui/material';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch } from "react-redux";
import constants from "../../constants";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
   controls: {
      width: '100%',
      padding: '10px 0 4px !important'
   },
   outerStyles: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   label: {
      marginLeft: '4px',
   },
   validation: {
      display: 'flex',
      width: '100%',
      alignItems: 'flex-start',
      flexDirection: 'column',
      color: 'red'
   },
   textField: {
      width: '100%'
   },
   buttonWrapper: {
      width: '100%',
      paddingTop: '8px',
      display: 'flex',
      justifyContent: 'center'
   },
   form: {
      width: 'fit-content'
   },
   checkBoxlabel: {
       marginLeft: '-9px !important',
       marginRight: '0 !important',
       '& .MuiTypography-root.MuiTypography-body1.MuiFormControlLabel-label' : {
          padding: '0 !important'
       }
   }
}));


export const EditRow = ({ row, columns, submitEditHandler }) => {
   const [validationoMessages, setValidationMessages] = useState('');
   const classes = useStyles();
   const { t } = useTranslation();
   const dispatch = useDispatch();
   const initialState = columns.reduce((object, column) => {
      if (Object.keys(row).length !== 0) {
         object[column.id] = row[column.id];
      } else {
         if (column.type === 'multiple') object[column.id] = [];
         else if (column.type === 'reference') object[column.id] = null;
         else object[column.id] = '';
      }
      return object;
   }, {});
   const [state, setState] = useState(initialState);
   const handleSubmit = (event) => {
      event.preventDefault();
      const submittedValue = { ...state }
      columns.forEach((column) => {
         if (column.type === constants.REFERENCE && column.options) {
            submittedValue[column.id] = column.options.find((option) => option.id === submittedValue[column.id]);
         }
      });
      const requiredColumns = columns.filter((column) => column.required);
      const messages = requiredColumns.reduce((messages, column) => {
         if (!submittedValue[column.id]) messages.push(`${column.label} is required.`);
         return messages;
      }, []);
      if (messages.length > 0) setValidationMessages(messages);
      else {
         dispatch(submitEditHandler(submittedValue));
         setValidationMessages([]);
      };
   };

   const handleChange = (event) => {
      const { id, name, value } = event.target;
      setState(prevState => ({
         ...prevState,
         [name || id]: value
      }));
   };

   const handleAutoCompleteChange = (autoCompleteValue, column) => {
      autoCompleteValue = autoCompleteValue.filter((thing, index, self) =>
         index === self.findIndex((t) => (
            t.place === thing.place && t[column.displayProperty] === thing[column.displayProperty]
         )));
      setState({ ...state, [column.id]: autoCompleteValue });
   }

   const handleCheckBoxChange = (event) => {
      const { name, checked } = event.target;
      setState(prevState => ({
         ...prevState,
         [name]: checked
      }));
   }

   return <div className={classes.outerStyles}>
      <div className={classes.validation}>{validationoMessages.length > 0 ? validationoMessages.map((message) => <span ke={message}>{t(message)}</span>) : <></>}</div>
      <form onSubmit={handleSubmit} className={classes.form}>
         {columns.filter((column) => (!column.editHidden && column.type !== 'action')).map((column) => {
            return <FormControl className={classes.controls} key={column.id}>
               {column.type === 'reference' ?
                  <Select
                     label={column.label}
                     name={column.id}
                     color="secondary"
                     multiple
                     value={state[column.id] || 'Select ...'}
                     onChange={(event) => handleChange(event, column.options)}
                  >  {column.options && column.options.map((item, index) => {
                     return <MenuItem key={index} value={item[column.bindProperty]}>{item[column.displayProperty]}</MenuItem>
                  })}
                     <MenuItem value={'Select ...'} disabled>Select ...</MenuItem>
                  </Select> : column.type === 'multiple' ?
                     <Autocomplete
                        noOptionsText={t('No Options')}
                        id={column.id}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        options={column.options}
                        multiple
                        value={state[column.id] || []}
                        onChange={(event, autoCompleteValue) => handleAutoCompleteChange(autoCompleteValue, column)}
                        getOptionLabel={(option) => option[column.displayProperty]}
                        renderInput={(params) => <TextField {...params} label={t(column.label)} />}
                     /> : !column.isHidden && !column.type ? <TextField
                        className={classes.textField}
                        label={t(column.label)}
                        id={column.id}
                        InputProps={{
                           readOnly: column.readOnly
                        }}
                        value={state[column.id] || ''}
                        onChange={handleChange} /> : column.type === 'boolean' ? <FormControlLabel
                           classes={{root: classes.checkBoxlabel}}
                           name={column.id}
                           control={<Checkbox
                              style={{ color: "#8D6E63" }}
                              checked={state[column.id] || false} onChange={handleCheckBoxChange} />}
                           label={t(column.label)}
                        /> : column.type === 'textarea' ? <TextField
                           id={column.id}
                           label={t(column.label)}
                           multiline
                           minRows={1}
                           maxRows={column.maxRows}
                           value={state[column.id] || ''}
                           onChange={handleChange} /> : column.type === 'date' ? <TextField
                              id={column.id}
                              label={column.label}
                              type="date"
                              defaultValue={state[column.id] || ''}
                              onChange={handleChange}
                              className={classes.textField}
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           /> : column.type === 'password' ? <TextField
                              id={column.id}
                              label={t(column.label)}
                              type="password"
                              defaultValue={state[column.id] || ''}
                              onChange={handleChange}
                              autoComplete="on"
                              className={classes.textField}
                           /> : column.type === 'enum' ?
                        <Select
                           label={column.label}
                           name={column.id}
                           color="secondary"
                           value={state[column.id] || 'Select ...'}
                           onChange={(event) => handleChange(event, column.options)}>
                           {column.options && column.options.map((item, index) => {
                              return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                           })}
                           <MenuItem value={'Select ...'} disabled>Select ...</MenuItem>
                        </Select> : <></>
               }
            </FormControl>
         })}
         <div className={classes.buttonWrapper}>
            <Button variant="contained" type="Submit"> {t("button.submit")} </Button>
         </div>
      </form></div>;
};

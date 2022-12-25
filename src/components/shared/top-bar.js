import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel } from '@mui/material';

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 'auto'
  },
  inputs: {
    marginRight: '3%'
  },
  radio: {
    width: '30px !important',
    height: '30px !important',
    '&$checked': {
      color: '#4E342E !important',
    }
  },
  checked: {}
});


const TopBar = () => {
  const [state, setState] = useState({ value: 'en' });
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const onLanguageChange = (event) => {
    let newLang = event.target.value;
    setState({ value: newLang })
    i18n.changeLanguage(newLang);
  }

  const renderRadioButtons = () => {
    return (
      <div>
        <RadioGroup row
          aria-label="Language"
          value={state.value ? state.value : 'en'}
          name="radio-buttons-group"
          onChange={(event) => onLanguageChange(event)}>
          <FormControlLabel value={"en"} control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label={t('English')} />
          <FormControlLabel value={"bn"} control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label={t('Bengali')} />
        </RadioGroup>
      </div>);
  }
  return (<div className={classes.root}>
    <div className={classes.inputs}>
      {renderRadioButtons()}
    </div>
  </div>);
}
export default TopBar;

import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { resetApiAction } from '../../actions/error-actions';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Card from '@material-ui/core/Card'
import { sendPasswordRequest } from '../../actions/auth-actions';
import { Link } from 'react-router-dom'
import { ArrowBack }  from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
      wrapper : {
            height: 'calc(100vh - 30px)',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems:  'center',
            flexDirection: 'column',
      },
      root: {
            width: '320px',
      },
      buttons: {
            color: 'white !important'
      },
      bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
      },
      title: {
            fontSize: '14px',
      },
      controls: {
            width: 'calc(100% - 8px)',
            background: 'white',
            borderRadius: '6px',
            padding: '10px 4px 4px !important'
      },
      goBack: {
            width: '320px',
            display: 'flex',
            justifyContent: 'flex-start'
      },
      links: {
            textDecoration: 'none',
            color: 'teal',
            margin: '6px 0'
      },
      icon: {
         color: '#4E342E'
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

export default function ForgetPassword() {
      const [state, setState] = useState({ username: '' });
      const { message } = useSelector((state) => state.apiActionReducers);
      const [messages, setMessages] = useState([]);
      const dispatch = useDispatch()
      const classes = useStyles();
      const {t} = useTranslation();

      const handleChange = (event) => {
            const { id, value } = event.target
            setState(prevState => ({
                  ...prevState,
                  [id]: value
            }));
      }

      const handleSubmit = (event) => {
            event.preventDefault();
            if(!state.username) {
                if(messages.length === 0)setMessages([t("Username is required")]);
            }
            else {
                  dispatch(sendPasswordRequest(state.username));
                  setMessages([]);
            }
      }

      useEffect(() => {
            if (message.errors) toast(t(message.errors.message), { type: 'error' });
            if (message.success) toast(t(message.success), { type: 'success' });
            if (message.success||message.errors) dispatch(resetApiAction());
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [message]);

      return (<div className={classes.wrapper}><Card className={classes.root}>
            <form onSubmit={handleSubmit}>
                  <CardHeader title={t("Post Your Request")}/>
                  <CardContent>
                  {messages.length > 0 ? <div className={classes.validation}>{messages.map((message) => <span key={message}>{t(message)}</span>)}</div> : <></>}
                        <FormControl className={classes.controls}>
                              <TextField
                                    id="username"
                                    label={t("Username")}
                                    variant="outlined"
                                    value={state.username || ''}
                                    onChange={handleChange} />
                        </FormControl>
                  </CardContent>
                  <CardActions>
                        <Button variant="contained" type="Submit" className={classes.buttons}> {t('button.submit')} </Button>
                  </CardActions>
            </form>
      </Card>
      <div className={classes.goBack}><Link to="login" className={classes.links}><ArrowBack className={classes.icon}/></Link></div>
      </div>)
}


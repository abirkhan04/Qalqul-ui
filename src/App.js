import React, { Suspense, useEffect, lazy } from 'react';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { makeStyles } from '@material-ui/styles';
import { WebsiteTop } from './components/shared/website-top';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Login from './components/pages/login';
import { AppSpinner } from './components/shared/app-spinner';

const Dashboard = lazy(() => import('./components/pages/dashboard'));

const theme = createTheme({
    palette: {
        primary: {
            main: '#8D6E63',
            contrastText: '#fff',
        },
        secondary: {
            main: '#f44336',
            contrastText: '#000',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#8D6E63',
                    color: 'white',
                    padding: '6px 12px',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#8D6E63',
                    }
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    '& .MuiTypography-root': {
                        '& .MuiTypography-body1': {
                            padding: '0'
                        },
                        padding: '8px 8px 0',
                        background: 'white'
                    },
                    '& .MuiDialogContent-root': {
                        padding: '0 8px',
                        background: 'white'
                    },
                    '& .MuiDialogActions-root': {
                        padding: '0 8px 8px',
                        background: 'white'
                    }
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#8D6E63',
                    borderRadius: '6px',
                    '& .MuiCardHeader-root': {
                        padding: '8px',
                        textAlign: 'center',
                        color: 'white'
                    },
                    '& .MuiCardContent-root': {
                        padding: '0 8px',
                        "&:last-child": {
                            paddingBottom: '8px'
                        }
                    },
                    '& .MuiCardActions-root': {
                        display: 'flex',
                        justifyContent: 'space-around',
                        padding: "8px"
                    }
                }
            }
        }
    },
});

const useStyles = makeStyles({
    body: {
        position: 'relative',
        left: '0px',
        top: '0px',
        width: '80%',
        minWidth: '80%'
    },
    sideNav: {
        width: 'fit-content',
        position: 'relative',
        display: 'flex',
        left: '0px',
        top: '0px',
        justifyContent: 'center'
    },
    topBar: {
        position: 'relative',
        left: '0px',
        top: '0px',
        backgroundColor: '#D7CCC8',
    },
    wrapper: {
        display: 'flex',
        backgroundColor: '#D7CCC8',
        minHeight: 'calc( 100vh - 30px)',
        flexDirection: 'column',
        position: 'relative',
        left: '0',
        top: '0'
    },
    bodyWrapper: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        left: '0px',
        top: '0px'
    },
    toaster: {
        '& .Toastify__toast--success': {
            background: '#4E342E',
        },
        '& .Toastify__toast--error': {
            background: 'red'
        }
    }
});

function App() {
    const state = useSelector((state) => state.authReducers);
    let { isLoggedIn } = state;
    let user = localStorage.getItem('user');
    let store = null;
    if(user) {
        console.log("user", user);
        user = JSON.parse(user);
        store = user.store;
    } 
    const classes = useStyles();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = (t("Sales Terminal"));
    }, [t]);

    return (<ThemeProvider theme={theme}><LocalizationProvider dateAdapter={DateAdapter}>
        <div className={classes.topBar}>
        </div>
        {isLoggedIn || store ? <BrowserRouter>
            <div className={classes.wrapper}>
                <div className="webTop">
                    <WebsiteTop />
                </div>
                <div className={classes.bodyWrapper}>
                    <Suspense fallback={<AppSpinner isOutside={true} />}>
                        <div className={classes.body}>
                            <Switch>
                                <Route exact path="/">
                                    <Dashboard />
                                </Route>                               
                                <Route exact path="*">
                                    <Redirect to='/' />
                                </Route>
                            </Switch>
                        </div>
                    </Suspense>
                </div>
            </div>
        </BrowserRouter> :
            <BrowserRouter>
                <div className={classes.wrapper}>
                    <Suspense fallback={<AppSpinner isOutside={false} />}>
                        <Switch>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="*">
                                <Redirect to='/login' />
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </BrowserRouter>}
    </LocalizationProvider > <ToastContainer className={classes.toaster} /></ThemeProvider >);
}

export default App;

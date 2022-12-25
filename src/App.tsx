import React, { lazy, Suspense } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppSpinner } from './app/shared/app-spinner';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { IkeyValue } from './app/interfaces/app-interfaces';
import { useAppSelector } from './app/hooks';
import { selectLoggedIn } from './app/login/LoginSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() => import('./app/login/AppLogin'));
const Home = lazy(() => import('./app/home/home'));
const TopNav = lazy(() => import('./app/shared/TopNav'));

declare module '@material-ui/core/styles/createTheme' {
    interface ThemeOptions {
        components?: IkeyValue
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#6200EE',
            contrastText: '#fff',
        },
        secondary: {
            main: '#03DAC5',
            contrastText: '#000',
        },
    }
});

function App() {
    const isloggedIn = useAppSelector(selectLoggedIn);

    return (
        <ThemeProvider theme={theme}>
            {isloggedIn || localStorage.getItem('token') ? <BrowserRouter>
                <div>
                    <Suspense fallback={<AppSpinner />}>
                        <TopNav />
                    </Suspense>
                    <Suspense fallback={<AppSpinner />}>
                        <div>
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="*" element={<Navigate to="/home" replace />} />
                            </Routes>
                        </div>
                    </Suspense>
                </div>
            </BrowserRouter> :
                <BrowserRouter>
                    <div>
                        <Suspense fallback={<AppSpinner />}>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="*" element={<Navigate to="/login" replace />} />
                            </Routes>
                        </Suspense>
                    </div>
                </BrowserRouter>}
                <ToastContainer />
        </ThemeProvider >
    );
}

export default App;

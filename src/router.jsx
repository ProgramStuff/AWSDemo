import { createBrowserRouter } from 'react-router-dom';
import Login from './app/Login/page';
import Register from './app/Regsiter/page';
import PrivateRoutes from './routes/PrivateRoutes';
import Layout from './routes/Layout';
import LandingPage from './app/LandingPage/page';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <LandingPage /> },
            { path: '/Login', element: <Login /> },
            { path: '/Register', element: <Register /> },

            {
                element: <PrivateRoutes role="user" />,
            },
            {
                element: <PrivateRoutes role="admin" />,
                children: [{ path: '/Dashboard' }],
            },
            {
                path: '*',
                element: <p>404 Error - Nothing here</p>,
            },
        ],
    },
]);

import { useEffect, useState, useMemo } from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import CreateIncident from '../app/CreateIncident/page';
import PersonnelInfo from '../app/PersonnelInfo/page';
import PastIncident from '../app/PastIncident/page';
import MyCerts from '../app/MyCerts/page';
import Profile from '../app/Profile/page';
import { useNavigate } from 'react-router-dom';
import MuiCard from '@mui/material/Card';

import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddBoxIcon from '@mui/icons-material/AddBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useOutletContext } from 'react-router-dom';
import ActiveIncident from '../app/ActiveIncident/page';
import { Typography } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import Register from '../app/Regsiter/page';
import { Widgets } from '@mui/icons-material';
import CreateTask from '../app/CreateTask/page';

const lightDarkTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

const ContentContainer = styled(Stack)(({ theme }) => ({
    height: '100%',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function Dashboard(props) {
    const [pathname, setPathname] = useState('/incident');

    const router = useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getCookie();
    }, []);

    function getCookie() {
        let name = 'user=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {}
            if (c.indexOf(name) == 0) {
                const userInfo = JSON.parse(c.substring(name.length, c.length));
                setCurrentUser(userInfo);
                // return c.substring(name.length, c.length);
            }
        }
        return;
    }

    const NAVIGATION = [
        {
            kind: 'header',
            title: 'Main items',
        },
        {
            segment: 'incident',
            title: 'Incident',
            icon: <HomeIcon />,
            children: [
                {
                    segment: 'activeIncident',
                    title: 'Active Incidents',
                    icon: <NotificationsActiveIcon />,
                },
                {
                    segment: 'newIncident',
                    title: 'New Incident',
                    icon: <AddBoxIcon />,
                },
                {
                    segment: 'pastIncident',
                    title: 'Past Incidents',
                    icon: <VisibilityIcon />,
                },
            ],
        },
        {
            segment: 'personnelInfo',
            title: 'Personnel Info',
            icon: <DonutLargeIcon />,
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'User Items',
        },
        {
            segment: 'register',
            title: 'Register Personnel',
            icon: <PersonAddIcon />,
        },
        {
            segment: 'myCertifications',
            title: 'My Certifications',
            icon: <WorkspacePremiumIcon />,
        },
        {
            segment: 'settings',
            title: 'Settings',
            icon: <SettingsIcon />,
            children: [
                {
                    segment: 'profile',
                    title: 'Profile',
                    icon: <DescriptionIcon />,
                },
            ],
        },
        //* Clean this up **
        {
            icon: <></>,
        },
        {
            icon: <></>,
        },
        {
            icon: <></>,
        },
        {
            icon: <></>,
        },
        {
            icon: <></>,
        },
        {
            icon: <></>,
        },
        {
            icon: <></>,
        },

        {
            segment: 'userProfile',
            title: 'User Name',
            //            title: currentUser.fName + ' ' + currentUser.lName,
            icon: <AccountCircleIcon color="#037AFF" />,
        },
    ];

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={lightDarkTheme}
            branding={{
                title: 'SAR FORGE',
                logo: (
                    <TroubleshootIcon
                        sx={{ margin: '0.8vh', color: '#037AFF' }}
                    />
                ),
            }}
        >
            <DashboardLayout>
                <PageContainer
                    sx={{ marginLeft: 0, marginRight: 0 }}
                    title=""
                    maxWidth
                    pathname={router.pathname}
                >
                    <ContentContainer
                        direction="column"
                        justifyContent="space-between"
                    >
                        {router.pathname == '/incident/activeIncident' && (
                            <ActiveIncident changePath={setPathname} />
                        )}
                        {router.pathname == '/incident' && (
                            <ActiveIncident changePath={setPathname} />
                        )}

                        {router.pathname == '/incident/newIncident' && (
                            <CreateIncident
                                appRouter={router}
                                changePathFunction={setPathname}
                            />
                        )}
                        {router.pathname == '/incident/pastIncident' && (
                            <PastIncident />
                        )}
                        {router.pathname == '/personnelInfo' && (
                            <PersonnelInfo />
                        )}

                        {router.pathname == '/register' && <Register />}
                        {router.pathname == '/myCertifications' && <MyCerts />}
                        {router.pathname == '/settings/profile' && <Profile />}
                        {router.pathname == '/userProfile' && <Profile />}
                        {/incident\/activeIncident\/./.test(
                            router.pathname
                        ) && (
                            <CreateIncident
                                appRouter={router}
                                changePathFunction={setPathname}
                            />
                        )}
                        {/incident\/.\/newTask/.test(router.pathname) && (
                            <CreateTask
                                taskID={router.pathname.split('/')[2]}
                            />
                        )}
                    </ContentContainer>
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}

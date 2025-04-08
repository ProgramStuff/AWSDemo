import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import MenuItem from '@mui/material/MenuItem';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const province = [
    {
        value: '',
        label: '',
    },
    {
        value: 'AB',
        label: 'Alberta',
    },
    {
        value: 'BC',
        label: 'British Columbia',
    },
    {
        value: 'MB',
        label: 'Manitoba',
    },
    {
        value: 'NB',
        label: 'New Brunswick',
    },
    {
        value: 'NL',
        label: 'Newfoundland and Labrador',
    },
    {
        value: 'NT',
        label: 'NorthWest Territories',
    },
    {
        value: 'NS',
        label: 'Nova Scotia',
    },
    {
        value: 'NU',
        label: 'Nunavut',
    },
    {
        value: 'ON',
        label: 'Ontario',
    },
    {
        value: 'PEI',
        label: 'Prince Edward Island',
    },
    {
        value: 'QC',
        label: 'Quebec',
    },
    {
        value: 'SK',
        label: 'Saskatchewan',
    },
    {
        value: 'YT',
        label: 'Yukon',
    },
];

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: '2vh',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

/*
 * name
 * province
 */

const tempAgency = [
    {
        id: 1,
        name: 'King Search and Rescue',
        province: 'Nova Scotia',
    },
    {
        id: '2',
        name: 'Greenwhich Fire',
        province: 'Nova Scotia',
    },
];

export default function Register() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [birthDate, setBirthDate] = useState(dayjs());
    const [provinceChoice, setProvinceChoice] = useState('');
    const [agency, setAgency] = useState('');
    const [agencyError, setAgencyError] = useState('');
    const [agencyErrorMessage, setAgencyErrorMessage] = useState('');
    const [userRole, setUserRole] = useState('');

    const [phoneError, setPhoneError] = useState('');
    const [phoneErrorMessage, setphoneErrorMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const name = document.getElementById('name');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage(
                'Password must be at least 6 characters long.'
            );
            isValid = false;
        }
        if (!/\d/.test(password.value)) {
            setPasswordError(true);
            setPasswordErrorMessage(
                "Passwords must have at least one digit ('0'-'9')."
            );
            isValid = false;
        }
        if (!/[^\w]/.test(password.value)) {
            setPasswordError(true);
            setPasswordErrorMessage(
                'Passwords must have at least one non-alphanumeric character.'
            );
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('First and Last name required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!agency) {
            setAgencyError(true);
            setAgencyErrorMessage('Agency required.');
            isValid = false;
        } else {
            setAgencyError(false);
            setAgencyErrorMessage('');
        }

        return isValid;
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const fromData = new FormData(e.currentTarget);
        const email = fromData.get('email');
        const password = fromData.get('password');
        const name = fromData.get('name');
        const phone = fromData.get('phone');

        const payload = {
            name: name,
            brithdate: birthDate.toISOString(),
            phone: phone,
            agency: agency,
            province: provinceChoice,
            email: email,
            password: password,
            role: userRole,
        };
        console.log(payload);
        try {
            const response = await axios.post(
                `${import.meta.env.API_ENDPOINT}/register`,
                { email, password }
            );
            if (response.status == 200) {
                setMessage(`Registration successful: ${response.data.message}`);
            } else {
                if (response.errors.DuplicateUserName) {
                    setMessage('Username already exists');
                }
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            console.log(`Error: ${error.message}`);
        }
    }

    return (
        <>
            <CssBaseline enableColorScheme />
            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                        }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">Full name</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                placeholder="Full Name"
                                error={nameError}
                                helperText={nameErrorMessage}
                                color={nameError ? 'error' : 'primary'}
                            />
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <FormControl>
                                <DatePicker
                                    name="date"
                                    label="Birthdate"
                                    value={birthDate}
                                    onChange={(newValue) =>
                                        setBirthDate(newValue)
                                    }
                                />
                            </FormControl>
                        </LocalizationProvider>

                        <FormControl>
                            <TextField
                                key={provinceChoice}
                                name="province"
                                value={provinceChoice}
                                select
                                label="Province"
                                onChange={(event) =>
                                    setProvinceChoice(event.target.value)
                                }
                            >
                                {province.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="phone">Phone Number</FormLabel>
                            <TextField
                                autoComplete="phone"
                                name="phone"
                                required
                                fullWidth
                                id="phone"
                                placeholder="Phone Number"
                                error={phoneError}
                                helperText={phoneErrorMessage}
                                color={phoneError ? 'error' : 'primary'}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                select
                                key={tempAgency}
                                name="agency"
                                label="Agency"
                                value={agency}
                                error={agencyError}
                                helperText={agencyErrorMessage}
                                color={agencyError ? 'error' : 'primary'}
                                onChange={(event) =>
                                    setAgency(event.target.value)
                                }
                            >
                                {tempAgency.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>

                        <FormControl>
                            <TextField
                                name="userRole"
                                value={userRole}
                                select
                                label="User Role"
                                onChange={(event) =>
                                    setUserRole(event.target.value)
                                }
                            >
                                <MenuItem value={'ADMIN'}>Admin</MenuItem>
                                <MenuItem value={'USER'}>User</MenuItem>
                            </TextField>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="your@email.com"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                error={emailError}
                                helperText={emailErrorMessage}
                                color={emailError ? 'error' : 'primary'}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                onChange={(e) => setPassword(e.target.value)}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Sign up
                        </Button>
                    </Box>
                </Card>
            </SignUpContainer>
        </>
    );
}

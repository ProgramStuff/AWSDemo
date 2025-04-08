import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';
import dayjs from 'dayjs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';
import { Button } from '@mui/material';

function createData(id, name, phoneNumber, checkedStatus, certInfo) {
    return {
        id,
        name,
        phoneNumber,
        checkedStatus,
        certificateInfo: [certInfo],
    };
}

const tempCert1 = {
    id: 1,
    name: 'Chainsaw Operation',
    expiryDate: dayjs().toString('2026-07-20T23:54:26.305Z'),
    certificate: 'Cert',
};

const tempCert2 = {
    id: 2,
    name: 'Chainsaw Operation',
    expiryDate: dayjs().toString('2026-05-5T23:54:26.305Z'),
    certificate: 'Cert',
};

const tempCert3 = {
    id: 3,
    name: 'Drone Operation',
    expiryDate: dayjs().toString('2026-03-15T23:54:26.305Z'),
    certificate: 'Cert',
};

function EnhancedTableToolbar(props) {
    const { numSelected, selected, changeResponderInfo, setSelected } = props;

    const changeStatus = (selected) => {
        changeResponderInfo((prevState) =>
            prevState.map((responder) => ({
                ...responder,
                checkedStatus: selected.some((item) => item == responder.id)
                    ? !responder.checkedStatus
                    : responder.checkedStatus,
            }))
        );
        setSelected([]);
    };

    const handleCheckIn = () => {
        changeStatus(selected);
    };

    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Responder Information
                </Typography>
            )}
            {numSelected > 0 && (
                <Button onClick={handleCheckIn}>Check In</Button>
            )}
        </Toolbar>
    );
}

export default function ResponderTable() {
    const [selected, setSelected] = useState([]);
    const [responderInfo, setResponderInfo] = useState([
        {
            id: 1,
            name: 'Jordan Kelsey',
            phone: '123-456-7890',
            checkedStatus: false,
            cert: tempCert1,
        },
        {
            id: 2,
            name: 'Blake Velimirovich',
            phone: '098-765-4321',
            checkedStatus: false,
            cert: tempCert2,
        },
        {
            id: 3,
            name: 'Alfred Parks',
            phone: '555-123-4567',
            checkedStatus: false,
            cert: tempCert3,
        },
    ]);

    const rows = responderInfo.map((info) =>
        createData(
            info.id,
            info.name,
            info.phone,
            info.checkedStatus,
            info.cert
        )
    );

    return (
        <Paper sx={{ width: '100%', mb: 2, ml: 0, mt: '1vh' }}>
            <EnhancedTableToolbar
                numSelected={selected.length}
                selected={selected}
                changeResponderInfo={setResponderInfo}
                setSelected={setSelected}
            />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Checkin/out</TableCell>
                            <TableCell align="center">Checked In</TableCell>
                            <TableCell>Responder Name</TableCell>
                            <TableCell align="center">Phone Number</TableCell>
                            <TableCell>Certificates</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row
                                key={row.id}
                                row={row}
                                setSelectedRow={setSelected}
                                selectedRows={selected}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

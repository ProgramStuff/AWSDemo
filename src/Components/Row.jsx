import { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';

export default function Row(props) {
    const { row, setSelectedRow, selectedRows } = props;
    const [open, setOpen] = useState(false);
    let isSelected = selectedRows.includes(row.id);

    const handleSelect = () => {
        if (isSelected) {
            setSelectedRow(selectedRows.filter((item) => item != row.id));
        } else {
            setSelectedRow([...selectedRows, row.id]);
        }
    };

    useEffect(() => {}, [selectedRows]);

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center" padding="checkbox">
                    <Checkbox
                        checked={isSelected}
                        onClick={handleSelect}
                        color="primary"
                        inputProps={{
                            'aria-labelledby': 'row',
                        }}
                    />
                </TableCell>
                <TableCell align="center">
                    {row.checkedStatus == false ? 'No' : 'Yes'}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Certifications
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Expiry Date</TableCell>
                                        <TableCell align="right">
                                            Certificate
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.certificateInfo.map((cert) => (
                                        <TableRow
                                            key={Date.toString(cert.date)}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {cert.name}
                                            </TableCell>
                                            <TableCell>
                                                {cert.expiryDate}
                                            </TableCell>
                                            <TableCell align="right">
                                                {cert.certificate}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

import { useState } from 'react';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CreateIncident from '../CreateIncident/page';
import { useActivePage } from '@toolpad/core/useActivePage';

const tempIncidents = [
    {
        id: 1,
        incidentName: 'Incident 101-03-15-2025',
        agency: 'Search and Rerscue',
        incidentType: 'Missing person',
    },
    {
        id: 2,
        incidentName: 'Incident 102-03-16-2025',
        agency: 'Police',
        incidentType: 'Assist SAR with Missing Person Incident',
    },
    {
        id: 3,
        incidentName: 'Incident 103-03-17-2025',
        agency: 'EMO',
        incidentType: 'Lost at Sea',
    },
];

export default function ActiveIncident({ changePath }) {
    console.log(useActivePage());
    const [selectedCard, setSelectedCard] = useState(0);
    return (
        <>
            <Grid container justifyContent={'center'} spacing={1}>
                {tempIncidents.map((incident) => (
                    <Grid size={{ sm: 12, md: 12, lg: 4, xl: 4 }}>
                        <Card key={incident.id}>
                            <CardActionArea
                                onClick={() =>
                                    changePath(
                                        `/incident/activeIncident/${incident.id}`
                                    )
                                }
                                data-active={
                                    selectedCard === incident.id
                                        ? ''
                                        : undefined
                                }
                                sx={{
                                    height: 200,
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                            backgroundColor:
                                                'action.selectedHover',
                                        },
                                    },
                                }}
                            >
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography variant="h5" component="div">
                                        {incident.incidentName}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        {incident.incidentType}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        Agency: {incident.agency}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

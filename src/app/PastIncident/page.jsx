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
        incidentName: 'Incident 107-05-21-2024',
        agency: 'Search and Rerscue',
        incidentType: 'Fisher Lost at Sea',
    },
    {
        id: 2,
        incidentName: 'Incident 104-07-16-2023',
        agency: 'Search and Rescue',
        incidentType: 'Missing Elderly Person',
    },
    {
        id: 3,
        incidentName: 'Incident 108-01-17-2025',
        agency: 'Search and Rescue',
        incidentType: 'MIssing Hiker',
    },
];

export default function PastIncident({ changePath }) {
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

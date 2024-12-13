'use client';
import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Link
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Launch as LaunchIcon, Search as SearchIcon } from '@mui/icons-material';
import { Directions as DirectionsIcon } from '@mui/icons-material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Tooltip } from '@mui/material';
import { IconBrandWaze } from '@tabler/icons-react';
import RoomIcon from '@mui/icons-material/Room';

interface TravelDestination {
    id: number;
    title: string;
    description: string;
    bestTimeToVisit: string;
    travelTips: string;
    latitude: number;
    longitude: number;
}

const validationSchema = Yup.object({
    title: Yup.string().required('El título es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    bestTimeToVisit: Yup.string().required('La mejor época para visitar es obligatoria'),
    travelTips: Yup.string().required('Los consejos de viaje son obligatorios'),
    latitude: Yup.number().required('Latitud es obligatoria'),
    longitude: Yup.number().required('Longitud es obligatoria'),
});

const TravelGuide = () => {
    const fetchDestinations = async () => {
        try {
            const response = await fetch('http://localhost:9000/sit/public/guia-viaje/listar', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setDestinations(data.data);
            setFilteredDestinations(data.data);
        } catch (error) {
            console.error('Error fetching travel destinations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init(); fetchDestinations();
    }, []);

    const [loading, setLoading] = useState(true);
    const [destinations, setDestinations] = useState<TravelDestination[]>([]);
    const [filteredDestinations, setFilteredDestinations] = useState<TravelDestination[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentDestination, setCurrentDestination] = useState<TravelDestination | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleClickOpen = (destination: TravelDestination | null = null) => {
        setCurrentDestination(destination);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDeleteDialog(false);
    };


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = destinations.filter(destination =>
            destination.title.toLowerCase().includes(query)
        );
        setFilteredDestinations(filtered);
    };

    return (
        <PageContainer title="Guía de Viaje" description="Explora destinos y planifica itinerarios">
            <DashboardCard title="">
                <Box>
                    <Toaster />
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h2" gutterBottom data-aos="fade-down">Destinos Turísticos</Typography>
                        <Typography variant="h6" color="text.secondary" data-aos="fade-down">Planifica tus aventuras y descubre consejos útiles.</Typography>
                    </Box>

                    <TextField
                        label="Buscar destino"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{ endAdornment: <SearchIcon /> }}
                        fullWidth
                        sx={{ mb: 4, maxWidth: 400 }}
                    />

                    <Grid container spacing={4} justifyContent="center">
                        {filteredDestinations.map((destination) => (
                            <Grid item xs={12} md={6} key={destination.id} data-aos="fade-up">
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">{destination.title}</Typography>
                                        <Box
                                            component="div"
                                            dangerouslySetInnerHTML={{ __html: destination.description }}
                                            sx={{ whiteSpace: 'pre-wrap' }}
                                        />
                                        <Typography variant="h5" gutterBottom data-aos="fade-down">Consejos de viaje</Typography>
                                        <Box
                                            component="div"
                                            dangerouslySetInnerHTML={{ __html: destination.travelTips }}
                                            sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', mt: 1 }}
                                        />
                                         <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                            <strong>Mejor época para visitar:</strong> {destination.bestTimeToVisit}
                                        </Typography>
                                        <Box mt={2}>
                                            <Tooltip title="Ver en Google Maps">
                                                    <Button
                                                         component={Link}
                                                         href={`https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`}
                                                         target="_blank"
                                                         rel="noopener noreferrer"
                                                         color="primary"
                                                    >
                                                        <RoomIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Ver en Waze">
                                                    <Button
                                                        component={Link}
                                                        href={`https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        color="secondary"
                                                        sx={{ ml: 2 }}
                                                    >
                                                        <IconBrandWaze />
                                                    </Button>
                                                </Tooltip>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </DashboardCard>
        </PageContainer>
    );
};

export default TravelGuide;

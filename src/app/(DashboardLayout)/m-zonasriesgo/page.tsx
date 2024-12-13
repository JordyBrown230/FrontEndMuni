'use client';
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Link } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Launch as LaunchIcon, Search as SearchIcon } from '@mui/icons-material';
import { Directions as DirectionsIcon } from '@mui/icons-material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast'; // Importa react-hot-toast
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa el estilo de Quill

import { Tooltip } from '@mui/material';
import { IconBrandWaze } from '@tabler/icons-react';
import RoomIcon from '@mui/icons-material/Room';

// Interfaz de la información de zonas de riesgo
interface RiskZone {
    id: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
}

// Validación con Yup
const validationSchema = Yup.object({
    title: Yup.string().required('Título es obligatorio'),
    description: Yup.string().required('Descripción es obligatoria'),
    latitude: Yup.number().required('Latitud es obligatoria'),
    longitude: Yup.number().required('Longitud es obligatoria'),
});

const Municipalidad = () => {
    const fetchRiskZones = async () => {
        try {
            const response = await fetch('http://localhost:9000/sit/public/zona-riesgo/listar', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            setRiskZones(data.data);
            setFilteredRiskZones(data.data);
        } catch (error) {
            console.error('Error fetching risk zones:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init(); fetchRiskZones();
    }, []);
    const [loading, setLoading] = useState(true);
    const [riskZones, setRiskZones] = useState<RiskZone[]>([]);
    const [filteredRiskZones, setFilteredRiskZones] = useState<RiskZone[]>(riskZones);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentZone, setCurrentZone] = useState<RiskZone | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleClickOpen = (zone: RiskZone | null = null) => {
        setCurrentZone(zone);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDeleteDialog(false);
    };

    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = riskZones.filter((zone) =>
            zone.title.toLowerCase().includes(query)
        );
        setFilteredRiskZones(filtered);
    };

    useEffect(() => {
        AOS.init();
        setLoading(false); // Simula la carga completa después de inicializar AOS
    }, []);

    return (
        <PageContainer title="Zonas de Riesgo" description="Informar sobre zonas de riesgos naturales y antrópicos.">
            <DashboardCard title="">
                <Box>
                    <Toaster /> {/* Componente para mostrar notificaciones */}
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h2" gutterBottom data-aos="fade-down">Zonas de Riesgo</Typography>
                        <Typography variant="h6" color="text.secondary" data-aos="fade-down">Administra la información sobre zonas de riesgos naturales y antrópicos.</Typography>
                    </Box>

                    <TextField
                        label="Buscar por título"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                        fullWidth
                        sx={{ mb: 4, maxWidth: 400 }}
                    />

                    <Grid container spacing={4} justifyContent="center">
                        {filteredRiskZones?.map((zone) => (
                            zone && (
                                <Grid item xs={12} md={6} key={zone.id} data-aos="fade-up">
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {zone.title}
                                            </Typography>
                                            <Box
                                                component="div"
                                                dangerouslySetInnerHTML={{ __html: zone.description }}
                                                sx={{ whiteSpace: 'pre-wrap' }}
                                            />
                                            <Box mt={2}>
                                                <Tooltip title="Ver en Google Maps">
                                                    <Button
                                                        component={Link}
                                                        href={`https://www.google.com/maps?q=${zone.latitude},${zone.longitude}`}
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
                                                        href={`https://www.waze.com/ul?ll=${zone.latitude},${zone.longitude}&navigate=yes`}
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
                            )
                        ))}
                    </Grid>
                </Box>
            </DashboardCard>
        </PageContainer>
    );
};

export default Municipalidad;

'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Typography, Grid, Card, CardContent, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Delete as DeleteIcon, Edit as EditIcon, Directions as DirectionsIcon } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import html2canvas from 'html2canvas';
import { Image as ImageIcon } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Tooltip } from '@mui/material';
import { IconBrandWaze } from '@tabler/icons-react';
import RoomIcon from '@mui/icons-material/Room';

interface Attraction {
    attraction_id: number;
    name: string;
    urlimg: string[];
    description: string;
    images: string[];
    location: string;
    latitude: number;
    longitude: number;
    type_attraction: string;
    status: string;
    website: string;
    opening_hours: string;
    remarks: string;
    services: string;
    owner: string;
    community: string;
    accessibility: string;
    contact_value: string;
    contact_type: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Título es obligatorio'),
    description: Yup.string().required('Descripción es obligatoria'),
    type_attraction: Yup.string().required('Tipo de atracción es obligatorio'),
    location: Yup.string().required('Ubicación es obligatoria'),
    latitude: Yup.number().required('Latitud es obligatoria').min(-90).max(90),
    longitude: Yup.number().required('Longitud es obligatoria').min(-180).max(180),
    opening_hours: Yup.string().required('Horario de apertura es obligatorio'),
    website: Yup.string().url('Debe ser una URL válida').nullable(),
    status: Yup.string().nullable(),
    ramp_access: Yup.boolean(),
});

interface Props {
    attraction: Attraction;
}

const Municipalidad: React.FC<Props> = ({ attraction }) => {
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentAttraction, setCurrentAttraction] = useState<Attraction | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [contactos, setContactos] = useState<{ contact_value: string; contact_type: string }[]>([]);
    const [contact_value, setValor] = useState('');
    const [contact_type, setTipo] = useState('phone');

    const fetchAttractions = async () => {
        try {
            const response = await fetch('http://localhost:9000/sit/public/atraccion/listar', {
                method: 'GET',
                //credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAttractions(data);
            setFilteredAttractions(data);
        } catch (error) {
            console.error('Error fetching attractions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init();
        fetchAttractions();
    }, []);

    const handleAddContact = () => {
        if (contact_value) {
            setContactos([...contactos, { contact_value, contact_type }]);
            setValor('');
        }
    };

    const handleDeleteContact = (index: number) => {
        const updatedContacts = contactos.filter((_, i) => i !== index);
        setContactos(updatedContacts);
    };

    const handleClickOpen = (attraction: Attraction | null = null) => {
        setCurrentAttraction(attraction);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDeleteDialog(false);
    };

    const handleDeleteConfirmation = (attraction: Attraction) => {
        setCurrentAttraction(attraction);
        setOpenDeleteDialog(true);
    };

    const getWazeUrl = (lat: number, lng: number) => `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`;
    const getGoogleMapsUrl = (lat: number, lng: number) => `https://www.google.com/maps?q=${lat},${lng}`;

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = attractions.filter(attraction =>
            attraction.name.toLowerCase().includes(query) ||
            attraction.description.toLowerCase().includes(query)
        );
        setFilteredAttractions(filtered);
    };

    return (
        <PageContainer title="Atracciones" description="Una página para gestionar atracciones turísticas">
            <DashboardCard>
                <Box>
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h2" gutterBottom data-aos="fade-down">Gestión de Atracciones Turísticas</Typography>
                        <Typography variant="h6" color="text.secondary" data-aos="fade-down">Administra las atracciones turísticas del cantón.</Typography>
                    </Box>
                    <TextField
                        label="Buscar"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={handleSearch}
                        value={searchQuery}
                        sx={{ mb: 4, maxWidth: 400 }}
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                    />
                    <Grid container spacing={4} justifyContent="center">
                        {filteredAttractions.map((attraction) => (
                            <Grid item xs={12} md={6} key={attraction.attraction_id} data-aos="fade-up">
                                <Card id={`attraction-${attraction.attraction_id}`} sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                                    <Carousel>
                                        {attraction.Images && attraction.Images.length > 0 ? (
                                            attraction.Images.map((Images, index) => (
                                                <img key={index} src={Images.url} alt={`Imagen ${index + 1}`} height="300" width="100%" />
                                            ))
                                        ) : (
                                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="300px">
                                                <ImageIcon style={{ fontSize: '50px', color: 'gray' }} />
                                                <Typography variant="body2" color="text.secondary">No hay imágenes disponibles</Typography>
                                            </Box>
                                        )}
                                    </Carousel>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" fontWeight="bold" color="primary">
                                            {attraction.name}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" gutterBottom>
                                            {attraction.description}
                                        </Typography>

                                        {/* Datos principales */}
                                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="textPrimary">
                                            Detalles
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Ubicación:</strong> {attraction.location}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Horario:</strong> {attraction.opening_hours}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Estado:</strong> {attraction.status || 'No especificado'}
                                        </Typography>

                                        {/* Mostrar el teléfono si está disponible */}
                                        {attraction.contact_value && (
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Teléfono:</strong> {attraction.contact_value}
                                            </Typography>
                                        )}

                                        {/* Sección de Servicios y Propietario */}
                                        <Box my={2}>
                                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="textPrimary">
                                                Servicios y Comunidad
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Comunidad:</strong> {attraction.community || 'No especificado'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Propietario:</strong> {attraction.owner || 'No especificado'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Servicios:</strong> {attraction.services || 'No especificados'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Accesibilidad:</strong> {attraction.accessibility || 'No especificados'}
                                            </Typography>
                                        </Box>

                                        <Box mt={2}>
                                            <Tooltip title="Ver en Google Maps">
                                                <Button                                  
                                                    color="primary"
                                                    href={getGoogleMapsUrl(attraction.latitude, attraction.longitude)}
                                                    target="_blank"
                                                    sx={{ mr: 1 }}
                                                >
                                                    <RoomIcon />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Ver en Waze">
                                                <Button        
                                                    color="secondary"
                                                    href={getWazeUrl(attraction.latitude, attraction.longitude)}
                                                    target="_blank"
                                                >
                                                    <IconBrandWaze />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Explorar su website">
                                                <Button      
                                                    color="primary"
                                                    href={attraction.website}
                                                    target="_blank"
                                                    sx={{ mr: 1 }}
                                                >
                                                    <TravelExploreIcon />
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
            <Toaster position="top-right" />
        </PageContainer>
    );
};
export default Municipalidad;

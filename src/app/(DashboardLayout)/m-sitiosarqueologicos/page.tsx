'use client';
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Link, Tooltip } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, Directions as DirectionsIcon, PhotoCamera, Clear as ClearIcon } from '@mui/icons-material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import { IconBrandWaze } from '@tabler/icons-react';
import RoomIcon from '@mui/icons-material/Room';

// Interfaz de la información de sitios arqueológicos
interface ArchaeologicalSite {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    images: string[]; // Cambiado a un arreglo de strings
}

// Validación con Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Nombre es obligatorio'),
    description: Yup.string().required('Descripción es obligatoria'),
    latitude: Yup.number().required('Latitud es obligatoria'),
    longitude: Yup.number().required('Longitud es obligatoria'),
});

const Municipalidad = () => {
    const fetchSites = async () => {
        try {
            const response = await fetch('http://localhost:9000/sit/public/sitio-arqueologico/listar', {
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
            setArchaeologicalSites(data.data)
            setFilteredSites(data.data)
        } catch (error) {
            console.error('Error fetching archaeological sites:', error);
        } finally {
            setLoading(false);
        }
    };

    const [loading, setLoading] = useState(true);
    const [archaeologicalSites, setArchaeologicalSites] = useState<ArchaeologicalSite[]>([]);
    const [filteredSites, setFilteredSites] = useState<ArchaeologicalSite[]>(archaeologicalSites);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentSite, setCurrentSite] = useState<ArchaeologicalSite | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleClickOpen = (site: ArchaeologicalSite | null = null) => {
        setCurrentSite(site);
        setPreviewImage(site?.images[0] || null); // Asumimos que siempre muestra la primera imagen
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDeleteDialog(false);
        setSelectedImage(null);
        setPreviewImage(null);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            const newImages = files.map(file => URL.createObjectURL(file));
            setSelectedImage(event.target.files[0]);
            setPreviewImage(newImages[0]); // Previsualiza la primera imagen seleccionada
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setPreviewImage(null);
    };

    

    const handleDeleteConfirmation = (site: ArchaeologicalSite) => {
        setCurrentSite(site);
        setOpenDeleteDialog(true);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = archaeologicalSites.filter((site) =>
            site.name.toLowerCase().includes(query)
        );
        setFilteredSites(filtered);
    };

    useEffect(() => {
        AOS.init();
        fetchSites()
        setLoading(false);
    }, []);

    return (
        <PageContainer title="Sitios Arqueológicos" description="Documentar puntos y ubicaciones de sitios arqueológicos registrados.">
            <DashboardCard title="">
                <Box>
                    <Toaster />
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h2" gutterBottom data-aos="fade-down">Sitios Arqueológicos</Typography>
                    </Box>

                    <TextField
                        label="Buscar por nombre"
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
                        {filteredSites.map((site) => (
                            <Grid item xs={12} md={6} key={site.id} data-aos="fade-up">
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {site.name}
                                        </Typography>
                                        <Box
                                            component="div"
                                            dangerouslySetInnerHTML={{ __html: site.description }}
                                            sx={{ whiteSpace: 'pre-wrap' }}
                                        />
                                        {site.Images && site.Images.length > 0 && (
                                            <Box mt={2}>
                                                <img
                                                    src={site.Images[0].url} // Muestra la primera imagen
                                                    alt={site.name}
                                                    style={{ maxWidth: '100%', borderRadius: '8px' }} // Estilo opcional
                                                />
                                            </Box>
                                        )}
                                        <Box mt={2}>
                                            <Tooltip title="Ver en Google Maps">
                                                    <Button
                                                         component={Link}
                                                         href={`https://www.google.com/maps?q=${site.latitude},${site.longitude}`}
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
                                                        href={`https://www.waze.com/ul?ll=${site.latitude},${site.longitude}&navigate=yes`}
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

export default Municipalidad;

'use client';
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, InputLabel, FormControl, Link } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, DirectionsBus as BusIcon, CarRental as CarIcon, DirectionsBike as BikeIcon, LocationOn as LocationIcon, Launch as LaunchIcon, Search as SearchIcon, LocationOn } from '@mui/icons-material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import Carousel from 'react-material-ui-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';

import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Tooltip } from '@mui/material';

// Interfaz de la información de transporte
interface TransportInfo {
    id: number;
    title: string;
    description: string;
    type: string; // Transporte público, alquiler de vehículos, etc.
    website?: string; // Sitio web opcional
    phone?: string; // Número de teléfono opcional
    images: string[]; // Array de imágenes
    urlimg: string[];
}

// Validación con Yup
const validationSchema = Yup.object({
    title: Yup.string().required('Título es obligatorio'),
    description: Yup.string().required('Descripción es obligatoria'),
    type: Yup.string().required('Tipo es obligatorio'),
    website: Yup.string().url('URL inválida').notRequired(), // Validación opcional para el sitio web
    phone: Yup.string().nullable(), // Validación opcional para el teléfono
});

// Iconos para los tipos de transporte
const transportIcons: Record<string, React.ReactNode> = {
    "Transporte Público": <BusIcon />,
    "Alquiler de Vehículos": <CarIcon />,
    "Bicicletas": <BikeIcon />,
    "Cómo Llegar": <LocationOn />,
};

const Municipalidad = () => {
    const fetchAttractions = async () => {
        try {
            const response = await fetch('http://localhost:9000/sit/public/transporte/listar', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //console.log(await response.json())
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            //setData(data);
            console.log(data)
            setTransportInfos(data.data)
            setFilteredTransportInfos(data.data)
        } catch (error) {
            console.error('Error fetching attractions:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        AOS.init(), fetchAttractions();
    }, []);

    const [loading, setLoading] = useState(true); // Estado de carga
    const [transportInfos, setTransportInfos] = useState<TransportInfo[]>([]);
    const [filteredTransportInfos, setFilteredTransportInfos] = useState<TransportInfo[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentInfo, setCurrentInfo] = useState<TransportInfo | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleClickOpen = (info: TransportInfo | null = null) => {
        setCurrentInfo(info);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDeleteDialog(false);
    };

    const handleSave = async (values: Omit<TransportInfo, 'id'>) => {
        let updatedInfos;

        if (currentInfo) {
            // Actualizar información existente
            updatedInfos = transportInfos.map(info =>
                info.id === currentInfo.id ? { ...info, ...values } : info
            );
            toast.success('Información actualizada con éxito'); // Notificación de éxito
        } else {
            try {
                // Agregar nueva información
                const addTransportResponse = await fetch('http://localhost:9000/sit/transporte/agregar', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!addTransportResponse.ok) {
                    throw new Error('Error al agregar el transporte');
                }

                const newTransport = await addTransportResponse.json();
                console.log(newTransport)
                // Subida de imágenes (si existen)
                if (values.images.length !== 0) {
                    console.log(values.images)
                    const formData = new FormData();
                    values.images.forEach((file) => {
                        formData.append('images', file); // 'images' es la clave que esperas en el backend
                    });

                    const imageUploadResponse = await fetch('http://localhost:9000/sit/transporte/agregar-imagenes/' + newTransport.data.transport_id, {
                        method: 'POST',
                        credentials: 'include',
                        body: formData,
                    });

                    // Si la subida de imágenes falla, se elimina el transporte previamente agregado
                    if (!imageUploadResponse.ok) {
                        await fetch('http://localhost:9000/sit/transporte/eliminar/' + newTransport.data.transport_id, {
                            method: 'DELETE',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        const errorData = await imageUploadResponse.json();
                        throw new Error(`Error al subir imágenes: ${errorData.message || 'Error desconocido'}`);
                    }
                    // Actualizar lista de transportes con el nuevo transporte
                    console.log('hlaa')
                    fetchAttractions()
                    updatedInfos = [...transportInfos, { id: newTransport.data.transport_id, ...values, images: [] }] as TransportInfo[];
                    toast.success('Información agregada con éxito'); // Notificación de éxito

                    // Actualización del estado
                    setTransportInfos(updatedInfos);
                    setFilteredTransportInfos(updatedInfos);
                    handleCloseDialog();
                }


            } catch (error) {
                toast.error('Error al agregar la información de transporte');
                console.error('Error:', error);
                return;
            }
        }
    };

    // Función para manejar la búsqueda
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = transportInfos.filter((info) =>
            info.type.toLowerCase().includes(query)
        );
        setFilteredTransportInfos(filtered);
    };

    return (
        <PageContainer title="Transporte">
            <DashboardCard title="">
                <Box>
                    <Toaster /> {/* Agregar Toaster para mostrar notificaciones */}
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h2" gutterBottom data-aos="fade-down">Información de Transporte</Typography>
                        <Typography variant="h6" color="text.secondary" data-aos="fade-down">Administra la información sobre transporte en el cantón.</Typography>
                    </Box>
                    <TextField
                        label="Buscar por tipo de transporte"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                        fullWidth
                        sx={{
                            mb: 4,
                            maxWidth: 400
                        }}
                    />

                    <Grid container spacing={4} justifyContent="center">
                        {filteredTransportInfos.map((info) => (
                            <Grid item xs={12} md={6} key={info.transport_id} data-aos="fade-up">
                                <Card>
                                    <CardContent>
                                        {/* Carrusel de Imágenes */}
                                        {info.Images && info.Images.length > 0 && (
                                            <Carousel
                                                showThumbs={false}
                                                showStatus={false}
                                                infiniteLoop
                                                autoPlay
                                                interval={3000}
                                                transitionTime={500}
                                            >
                                                {info.Images.map((Image, index) => (
                                                    Image.url ? (
                                                        <img
                                                            key={index}
                                                            src={Image.url}
                                                            alt={`Imagen ${index + 1}`}
                                                            style={{
                                                                width: '100%',
                                                                height: '300px', // Ajusta la altura
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                    ) : null
                                                ))}
                                            </Carousel>
                                        )}

                                        {/* Información textual */}
                                        <Typography gutterBottom variant="h5" component="div">
                                            {info.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {info.description}
                                        </Typography>
                                        <Box display="flex" alignItems="center" mt={1}>
                                            {transportIcons[info.type]}
                                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                                {info.type}
                                            </Typography>
                                        </Box>
                                        {info.phone && (
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                Teléfono: {info.phone}
                                            </Typography>
                                        )}
                                        {info.website && (
                                            <Box mt={2}>
                                                <Tooltip title="Explorar su website">
                                                <Button      
                                                    component={Link}
                                                    href={info.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <TravelExploreIcon />
                                                </Button>
                                            </Tooltip>
                                            </Box>
                                        )}
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

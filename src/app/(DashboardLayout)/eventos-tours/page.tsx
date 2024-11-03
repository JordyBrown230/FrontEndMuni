'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, IconButton, Modal, Button, Collapse, Tooltip } from '@mui/material';
import { getEventosTours, EventoTour } from '@/services/eventotour.service';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { styled } from '@mui/system';
import RoomIcon from '@mui/icons-material/Room';
import { IconBrandWaze } from '@tabler/icons-react';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const CustomCard = styled(Card)({
    borderRadius: '16px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
});

const EventosToursList = () => {
    const [eventosTours, setEventosTours] = useState<EventoTour[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEvento, setCurrentEvento] = useState<EventoTour | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEventosTours();
                setEventosTours(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching eventos/tours:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleExpandClick = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const openImageModal = (evento: EventoTour) => {
        setCurrentEvento(evento);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentEvento(null);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f7f8fc', borderRadius: '10px' }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Eventos y Tours
            </Typography>

            <Grid container spacing={4}>
                {eventosTours.map((evento, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={evento.idEventoTour}>
                        <CustomCard>
                            <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                                {evento.fotosEventoTour && evento.fotosEventoTour.length > 0 ? (
                                    <img
                                        src={`data:image/jpeg;base64,${Buffer.from(evento.fotosEventoTour[0].foto).toString('base64')}`}
                                        alt="Evento o Tour"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                                        onClick={() => openImageModal(evento)}
                                    />
                                ) : (
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#e0e0e0',
                                        height: '100%',
                                    }}
                                    >
                                        <Typography variant="body2" color="textSecondary">
                                            No hay fotos disponibles
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {evento.nombre}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                    {evento.descripcion ? evento.descripcion : 'Descripción no disponible.'}
                                </Typography>
                                <Box display="flex" justifyContent="flex-end" mt={2}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleExpandClick(idx)}
                                        endIcon={expandedIndex === idx ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    >
                                        {expandedIndex === idx ? "Ver Menos" : "Ver Más"}
                                    </Button>
                                </Box>

                                <Collapse in={expandedIndex === idx} timeout="auto" unmountOnExit>
                                    <Typography variant="body1" mt={2}>
                                        Ubicación: {evento.ubicacion}
                                    </Typography>
                                    <Typography variant="body1" mt={1}>
                                        Fecha de Inicio: {new Date(evento.fechaInicio).toLocaleDateString()}
                                    </Typography>
                                    {evento.fechaFin && (
                                        <Typography variant="body1" mt={1}>
                                            Fecha de Fin: {new Date(evento.fechaFin).toLocaleDateString()}
                                        </Typography>
                                    )}
                                    <Typography variant="body1" mt={1}>
                                        Hora de Inicio: {evento.horaInicio}
                                    </Typography>
                                    {evento.horaFin && (
                                        <Typography variant="body1" mt={1}>
                                            Hora de Fin: {evento.horaFin}
                                        </Typography>
                                    )}
                                    {evento.precio && (
                                        <Typography variant="body1" mt={1}>
                                            Precio: ${Number(evento.precio).toFixed(2)}
                                        </Typography>
                                    )}
                                    {evento.capacidadMaxima && (
                                        <Typography variant="body1" mt={1}>
                                            Capacidad Máxima: {evento.capacidadMaxima}
                                        </Typography>
                                    )}
                                    <Typography variant="body1" mt={1}>
                                        Organizador: {evento.organizador || 'No especificado'}
                                    </Typography>
                                </Collapse>

                                <Box display="flex" gap={1} mt={2}>
                                    {evento.urlGoogleMaps && (
                                        <Tooltip title="Ver en Google Maps">
                                            <IconButton
                                                color="primary"
                                                component="a"
                                                href={evento.urlGoogleMaps}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <RoomIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    {evento && (
                                        <Tooltip title="Ver en Waze">
                                            <IconButton
                                                color="primary"
                                                component="a"
                                                href={evento.urlWaze}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <IconBrandWaze />
                                            </IconButton>
                                        </Tooltip>
                                    )}

                                    <Tooltip title="Explorar su website">
                                        <IconButton
                                            color="primary"
                                            component="a"
                                            href={evento.website}
                                        >
                                            <TravelExploreIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </CardContent>
                        </CustomCard>
                    </Grid>
                ))}
            </Grid>

            <Modal open={modalOpen} onClose={closeModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: '8px',
                    boxShadow: 24,
                    p: 2,
                    width: '80%',
                    maxWidth: '600px',
                    textAlign: 'center',
                }}
                >
                    {currentEvento && currentEvento.fotosEventoTour && currentEvento.fotosEventoTour.length > 0 && (
                        <img
                            src={`data:image/jpeg;base64,${Buffer.from(currentEvento.fotosEventoTour[0].foto).toString('base64')}`}
                            alt="Evento o Tour grande"
                            style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
                        />
                    )}
                    <IconButton
                        sx={{ position: 'absolute', top: 10, right: 10 }}
                        onClick={closeModal}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Modal>
        </Box>
    );
};

export default EventosToursList;

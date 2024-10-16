'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, IconButton, Modal, Button, Collapse } from '@mui/material';
import { getServiciosSeguridad, ServiciosSeguridad } from '@/services/serviciosseguridad.service';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { styled } from '@mui/system';

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

const ServiciosSeguridadList = () => {
    const [serviciosSeguridad, setServiciosSeguridad] = useState<ServiciosSeguridad[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentServicio, setCurrentServicio] = useState<ServiciosSeguridad | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getServiciosSeguridad();
                setServiciosSeguridad(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching servicios de seguridad:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleExpandClick = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const openImageModal = (servicio: ServiciosSeguridad) => {
        setCurrentServicio(servicio);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentServicio(null);
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
                Servicios de Seguridad
            </Typography>

            <Grid container spacing={4}>
                {serviciosSeguridad.map((servicio, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={servicio.idServicioSeguridad}>
                        <CustomCard>
                            <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                                {servicio.foto ? (
                                    <img
                                        src={`data:image/jpeg;base64,${Buffer.from(servicio.foto).toString('base64')}`}
                                        alt="Servicio de Seguridad"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                                        onClick={() => openImageModal(servicio)}
                                    />
                                ) : (
                                    <Box
                                        sx={{
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
                                    {servicio.nombre}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                    {servicio.descripcion ? servicio.descripcion : 'Descripción no disponible.'}
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
                                        Dirección: {servicio.direccion}
                                    </Typography>
                                    <Typography variant="body1" mt={1}>
                                        Teléfono: {servicio.telefono || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1" mt={1}>
                                        Horario: {servicio.horario || 'N/A'}
                                    </Typography>
                                </Collapse>
                            </CardContent>
                        </CustomCard>
                    </Grid>
                ))}
            </Grid>

            <Modal open={modalOpen} onClose={closeModal}>
                <Box
                    sx={{
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
                    {currentServicio && currentServicio.foto && (
                        <img
                            src={`data:image/jpeg;base64,${Buffer.from(currentServicio.foto).toString('base64')}`}
                            alt="Servicio de Seguridad grande"
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

export default ServiciosSeguridadList;

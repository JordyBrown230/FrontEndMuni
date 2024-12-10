"use client";

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Button,
  Collapse,
  Tooltip,
} from '@mui/material';
import { getEstablecimientos, Establecimiento } from '../../../services/establecimiento.service';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { styled } from '@mui/system';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { IconBrandWaze } from '@tabler/icons-react';
import RoomIcon from '@mui/icons-material/Room';

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

const EstablecimientosList = () => {
  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEstablecimiento, setCurrentEstablecimiento] = useState<Establecimiento | null>(null);
  const [imageIndex, setImageIndex] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEstablecimientos();
        setEstablecimientos(data);
        setImageIndex(data.map(() => 0)); // Inicializa el índice de cada card a 0
        setLoading(false);
      } catch (error) {
        console.error('Error fetching establecimientos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExpandClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handlePreviousImageCard = (index: number) => {
    setImageIndex((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = newIndices[index] > 0 ? newIndices[index] - 1 : newIndices[index];
      return newIndices;
    });
  };

  const handleNextImageCard = (index: number, totalFotos: number) => {
    setImageIndex((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = newIndices[index] < totalFotos - 1 ? newIndices[index] + 1 : newIndices[index];
      return newIndices;
    });
  };

  const openImageModal = (establecimiento: Establecimiento, index: number) => {
    setCurrentEstablecimiento(establecimiento);
    setImageIndex([index]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentEstablecimiento(null);
  };

  const handlePreviousImageModal = () => {
    if (currentEstablecimiento) {
      setImageIndex((prevIndices) => {
        const newIndex = prevIndices[0] > 0 ? prevIndices[0] - 1 : prevIndices[0];
        return [newIndex];
      });
    }
  };

  const handleNextImageModal = (totalFotos: number) => {
    if (currentEstablecimiento) {
      setImageIndex((prevIndices) => {
        const newIndex = prevIndices[0] < totalFotos - 1 ? prevIndices[0] + 1 : prevIndices[0];
        return [newIndex];
      });
    }
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
        Establecimientos Turísticos
      </Typography>

      <Grid container spacing={4}>
        {establecimientos.map((establecimiento, idx) => (
          <Grid item xs={12} sm={6} md={4} key={establecimiento.idEstablecimiento}>
            <CustomCard>
              <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                {establecimiento.fotosEstablecimiento && establecimiento.fotosEstablecimiento.length > 0 ? (
                  <>
                    <img
                      src={establecimiento.fotosEstablecimiento[imageIndex[idx] || 0].url}
                      alt="Establecimiento"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => openImageModal(establecimiento, imageIndex[idx] || 0)}
                    />
                    <IconButton
                      sx={{ position: 'absolute', top: '50%', left: 5, transform: 'translateY(-50%)', zIndex: 2 }}
                      onClick={() => handlePreviousImageCard(idx)}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      sx={{ position: 'absolute', top: '50%', right: 5, transform: 'translateY(-50%)', zIndex: 2 }}
                      onClick={() => handleNextImageCard(idx, establecimiento.fotosEstablecimiento.length)}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </>
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
                  {establecimiento.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {establecimiento.descripcion ? establecimiento.descripcion : 'Descripción no disponible.'}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                 Dirección: {establecimiento.direccion ? establecimiento.direccion : 'Dirección no disponible.'}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                 Teléfono: {establecimiento ? establecimiento.telefono: 'Teléfono no disponible.'}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 'medium' }}>
                  Categoría: {establecimiento.categoria?.nombre || 'Sin categoría asignada'}
                </Typography>

                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => handleExpandClick(idx)}
                    endIcon={expandedIndex === idx ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  >
                    {expandedIndex === idx ? 'Ver Menos' : 'Ver Más'}
                  </Button>
                </Box>

                <Collapse in={expandedIndex === idx} timeout="auto" unmountOnExit>
                  <Typography variant="body1" mt={1}>
                    Propietario: {establecimiento.propietario?.nombre || 'Sin propietario asignado'}
                  </Typography>
                  <Typography variant="body1" mt={1}>
                    Teléfono: {establecimiento.propietario?.telefono || 'N/A'}
                  </Typography>
                  <Typography variant="body1" mt={1}>
                    Correo: {establecimiento.propietario?.correo || 'N/A'}
                  </Typography>
                </Collapse>
                <Box display="flex" gap={1} mt={2}>
                  {/* Icono de Google Maps */}
                  {establecimiento.urlGoogleMaps && (
                    <Tooltip title="Ver en Google Maps">
                      <IconButton
                        color="primary"
                        component="a"
                        href={establecimiento.urlGoogleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RoomIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                  {establecimiento.urlWaze && (
                    <Tooltip title="Ver en Waze">
                      <IconButton
                        color="primary"
                        component="a"
                        href={establecimiento.urlWaze}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconBrandWaze />
                      </IconButton>
                    </Tooltip>
                  )}

                  {/* Icono de Exploración */}
                  {establecimiento.website&&(
                  <Tooltip title="Explorar su website">
                    <IconButton
                      color="primary"
                      component="a"
                      href={establecimiento.website}
                      >
                      <TravelExploreIcon />
                    </IconButton>
                  </Tooltip>
                  )}
                </Box>
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
          {currentEstablecimiento && (
            <>
              <Box position="relative">
                <IconButton
                  sx={{ position: 'absolute', left: 10, zIndex: 10, top: '45%' }}
                  onClick={handlePreviousImageModal}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <img
                  src={currentEstablecimiento.fotosEstablecimiento[imageIndex[0]].url}
                  alt="Establecimiento grande"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
                />
                <IconButton
                  sx={{ position: 'absolute', right: 10, zIndex: 10, top: '45%' }}
                  onClick={() => handleNextImageModal(currentEstablecimiento.fotosEstablecimiento.length)}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
              <IconButton
                sx={{ position: 'absolute', top: 10, right: 10 }}
                onClick={closeModal}
              >
                <CloseIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default EstablecimientosList;

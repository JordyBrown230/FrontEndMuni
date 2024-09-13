"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, IconButton, Modal } from '@mui/material';
import { getEstablecimientos, Establecimiento } from '../../../services/establecimiento.service';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const EstablecimientosList = () => {
  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null); // Índice de la imagen seleccionada en el modal
  const [currentIndex, setCurrentIndex] = useState<number[]>([]); // Índice de la foto actual para cada establecimiento
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEstablecimiento, setCurrentEstablecimiento] = useState<Establecimiento | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEstablecimientos();
        setEstablecimientos(data);

        // Inicializar el índice de cada establecimiento en 0
        const initialIndices = data.map(() => 0);
        setCurrentIndex(initialIndices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching establecimientos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrevious = (index: number) => {
    setCurrentIndex((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = newIndices[index] > 0 ? newIndices[index] - 1 : newIndices[index];
      return newIndices;
    });
  };

  const handleNext = (index: number, totalFotos: number) => {
    setCurrentIndex((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = newIndices[index] < totalFotos - 1 ? newIndices[index] + 1 : newIndices[index];
      return newIndices;
    });
  };

  const openImageModal = (index: number, establecimiento: Establecimiento) => {
    setSelectedImageIndex(currentIndex[index]);
    setCurrentEstablecimiento(establecimiento);
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
    setModalOpen(false);
  };

  const handleModalNext = () => {
    if (selectedImageIndex !== null && currentEstablecimiento) {
      setSelectedImageIndex((prevIndex:any) =>
        prevIndex < currentEstablecimiento.fotosEstablecimiento.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  const handleModalPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex:any) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
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
<Box sx={{ padding: '20px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', minHeight: '100vh', borderRadius: '10px' }}>
<Typography variant="h3" align="center" gutterBottom>
        Establecimientos Turísticos
      </Typography>

      <Grid container spacing={4}>
        {establecimientos.map((establecimiento, idx) => (
          <Grid item xs={12} sm={6} md={4} key={establecimiento.idEstablecimiento}>
            <Card sx={{ backgroundColor: '#ffffff', color: '#333', position: 'relative' }}>
              <CardContent>
                <Typography variant="h5" style={{textAlign:'center'}}>{establecimiento.nombre}</Typography>

                {/* Carrusel de fotos del establecimiento */}
                {establecimiento.fotosEstablecimiento && establecimiento.fotosEstablecimiento.length > 0 ? (
                  <Box position="relative" sx={{ mt: 2 }}>
                    <img
                      src={`data:image/jpeg;base64,${Buffer.from(
                        establecimiento.fotosEstablecimiento[currentIndex[idx] || 0].foto
                      ).toString('base64')}`}
                      alt="Establecimiento"
                      style={{ width: '100%', borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => openImageModal(idx, establecimiento)}
                    />
                    {/* Botones para navegar entre fotos */}
                    <IconButton
                      sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
                      onClick={() => handlePrevious(idx)}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
                      onClick={() =>
                        handleNext(idx, establecimiento.fotosEstablecimiento.length)
                      }
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography variant="body2" mt={2} color="textSecondary">
                    No hay fotos disponibles
                  </Typography>
                )}

                {/* Información del establecimiento después de las fotos */}
                <Typography variant="body2" mt={2}>{establecimiento.direccion}</Typography>

                <Typography variant="body1" mt={2}>
                  Categoría: {establecimiento.categoria?.nombre || 'Sin categoría asignada'}
                </Typography>

                <Typography variant="body2" mt={1}>
                  Propietario: {establecimiento.propietario?.nombre || 'Sin propietario asignado'} <br />
                  Tel: {establecimiento.propietario?.telefono || 'N/A'} <br />
                  Correo: {establecimiento.propietario?.correo || 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para mostrar la imagen en grande con navegación */}
      <Modal open={modalOpen} onClose={closeImageModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            width: '80%',
            maxWidth: '600px',
            textAlign: 'center',
          }}
        >
          {selectedImageIndex !== null && currentEstablecimiento && (
            <>
              <img
                src={`data:image/jpeg;base64,${Buffer.from(
                  currentEstablecimiento.fotosEstablecimiento[selectedImageIndex].foto
                ).toString('base64')}`}
                alt="Establecimiento grande"
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <IconButton
                sx={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)' }}
                onClick={handleModalPrevious}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                sx={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)' }}
                onClick={handleModalNext}
              >
                <ArrowForwardIosIcon />
              </IconButton>
              <IconButton
                sx={{ position: 'absolute', top: 10, right: 10 }}
                onClick={closeImageModal}
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

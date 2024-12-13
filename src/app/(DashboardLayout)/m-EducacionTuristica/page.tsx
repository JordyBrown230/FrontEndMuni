'use client';
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, InputLabel, FormControl, Link, List, ListItem, ListItemText } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Launch as LaunchIcon, Search as SearchIcon, AttachFile as AttachFileIcon, Close as CloseIcon } from '@mui/icons-material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa los estilos de Quill

// Interfaz para los recursos educativos
interface EducationalResource {
    id: number;
    title: string;
    description: string;
    link?: string;
    category: string;
    publicationDate: string;
    authors: string[];
    fileUrl?: string;
}

// Validación con Yup
const validationSchema = Yup.object({
    title: Yup.string().required('Título es obligatorio'),
    description: Yup.string().required('Descripción es obligatoria'),
    link: Yup.string().url('URL inválida').notRequired(),
    category: Yup.string().required('Categoría es obligatoria'),
    publicationDate: Yup.date().required('Fecha de publicación es obligatoria').nullable(),
    authors: Yup.array().of(Yup.string().required('Nombre del autor es obligatorio')).min(1, 'Debe haber al menos un autor'),
});

const EducationTourism = () => {
    const fetchEdu = async () => {
        try {
            const response = await fetch('http://localhost:9000/sit/public/educacion-turistica/listar', {
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
            const resources = data.data.map((item: any) => ({
                ...item,
                authors: Array.isArray(item.authors) ? item.authors : [], // Asegúrate de que sea un array
            }));
    
            setEducationalResources(resources);
            setFilteredResources(resources);
        } catch (error) {
            console.error('Error fetching attractions:', error);
        }
    };    

    useEffect(() => {
        AOS.init(); fetchEdu();
    }, []);

    const [educationalResources, setEducationalResources] = useState<EducationalResource[]>([]);
    const [filteredResources, setFilteredResources] = useState<EducationalResource[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentResource, setCurrentResource] = useState<EducationalResource | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleClickOpen = (resource: EducationalResource | null = null) => {
        setCurrentResource(resource);
        setOpenDialog(true);
        setFile(null); // Resetear el archivo seleccionado
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDeleteDialog(false);
        setFile(null); // Resetear el archivo seleccionado
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };
    
    

    const handleDeleteConfirmation = (resource: EducationalResource) => {
        setCurrentResource(resource);
        setOpenDeleteDialog(true);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = educationalResources.filter((resource) =>
            resource.title.toLowerCase().includes(query)
        );
        setFilteredResources(filtered);
    };

    return (
        <PageContainer title="Educación Turística" description="Crea y administra recursos educativos sobre turismo sostenible y responsable.">
            <DashboardCard title="">
                <Box>
                    <Toaster />
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h2" gutterBottom data-aos="fade-down">Educación Turística</Typography>
                        <Typography variant="h6" color="text.secondary" data-aos="fade-down">Crea y administra recursos educativos sobre turismo sostenible y responsable.</Typography>
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
                        {filteredResources.map((resource) => (
                            <Grid item xs={12} md={6} key={resource.id} data-aos="fade-up">
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {resource.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {/* Renderizamos el contenido de la descripción como HTML */}
                                            <div dangerouslySetInnerHTML={{ __html: resource.description }} />
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                            <strong>Categoría:</strong> {resource.category}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Fecha de Publicación:</strong> {resource.publicationDate}
                                        </Typography>
                                        <List dense>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                                <strong>Autores:</strong>
                                            </Typography>
                                            {resource.authors.map((author, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary={author} />
                                                </ListItem>
                                            ))}
                                        </List>
                                        {resource.link && (
                                            <Box mt={2}>
                                                <Button
                                                    component={Link}
                                                    href={resource.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    variant="outlined"
                                                    startIcon={<LaunchIcon />}
                                                >
                                                    Ver Recurso
                                                </Button>
                                            </Box>
                                        )}
                                         {resource.document_files && resource.document_files.length > 0 && (
                                            <Box mt={2}>
                                                {resource.document_files.map((file) => (
                                                    <Button
                                                        key={file.id}
                                                        component={Link}
                                                        href={`http://localhost:9000/${file.filePath}`} // Asegúrate de que la ruta sea correcta
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        variant="outlined"
                                                        startIcon={<AttachFileIcon />}
                                                    >
                                                        Ver Documento: {file.filename}
                                                    </Button>
                                                ))}
                                            </Box>
                                        )}
                                        <Box mt={2}>
                                            <IconButton onClick={() => handleClickOpen(resource)} aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteConfirmation(resource)} aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
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

export default EducationTourism;

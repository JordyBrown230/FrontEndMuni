'use client';
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Link } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Launch as LaunchIcon, Search as SearchIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa el estilo de Quill
import { Close as CloseIcon } from '@mui/icons-material';

// Interfaz de la información legal y regulatoria
interface LegalInfo {
    id: number;
    title: string;
    description: string;
    website?: string;
    fileUrl?: string; // URL del archivo adjunto
}

// Validación con Yup
const validationSchema = Yup.object({
    title: Yup.string().required('Título es obligatorio'),
    description: Yup.string().required('Descripción es obligatoria'),
    website: Yup.string().url('URL inválida').notRequired(),
});

const Municipalidad = () => {
    const fetchAttractions = async () => {
        try {
            const response = await fetch('http://localhost:9000/sit/public/info-legal-regulatoria/listar', {
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
            setLegalInfos(data.data);
            setFilteredLegalInfos(data.data);
        } catch (error) {
            console.error('Error fetching attractions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init(); fetchAttractions();
    }, []);

    const [loading, setLoading] = useState(true);
    const [legalInfos, setLegalInfos] = useState<LegalInfo[]>([]);
    const [filteredLegalInfos, setFilteredLegalInfos] = useState<LegalInfo[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = legalInfos.filter((info) =>
            info.title.toLowerCase().includes(query)
        );
        setFilteredLegalInfos(filtered);
    };

    return (
        <PageContainer title="Información Legal y Regulatoria" description="Proveer información sobre normativas locales relacionadas con el turismo.">
            <DashboardCard title="">
                <Box>
                    <Toaster />
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h2" gutterBottom data-aos="fade-down">Información Legal y Regulatoria</Typography>
                        <Typography variant="h6" color="text.secondary" data-aos="fade-down">Administra la información sobre normativas locales relacionadas con el turismo.</Typography>
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
                        {filteredLegalInfos.map((info) => (
                            <Grid item xs={12} md={6} key={info.id} data-aos="fade-up">
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {info.title}
                                        </Typography>
                                        <Box
                                            component="div"
                                            dangerouslySetInnerHTML={{ __html: info.description }}
                                            sx={{ whiteSpace: 'pre-wrap' }}
                                        />
                                        {info.website && (
                                            <Box mt={2}>
                                                <Button
                                                    component={Link}
                                                    href={info.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    variant="outlined"
                                                    startIcon={<LaunchIcon />}
                                                >
                                                    Sitio Web
                                                </Button>
                                            </Box>
                                        )}
                                        {info.document_files && info.document_files.length > 0 && (
                                            <Box mt={2}>
                                                {info.document_files.map((file) => (
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
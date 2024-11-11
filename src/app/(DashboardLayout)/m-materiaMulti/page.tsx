'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl, DialogContentText } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast, { Toaster } from 'react-hot-toast';


interface FileType {
    file: File;
    url: string;
    name: string;
    title: string;
    description: string;
    type: string;
}

const Municipalidad: React.FC = () => {
    const fetchMulti = async () => {
        try {
            const response = await fetch('http://localhost:9000/sit/public/multimedia/listar', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //console.log(await response.json())
            if (!response.ok) {
                throw new Error('Network response was not ok'); // Manejo de errores de red
            }
            const data = await response.json();
            setFiles(data.data)
            // setFilter(data)
        } catch (error) {
            console.error('Error fetching attractions:', error);
        } finally {

        }
    };



    const [files, setFiles] = useState<FileType[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newName, setNewName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filter, setFilter] = useState<'all' | 'images' | 'videos'>('all');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            setSelectedFile(selectedFiles[0]);
            setOpenDialog(true);
        }
    };

    const handleAddFile = async () => {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            const newFile = {
                file: selectedFile,
                url,
                name: newName || selectedFile.name,
                title: newTitle,
                description: newDescription,
                type: selectedFile.type,
            };

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('title', newFile.title);
            formData.append('description', newFile.description);
            formData.append('name', newFile.name);
            formData.append('type', newFile.type);
            formData.append('url', newFile.url);
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
            console.log(selectedFile)
            console.log(newFile)

            console.log(formData);
            try {
                const response = await fetch('http://localhost:9000/sit/multimedia/agregar', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Error al agregar el archivo');
                }

                const data = await response.json();
                console.log(data.data)
                fetchMulti();
                setFiles(data.data);
                toast.success('Archivo agregado exitosamente!');

            } catch (error) {
                console.error('Error adding file:', error);
                toast.error('Error al agregar el archivo');
            }


            setFiles((prevFiles) => [...prevFiles, newFile]);
            resetForm();
            toast.success('Archivo agregado exitosamente!');
        }
    };

    const resetForm = () => {
        setNewTitle('');
        setNewDescription('');
        setNewName('');
        setSelectedFile(null);
        setOpenDialog(false);
    };

    const downloadFile = (file: FileType) => {
        fetch(file.url)
            .then(response => response.blob())
            .then(blob => {
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(downloadUrl); // Libera el objeto URL después de su uso
            })
            .catch(error => {
                console.error('Error al descargar el archivo:', error);
                toast.error('No se pudo descargar el archivo');
            });
    };

    const openEditDialog = (index: number) => {
        setCurrentFileIndex(index);
        setNewTitle(files[index].title);
        setNewDescription(files[index].description);
        setNewName(files[index].name);
        setOpenDialog(true);
    };

    useEffect(() => {
        AOS.init(); fetchMulti()
    }, []);

    const filteredFiles = files.filter((file) => {
        if (filter === 'images') return file.type.startsWith('image/');
        if (filter === 'videos') return file.type.startsWith('video/');
        return true; // 'all' filter
    });

    return (

        <PageContainer title="Multimedia" description="">
            <DashboardCard title="">
                {/* Título de la vista */}
                <Typography variant="h4" gutterBottom align="center">
                    Gestión de Archivos Multimedia
                </Typography>

                {/* Filtros para mostrar solo imágenes, videos o ambos */}
                <Box textAlign="center" mt={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Filtro</InputLabel>
                        <Select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as 'all' | 'images' | 'videos')}
                            label="Filtro"
                        >
                            <MenuItem value="all">Todos</MenuItem>
                            <MenuItem value="images">Imágenes</MenuItem>
                            <MenuItem value="videos">Videos</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Botón para agregar archivos */}
                <Box textAlign="center" mt={2}>
                    <input
                        type="file"
                        id="file-input"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </Box>

                {/* Lista de archivos */}
                <Grid container spacing={2} mt={2}>
                    {filteredFiles.map((file) => (
                        <Grid item xs={12} sm={6} md={4} key={file.id}>
                            <Card>
                                {file.type.startsWith('image/') ? (
                                    <CardMedia
                                        component="img"
                                        alt={file.name}
                                        height="140"
                                        image={file.url}
                                        title={file.name}
                                    />
                                ) : (
                                    <CardMedia
                                        component="video"
                                        height="140"
                                        controls
                                        src={file.url}
                                        title={file.name}
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="subtitle1" color="textSecondary">{file.title || file.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{file.description}</Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => downloadFile(file)}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Descargar
                                    </Button>
                                </CardContent>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Toaster />
            </DashboardCard>
        </PageContainer>
    );
};
export default Municipalidad;
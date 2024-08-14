'use client';
import { Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Visitantes from '../components/visitantes/Visitantes';
import Translate from '../components/translate/Translate';

const Municipalidad = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <PageContainer title="InformacionGCanton" description="Una pagina con información general del cantón">
            <Box textAlign="left" mb={4}>
                <Visitantes></Visitantes>
            </Box>
            <DashboardCard title="Información general del cantón">
                <Box>
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h2" gutterBottom data-aos="fade-down">Bienvenido al Cantón</Typography>
                        <Typography variant="h6" color="text.secondary" data-aos="fade-down">Descubre la historia, geografía, cultura y clima de nuestro maravilloso cantón.</Typography>
                    </Box>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={12} data-aos="fade-up">
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="Historia del Cantón"
                                    height="300"
                                    image="https://www.periodicomensaje.com/images/2018/la-cruz-turismo-01.jpg"
                                    title="Historia del Cantón"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Historia
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Nuestro cantón tiene una rica historia que se remonta a tiempos ancestrales. Aquí podrás conocer los eventos más importantes que han marcado nuestro desarrollo.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12} data-aos="fade-up">
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="Geografía del Cantón"
                                    height="400"
                                    image="https://www.researchgate.net/publication/356003571/figure/fig1/AS:1088065573519362@1636426456751/Ubicacion-de-las-principales-comunidades-de-la-municipalidad-La-Cruz-Guanacaste-Costa.ppm"
                                    title="Geografía del Cantón"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Geografía
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Situado en una región privilegiada, nuestro cantón cuenta con una geografía diversa que incluye montañas, ríos y valles, ofreciendo paisajes espectaculares.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12} data-aos="fade-up">
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="Cultura del Cantón"
                                    height="540"
                                    image="https://upload.wikimedia.org/wikipedia/commons/9/90/Traje_T%C3%ADpico_Guanacasteco.jpg"
                                    title="Cultura del Cantón"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Cultura
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        La cultura de nuestro cantón es vibrante y diversa, reflejada en nuestras festividades, artes y tradiciones que se han mantenido vivas a lo largo de los años.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12} data-aos="fade-up">
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="Clima del Cantón"
                                    height="350"
                                    image="https://i.ytimg.com/vi/0RkSquvPafk/maxresdefault.jpg"
                                    title="Clima del Cantón"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Clima
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Con un clima templado durante todo el año, nuestro cantón es el lugar perfecto para disfrutar de actividades al aire libre y la belleza natural en cualquier estación.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </DashboardCard>
        </PageContainer>
    );
};

export default Municipalidad;

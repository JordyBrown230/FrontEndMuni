'use client';
import { Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Municipalidad = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <PageContainer title="Información Cantón La Cruz" description="Una página con información general del cantón de La Cruz en Guanacaste, Costa Rica.">
            <Box>
                <Box textAlign="center" mb={4}>
                    <Typography variant="h2" gutterBottom data-aos="fade-down">Bienvenido al Cantón de La Cruz</Typography>
                    <Typography variant="h6" color="text.secondary" data-aos="fade-down">
                        Explora la rica historia, geografía, cultura y clima de nuestro encantador cantón, una joya natural de Guanacaste.
                    </Typography>
                </Box>
                <Grid container spacing={4} justifyContent="center">
                    
                    {/* Sección Historia */}
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
                                    La Cruz tiene una historia que se remonta a los tiempos de los pueblos indígenas chorotegas y es un lugar significativo
                                    para el desarrollo de Guanacaste. Fundado en 1969, el cantón ha sido un punto estratégico, no solo por su cercanía a la frontera con Nicaragua,
                                    sino también por sus recursos naturales y cultura. En las décadas recientes, La Cruz ha florecido como un destino turístico
                                    gracias a su biodiversidad y atractivos naturales.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sección Geografía */}
                    <Grid item xs={12} md={12} data-aos="fade-up">
                        <Card>
                            <CardMedia
                                component="img"
                                alt="Geografía del Cantón"
                                height="400"
                                image="https://www.lacruzguanacaste.com/wp-content/uploads/2023/06/MapaLCruz-2-scaled.jpg"
                                title="Geografía del Cantón"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Geografía
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Ubicado en el extremo norte de Guanacaste, La Cruz cuenta con una geografía impresionante, incluyendo la costa
                                    del Golfo de Santa Elena y áreas protegidas como el Parque Nacional Santa Rosa. Sus paisajes combinan montañas, playas
                                    vírgenes y bosques secos tropicales. La geografía única de la región lo convierte en un lugar privilegiado
                                    para quienes buscan conectarse con la naturaleza.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sección Cultura */}
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
                                    La cultura en La Cruz es vibrante y tiene profundas raíces guanacastecas. Conocida por sus festividades tradicionales, como las fiestas cívicas
                                    y bailes típicos, la comunidad celebra la esencia de la "pampa Guanacasteca". La Cruz también es famosa por su gastronomía,
                                    destacándose los platillos tradicionales como las rosquillas y el vigorón, que reflejan la fusión cultural de la región.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sección Clima */}
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
                                    La Cruz goza de un clima tropical seco, con una estación seca que va de noviembre a abril y una estación lluviosa
                                    de mayo a octubre. La cercanía al Pacífico trae temperaturas cálidas, que en combinación con sus brisas costeras, 
                                    permiten disfrutar de una experiencia refrescante, especialmente en sus playas y zonas montañosas.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Municipalidad;

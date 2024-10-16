import axiosApi from './api.service';

export interface ServicioBasico {
    idServicioBasico: number;
    nombre: string;
    descripcion: string;
    telefono: string;
    direccion?: string;
    horario?: string;
    urlWaze?: string;
    urlGoogleMaps?: string;
    website?: string;
    foto?: string; 
}

export const getServiciosBasicos = async (): Promise<ServicioBasico[]> => {
    try {
        const response = await axiosApi.get<ServicioBasico[]>('/servicios-basicos');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching servicios básicos:', error);
        throw error;
    }
};

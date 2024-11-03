import axiosApi from './api.service';

export interface ServiciosSeguridad {
  idServicioSeguridad: number;
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

export const getServiciosSeguridad = async (): Promise<ServiciosSeguridad[]> => {
  try {
    const response = await axiosApi.get<ServiciosSeguridad[]>('/servicios-seguridad');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching servicios de seguridad:', error);
    throw error;
  }
};



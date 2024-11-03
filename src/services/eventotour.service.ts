import axiosApi from './api.service';

export interface FotoEventoTour {
  idFoto: number;
  foto: string;
}

export interface EventoTour {
  idEventoTour: number;
  tipo: string;
  nombre: string;
  descripcion?: string;
  fechaInicio: string;  // en formato ISO
  fechaFin?: string;
  horaInicio: string;
  horaFin?: string;
  ubicacion: string;
  precio?: number;
  urlWaze?: string;
  urlGoogleMaps?: string;
  website?: string;
  capacidadMaxima?: number;
  tipoActividad?: string;
  organizador?: string;
  requerimientosEspeciales?: string;
  duracionEstimada?: string;
  puntoEncuentro?: string;
  fotosEventoTour: FotoEventoTour[];
}

export const getEventosTours = async (): Promise<EventoTour[]> => {
  try {
    const response = await axiosApi.get<EventoTour[]>('/eventos-tours');
    return response.data;
  } catch (error) {
    console.error('Error fetching eventos/tours:', error);
    throw error;
  }
};

import axiosApi from './api.service';

export interface FotoEventoTour {
  idFoto: number;
  filename: string;
  url: string;
}

export interface EventoTour {
  idEventoTour: number;
  tipo: string;
  nombre: string;
  descripcion?: string;
  fechaInicio: string; // en formato ISO
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
    const response = await axiosApi.get<{ data: any[] }>('/eventos-tours/listar');
    return response.data.data.map((evento) => ({
      idEventoTour: evento.eventTourId,
      tipo: evento.type.trim(),
      nombre: evento.name.trim(),
      descripcion: evento.description?.trim(),
      fechaInicio: evento.startDate,
      fechaFin: evento.endDate,
      horaInicio: evento.startTime,
      horaFin: evento.endTime,
      ubicacion: evento.location.trim(),
      precio: evento.price,
      urlWaze: evento.wazeUrl,
      urlGoogleMaps: evento.googleMapsUrl,
      website: evento.website,
      capacidadMaxima: evento.maxCapacity,
      tipoActividad: evento.activityType?.trim(),
      organizador: evento.organizer?.trim(),
      requerimientosEspeciales: evento.specialRequirements?.trim(),
      duracionEstimada: evento.estimatedDuration?.trim(),
      puntoEncuentro: evento.meetingPoint?.trim(),
      fotosEventoTour: evento.Images.map((foto: any) => ({
        idFoto: foto.imageId,
        filename: foto.filename,
        url: foto.url,
      })),
    }));
  } catch (error) {
    console.error('Error fetching eventos/tours:', error);
    throw error;
  }
};

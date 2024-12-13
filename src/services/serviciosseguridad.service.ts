import axiosApi from './api.service';

export interface Foto {
  imageId: number;
  filename: string;
  url: string;
}

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
  fotosServicio: Foto[];
}

export const getServiciosSeguridad = async (): Promise<ServiciosSeguridad[]> => {
  try {
    const response = await axiosApi.get<{ data: any[] }>('/servicios-seguridad/listar');
    return response.data.data.map((servicio) => ({
      idServicioSeguridad: servicio.basicSecurityId,
      nombre: servicio.name.trim(),
      descripcion: servicio.description.trim(),
      telefono: servicio.phoneNumber,
      direccion: servicio.address?.trim(),
      horario: servicio.schedule?.trim(),
      urlWaze: servicio.wazeUrl,
      urlGoogleMaps: servicio.googleMapsUrl,
      website: servicio.website,
      fotosServicio: servicio.Images.map((foto: any) => ({
        imageId: foto.imageId,
        filename: foto.filename,
        url: foto.url,
      })),
    }));
  } catch (error) {
    console.error('Error fetching servicios de seguridad:', error);
    throw error;
  }
};


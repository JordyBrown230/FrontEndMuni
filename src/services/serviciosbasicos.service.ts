import axiosApi from './api.service';

export interface Foto {
    imageId: number;
    filename: string;
    url: string;
  }
// Interfaces definidas en español
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
  fotosServicio: Foto[];
}

// Función para mapear los datos del backend al formato esperado en el frontend
const mapBackendToFrontend = (data: any): ServicioBasico => ({
  idServicioBasico: data.basicServiceId, 
  nombre: data.name.trim(),
  descripcion: data.description.trim(),
  telefono: data.phoneNumber,
  direccion: data.address?.trim(),
  horario: data.schedule?.trim(),
  urlWaze: data.wazeUrl,
  urlGoogleMaps: data.googleMapsUrl,
  website: data.website,
  fotosServicio: data.Images.map((image: any) => ({
    imageId: image.imageId,
    filename: image.filename,
    url: image.url,
  })),});

// Función para obtener los servicios básicos con el mapeo de datos
export const getServiciosBasicos = async (): Promise<ServicioBasico[]> => {
  try {
    const response = await axiosApi.get<{ data: any[] }>('/servicios-basicos/listar');
    console.log('Datos del backend:', response.data);

    // Verifica si los datos están directamente en `response.data` en lugar de `response.data.data`
    const backendData = response.data.data;

    // Transformar los datos del backend al formato del frontend
    return backendData.map(mapBackendToFrontend);
  } catch (error) {
    console.error('Error fetching servicios básicos:', error);
    throw error;
  }
};

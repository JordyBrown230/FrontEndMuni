import axiosApi from './api.service';

// Interfaces definidas en español
export interface Foto {
  imageId: number;
  filename: string;
  url: string;
}

export interface Propietario {
  idPropietario: number;
  nombre: string;
  telefono: string;
  correo: string;
}

export interface Categoria {
  idCategoria: number;
  nombre: string;
}

export interface Establecimiento {
  idEstablecimiento: number;
  nombre: string;
  direccion: string;
  descripcion: string;
  telefono: string;
  urlWaze?: string;
  urlGoogleMaps?: string;
  website?: string;
  propietario: Propietario;
  categoria: Categoria;
  fotosEstablecimiento: Foto[];
}
// Función para mapear los datos del backend al formato esperado en el frontend
const mapBackendToFrontend = (data: any): Establecimiento => ({
  idEstablecimiento: data.establishmentId,
  nombre: data.name.trim(),
  direccion: data.address.trim(),
  descripcion: data.description.trim(),
  telefono: data.phoneNumber,
  urlWaze: data.wazeUrl,
  urlGoogleMaps: data.googleMapsUrl,
  website: data.website,
  propietario: {
    idPropietario: data.owner.ownerId,
    nombre: data.owner.name.trim(),
    telefono: data.owner.phoneNumber,
    correo: data.owner.email,
  },
  categoria: {
    idCategoria: data.category.categoryId,
    nombre: data.category.name.trim(),
  },
  fotosEstablecimiento: data.Images.map((image: any) => ({
    imageId: image.imageId,
    filename: image.filename,
    url: image.url,
  })),
});

// Función para obtener los establecimientos con el mapeo de datos
export const getEstablecimientos = async (): Promise<Establecimiento[]> => {
  try {
    const response = await axiosApi.get<{data:any[]}>('/establecimientos/listar'); // Cambiamos el tipo de respuesta
    console.log('Datos del backend:', response.data);

    // Transformar los datos del backend al formato del frontend
    return response.data.data.map(mapBackendToFrontend); // Mapeamos directamente sobre response.data
  } catch (error) {
    console.error('Error al obtener establecimientos:', error);
    throw error;
  }
};

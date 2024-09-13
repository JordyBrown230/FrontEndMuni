import axiosApi from './api.service';

// Definición de la interfaz para los datos de establecimiento
export interface Foto {
  idFoto: number;
  foto: string;
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
  propietario: Propietario;
  categoria: Categoria;
  fotosEstablecimiento: Foto[];
}

// Función para obtener todos los establecimientos
export const getEstablecimientos = async (): Promise<Establecimiento[]> => {
  try {
    const response = await axiosApi.get<Establecimiento[]>('/establecimientos');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching establecimientos:', error);
    throw error;
  }
};

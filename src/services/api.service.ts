import axios from "axios";

export const localServer='http://localhost:9000/';
export const localhost = 'http://localhost:9000/sit';
// export const hostedUrl = ''

const axiosApi = axios.create({   
  //baseURL: hostedUrl,
  baseURL: localhost,
});


export default axiosApi;
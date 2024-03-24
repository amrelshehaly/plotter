import axios, { AxiosResponse } from 'axios'
import { ColumnResponse } from '../types/colmuns'


const URL = import.meta.env.VITE_DOMAIN_URL

export const getColumnsApi = async () : Promise<AxiosResponse<ColumnResponse>> => {
    // try {
    return await axios.get<ColumnResponse>(`${URL}/columnss`)
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     throw error
    //   } else {
    //     throw new Error('different error than axios');
    //   }
    // }    
}
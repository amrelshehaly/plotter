import axios, { AxiosResponse } from 'axios'
import { ColumnResponse } from '../types/colmuns'


const URL = import.meta.env.VITE_DOMAIN_URL

export const getColumnsApi = async () : Promise<AxiosResponse<ColumnResponse>> => {
    return await axios.get<ColumnResponse>(`${URL}/columns`)
}
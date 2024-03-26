import axios, { AxiosResponse } from 'axios'
import { ColumnResponse, DataResponse, GetDataParams } from '../types/colmuns'


const URL = import.meta.env.VITE_DOMAIN_URL


export const getColumnsApi = async () : Promise<AxiosResponse<ColumnResponse>> => {
    return await axios.get<ColumnResponse>(`${URL}/columns`)
}

export const getDataApi = async ({ dimension, measures }: GetDataParams) : Promise<AxiosResponse<DataResponse>> => {
    return await axios.post<DataResponse>(`${URL}/data`, {
        dimension,
        measures
    },{
        headers:{
            'Content-Type' : 'application/json'
        }
    })
}
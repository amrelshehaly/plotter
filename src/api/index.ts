import axios, { AxiosError } from 'axios'

type ColumnsProps = {
    name: string
    function: string
}

type ColumnResponse = {
    columns : ColumnsProps[]
} 

const URL = import.meta.env.VITE_DOMAIN_URL

export const getColumns = async () : Promise<ColumnResponse> => {
    try {
        const response = await axios.get<ColumnResponse>(`${URL}/columns`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response);
            throw error
          } else {
            throw new Error('different error than axios');
          }
    }    
}
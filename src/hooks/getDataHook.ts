import { useEffect, useState } from 'react'
import { getDataApi } from '../api';
import { DataPlotTypes, GetDataParams } from '../types/colmuns';

const GetDataHook = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<DataPlotTypes[]>();
    const [ isError, setIsError ] = useState<boolean>(false)
    const [params, setParams] = useState<GetDataParams>()
  
    const handleGetData = async () => {
      try {
        if(!params) return
        setLoading(true);
        setError('');
        setIsError(false);
        const res = await getDataApi(params);
        if (res.status === 200) {
        setData(res.data.data);
        } 
      } catch (error) {
          setError("Error getting the Data");
          setIsError(true)
      } finally {
          setLoading(false);
      }
    };

    const handleClearError = () => {
        setError('')
        setIsError(false)
      }
  
    useEffect(() => {
        handleGetData();
    }, [params]);
  
    return {
      isLoading,
      error,
      data,
      setParams,
      clearError: handleClearError,
      isError
    };
}

export default GetDataHook
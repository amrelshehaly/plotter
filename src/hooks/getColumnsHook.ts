import { useEffect, useState } from "react";
import { getColumnsApi } from "../api";
import { ColumnsProps } from "../types/colmuns";

const GetColumnsHook = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [ isError, setIsError ] = useState<boolean>(false)
  const [columns, setColumns] = useState<ColumnsProps[]>();

  const handleGetColumns = async () => {
    try {
        setLoading(true);
        setError('');
        setIsError(false);
        const res = await getColumnsApi();
        if (res.status === 200) {
          setColumns(res.data.columns);
        } 
    } catch (error) {
        setError("Error getting the columns");
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
    handleGetColumns();
  }, []);

  return {
    isLoading,
    error,
    columns,
    clearError: handleClearError,
    isError
  };
};

export default GetColumnsHook;

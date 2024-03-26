import { useEffect, useMemo, useState } from "react";
import { getColumnsApi } from "../api";
import { ColumnsProps, FunctionEnum } from "../types/colmuns";

/**
 * 
 * @returns This custom hook is used to retrieve the columns from the {getColumnApi}, with other properties needed to handle
 *          data, error and loading.
 */

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

    /**
   * This method to exclusivly extract the dimension function from the response
   */
    const dimensionFunc = useMemo(() => {
      return columns?.filter((val) => val.function === FunctionEnum.DIMENSION ).map((val) => val.name)
    },[columns])

  useEffect(() => {
    handleGetColumns();
  }, []);

  return {
    isLoading,
    error,
    columns,
    clearError: handleClearError,
    isError,
    dimensionFunc
  };
};

export default GetColumnsHook;



import { useEffect, useState } from "react";
import { getColumnsApi } from "../api";
import { ColumnsProps } from "../types/colmuns";

const GetColumnsHook = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [columns, setColumns] = useState<ColumnsProps[]>();

  const handleGetColumns = async () => {
    try {
        setLoading(true);
        setError('')
        const res = await getColumnsApi();
        if (res.status === 200) {
          setColumns(res.data.columns);
        } 
    } catch (error) {
        setError("Error getting the columns");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    handleGetColumns();
  }, []);

  return {
    isLoading,
    error,
    columns
  };
};

export default GetColumnsHook;

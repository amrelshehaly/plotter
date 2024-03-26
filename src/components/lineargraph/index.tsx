import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useMemo } from 'react';
  import { Line } from 'react-chartjs-2';
import { DataPlotTypes } from '../../types/colmuns';
import './index.scss'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Plotter',
      },
    },
  };

  type LinearGraphProps = {
    qualitative: string[],
    quantitative: DataPlotTypes[]
  }

const LinearGraph = ({qualitative, quantitative}:LinearGraphProps) => {

    const data = useMemo(() => {
        return {
            labels: qualitative,
            datasets: quantitative.map((val) => ({
                label: val.name,
                data: val.values,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }))
        }
    },[qualitative, quantitative])

  return (
    <div className='canvas_container'>
      <Line options={options} data={data}  />
    </div>
  )
}

export default LinearGraph
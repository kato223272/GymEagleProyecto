import './grafica.css';
import {Button} from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';
import GraficaEscala from './GraficaEscala';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var valores=[10, 5, 20, 50];
var opciones=['Mensualidades', 'Pagos por día', 'No pagados'];

var mydata = {
    labels: opciones,
    datasets: [ 
        {
            label: 'valores',
            data: valores,
            tension: 0.5,
            fill : true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
        }
    ],
};

var myOptions = {
    scales : {
        y : {
            min : 0
        },
        x: {
            ticks: { color: 'rgb(255, 99, 132)'}
        }
    }
};

export default function Grafica(){
    const [date,setDate]=useState();
    
      return (
        <>
          <div className='containergraphic'>
            <div className='Calender'>
              <h3 className='indication'>Seleccione Día:</h3>
              <input className='inputCalender' type='date' onChange={(e) => setDate(e.target.value)} />
              <h3 className='indication'>Grafica del Día:</h3>
              <label className='lbDia'>{date}</label>
              <Button variant="dark" className='bt'>
                Perdidas
              </Button>
              <Button variant="dark" className='bt'>
                Ganancias
              </Button>
              <Button variant="dark" className='bt'>
                Decargar PDF
              </Button>
            </div>
            <div className='graphic'>
              <Line data={mydata} options={myOptions}/>
            </div>
          </div>
        </>
      );
    }

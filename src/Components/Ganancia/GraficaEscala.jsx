import './grafica.css';
import { Line } from 'react-chartjs-2';
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

function LinesChart() {
    return (
        <div className='graficaEscala'>
            <Line data={mydata} options={myOptions}/>
        </div>
    );
}

export default LinesChart;
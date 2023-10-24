import './grafica.css';
import {Button} from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';
import{
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    BarElement, Title, Tooltip, Legend, Filler} 
from 'chart.js';
import { useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var valores=[10, 5, 20, 50];
var opciones=['Inscripciones', 'Cancelaciones', 'Pagados', 'No pagados'];

const mydata={
    labels:opciones,
    datasets:[
        {
            label:'Valor',
            data:valores,
            backgroundColor:[
                'rgb(32, 145, 245)',
                'rgb(255, 51, 15)',
                'rgb(89, 254, 60)',
                'rgb(255, 164, 66)'
            ],
            boderColor:'rgb(27, 27, 27)',
            boderWidth: 1
        }
    ]
};

const myOptions={
    responsive:true,
    animation: true,
    plugins:{
        legend:{
            display:false
        }
    },
    scales:{
        y:{
            min: -5,
            max:50,
            ticks:{color:'black',font:{size: 15}}
        },
        x:{
            ticks:{color: 'black', font:{size: 20}}
        }
    }
};

export default function Grafica(){
    const [date,setDate]=useState();

    return <>
    <div className='containergraphic'>
    <div className='Calender'>
        <h3>Seleccione Día:</h3>
        <input className='inputCalender' type='date' onChange={e=>setDate(e.target.value)}/>
        <h3>Grafica del Día:</h3>
        <label className='lbDia'>{date}</label>
        <Button variant="dark" className='bt'>Perdidas</Button>
        <Button variant="dark" className='bt'>Ganancias</Button>
        <Button variant="dark" className='bt'>Decargar PDF</Button>
    </div>
        <div className='graphic'>
            <Bar data={mydata} options={myOptions}/>
        </div>
    </div>
    </>
}

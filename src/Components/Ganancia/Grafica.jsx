import './grafica.css';
import {Button} from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';
import GraficaEscala from './GraficaEscala';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {DateRangePicker} from 'rsuite';

// import 'rsuite/dist/styles/rsuite-default.css';
// import 'rsuite/dist/styles/rsuite.min.css'
// import 'rsuite/styles/less/index.less'; 
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

export default function Grafica(){
    const [selectedDate, setSelectedDate] = useState(null);
    const [asistenciasMes, setAsistenciasMes] = useState(0);
    const [asistenciasDia, setAsistenciasDia] = useState(0);


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
  
  let valores = [20, 7];
  let opciones = ['Mensualidades', 'Pagos por día'];
  
  let mydata = {
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
  
  let myOptions = {
      scales : {
          y : {
              min : 0
          },
          x: {
              ticks: { color: 'rgb(255, 99, 132)'}
          }
      }
  }

      return (
        <>
          <div className='containergraphic'>
            <div className='Calender'>
            <h3 className='indication'>Seleccione Mes:</h3>
            <DateRangePicker/>
            {/* <DemoItem label="Static variant" component="StaticDateRangePicker">
          <StaticDateRangePicker
            defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
            sx={{
              [`.${pickersLayoutClasses.contentWrapper}`]: {
                alignItems: 'center',
              },
            }}
          />
        </DemoItem> */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />

      
      <h3 className='indication'>Grafica del Mes:</h3>
      <label className='lbDia'>
        {selectedDate ? selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' }) : ''}
      </label>
              {/* <Button variant="dark" className='bt'>
                Perdidas
              </Button>
              <Button variant="dark" className='bt'>
                Ganancias
              </Button>
              <Button variant="dark" className='bt'>
                Decargar PDF
              </Button> */}
            </div>
            <div className='graphic'>
              <Line data={mydata} options={myOptions}/>
            </div>
          </div>
        </>
      );
}

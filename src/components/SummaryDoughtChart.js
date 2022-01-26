import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const config = {
  type: 'doughnut',
  events: [],
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
      offset: 4,
    },
  },
};

function SummaryDoughtChart(props) {
  return (
    <div>
      <p style={{fontSize: '8px', fontWeight: 'bold'}}>{props.title}</p>
      <Doughnut data={props.data} options={config} />
      <div style={{fontSize: '7px', fontWeight: '500', float: 'left'}}>
        <p>Department</p>
        <p>{props.department}</p>
      </div>

      <div style={{fontSize: '7px', fontWeight: '500', float: 'right'}}>
        <p>Overall</p>
        <p>{props.overall}</p>
      </div>
    </div>
  );
}

export default SummaryDoughtChart;

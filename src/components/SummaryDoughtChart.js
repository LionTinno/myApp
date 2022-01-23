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
    </div>
  );
}

export default SummaryDoughtChart;

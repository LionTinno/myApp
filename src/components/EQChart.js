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
    },
  },
};

function EQChart(props) {
  return (
    <div>
      <Doughnut data={props.data} options={config} />
    </div>
  );
}

export default EQChart;

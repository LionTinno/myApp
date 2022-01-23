import React from 'react';
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
import {Line} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'ELTV Line Chart',
    },
  },
  scales: {
    y: {
      suggestedMin: -200000,
      suggestedMax: 200000,
      grid: {
        color: line => (line.index === 4 ? 'red' : 'rgba(0, 0, 0, 0.1)'),
      },
    },
  },
};

function ELTVLineChart(props) {
  return (
    <div>
      <Line options={options} data={props.data} />
    </div>
  );
}

export default ELTVLineChart;

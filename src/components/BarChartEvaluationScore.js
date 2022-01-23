import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  indexAxis: 'y',
  scales: {
    x: {
      max: 100,
      grid: {
        offset: false,
      },
      beginAtZero: true,
    },
  },
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: false,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

function BarChartEvaluationScore(props) {
  return (
    <div>
      <Bar options={options} data={props.dataset} />
    </div>
  );
}

export default BarChartEvaluationScore;

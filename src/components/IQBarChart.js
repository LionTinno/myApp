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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend,
);

const options = {
  indexAxis: 'x',
  scales: {
    x: {
      // max: 200,
      grid: {
        display: false,
      },
      beginAtZero: true,
    },
    y: {
      ticks: {
        display: false,
      },
      beginAtZero: true,
      suggestedMin: 0,
      suggestedMax: 200,
      grid: {
        display: false,
        drawOnChartArea: false,
        drawBorder: false,
      },
    },
  },
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  events: [],
  plugins: {
    ChartDataLabels,
    legend: {
      display: false,
      position: 'right',
    },
    title: {
      display: false,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

function IQBarChart(props) {
  return (
    <div>
      <Bar options={options} data={props.data} />
    </div>
  );
}

export default IQBarChart;

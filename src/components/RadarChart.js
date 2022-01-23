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
  RadialLinearScale,
} from 'chart.js';
import {Radar} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        stepSize: 10,
        font: {
          size: 8,
        },
      },
      pointLabels: {
        font: {
          size: 8,
        },
      },
    },
    ticks: {
      beginAtZero: true,
      max: 0,
      min: 100,
      stepSize: 10,
    },
  },
};

function RadarChart(props) {
  return (
    <div style={{textAlign: 'center'}}>
      <p style={{fontSize: '10px', paddingLeft: '25px', fontWeight: 'bold'}}>
        {props.name} + Team Average
      </p>
      <Radar options={options} data={props.data} />
    </div>
  );
}

export default RadarChart;

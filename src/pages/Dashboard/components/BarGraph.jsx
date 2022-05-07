import React from 'react';
import { Bar } from 'react-chartjs-2';

import { lightBlue, orange } from '@mui/material/colors';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Tasks by Asignee',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'To dos',
      data: [2, 3, 4, 5, 6, 7, 8],
      backgroundColor: lightBlue[300],
    },
    {
      label: 'Completed',
      data: [5, 4, 2, 1, 7, 9, 6],
      backgroundColor: orange[300],
    },
  ],
};

const BarGraph = () => {
  return <Bar options={options} data={data} />;
};

export default BarGraph;

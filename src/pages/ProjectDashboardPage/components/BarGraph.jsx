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

const options = {
  responsive: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const BarGraph = ({ tasks, names }) => {
  let unique = [];
  for (let i in names) {
    unique.push(tasks.filter((curItem) => curItem.assigned.uid === names[i].uid));
  }

  let finalArray = [];
  for (let curr in unique) {
    finalArray.push(
      unique[curr].reduce(
        (acc, cur) =>
          cur.status === 'Done'
            ? { ...acc, totalDone: acc.totalDone + 1 }
            : { ...acc, totalNotDone: acc.totalNotDone + 1 },
        {
          name: unique[curr][0].assigned.name,
          uid: unique[curr][0].assigned.uid,
          totalDone: 0,
          totalNotDone: 0,
        },
      ),
    );
  }
  const labels = finalArray.map((cur) => cur.name);
  const data = {
    labels,
    datasets: [
      {
        label: 'To dos',
        data: finalArray.map((cur) => cur.totalNotDone),
        backgroundColor: lightBlue[300],
      },
      {
        label: 'Completed',
        data: finalArray.map((cur) => cur.totalDone),
        backgroundColor: orange[300],
      },
    ],
  };
  return <Bar options={options} data={data} style={{ width: '100%' }} />;
};

export default BarGraph;

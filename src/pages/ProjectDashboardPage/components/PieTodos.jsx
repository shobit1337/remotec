import React from 'react';
import { Pie } from 'react-chartjs-2';

import { lightBlue, orange } from '@mui/material/colors';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieTodos = ({ tasksTodos }) => {
  const data = {
    labels: ['Done', 'To be done'],
    datasets: [
      {
        data: [tasksTodos.done, tasksTodos.notDone],
        backgroundColor: [lightBlue[300], orange[300]],
      },
    ],
  };
  return <Pie data={data} />;
};

export default PieTodos;

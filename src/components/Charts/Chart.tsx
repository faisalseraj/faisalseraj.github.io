import {
  ArcElement,
  BarController,
  BarElement,
  Chart as ChartJS,
  Legend,
  Tooltip
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarController, BarElement, Tooltip, Legend);

const BarChart = () => {
  const data = {
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60, 50, 40, 30, 20, 10],
        backgroundColor: [
          '#FFC300', // January - vibrant yellow
          '#FF5733', // February - orange
          '#C70039', // March - deep red
          '#900C3F', // April - dark magenta
          '#581845', // May - deep purple
          '#2C3E50', // June - navy blue
          '#154360', // July - dark blue
          '#1E8449', // August - green
          '#196F3D', // September - dark green
          '#117A65', // October - teal
          '#1B4F72', // November - dark blue
          '#7D3C98' // December - purple
        ],
        hoverBackgroundColor: [
          '#FFC300', // January - vibrant yellow
          '#FF5733', // February - orange
          '#C70039', // March - deep red
          '#900C3F', // April - dark magenta
          '#581845', // May - deep purple
          '#2C3E50', // June - navy blue
          '#154360', // July - dark blue
          '#1E8449', // August - green
          '#196F3D', // September - dark green
          '#117A65', // October - teal
          '#1B4F72', // November - dark blue
          '#7D3C98' // December - purple
        ],
        hoverBorderColor: 'rgba(234, 236, 244, 1)'
      }
    ],
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  };

  return <Chart type="bar" data={data} />;
};

export default BarChart;

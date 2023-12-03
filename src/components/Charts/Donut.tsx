import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CategoryOptions } from '../new/NewTestDialog';

ChartJS.register(ArcElement, Tooltip, Legend);

const Donut = () => {
  const data = {
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60, 70, 80],
        backgroundColor: [
          '#8B0000', // HAEMOTOLOGY
          '#556B2F', // DLC
          '#191970', // BIO-CHEMISTRY
          '#E6E6FA', // SEROLOGY
          '#8B4513', // BRUCELLA TEST
          '#FFDB58', // WIDAL TEST
          '#FF7F50', // TYPHIDOT
          '#ADD8E6', // URINE COMPLETE
          '#A9A9A9' // MICROSCOPY
        ],
        hoverBackgroundColor: [
          '#8B0000', // HAEMOTOLOGY
          '#556B2F', // DLC
          '#191970', // BIO-CHEMISTRY
          '#E6E6FA', // SEROLOGY
          '#8B4513', // BRUCELLA TEST
          '#FFDB58', // WIDAL TEST
          '#FF7F50', // TYPHIDOT
          '#ADD8E6', // URINE COMPLETE
          '#A9A9A9' // MICROSCOPY
        ],
        hoverBorderColor: 'rgba(234, 236, 244, 1)'
      }
    ],
    labels: CategoryOptions
  };

  return <Doughnut data={data} />;
};

export default Donut;

import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const BasicPie = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'Series A' },
              { id: 1, value: 15, label: 'Series B' },
              { id: 2, value: 20, label: 'Series C' },
            ],
          },
        ]}
        width={400}
        height={300} // Adjusted height for better visibility
      />
    </div>
  );
};

export default BasicPie;

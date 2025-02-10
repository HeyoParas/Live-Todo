import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const BasicPie = ({ data }) => {
  console.log(data)
  if (!data || !data.categoryCount) {
    return <h1>Bhai data ni hai dikhane ko</h1>;
  }

  // Convert categoryCount object into an array for PieChart
  const pieData = Object.entries(data.categoryCount)
    .map(([label, value], index) => ({
      id: index,
      value,
      label,
    }))
    .filter(item => item.value > 0);

  return (
    <div className="justify-center items-center h-full">
      <PieChart
        series={[
          {
            data: pieData,
          },
        ]}
        width={400}
        height={300}
      />
      <div >
      hi
      </div>
    </div>
  );
};

export default BasicPie;

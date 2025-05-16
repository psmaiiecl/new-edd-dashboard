import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
const PointChart = ({ title, chartData, showLegend = true }) => {
  const options = {
    chart: {
      type: 'line',
      zoomType: 'xy',
      backgroundColor: null,
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontWeight: 'bold',
        color: '#5157FF',
        fontSize: '18px',
      },
    },
    xAxis: {
      type: "category",
     
      title: {
        text: "Fecha",
        style: {
          fontWeight: "bold",
          fontSize: "18px",
          color: "#666666",
        },
      },
    },
    
    yAxis: {
      title: { text: '' },
    },
    tooltip: {
    shared: true,
    valueDecimals: 0
  },
    plotOptions: {
      series: {
        color: "#FFA500",
        label: {
          connectorAllowed: false,
        },
      },
    },
    credits: { enabled: false },
    legend: {
      enabled: showLegend,
      verticalAlign: 'bottom',
      layout: 'horizontal',
      itemDistance: 1,
      itemStyle: {
        fontSize: '9px',
        fontWeight: 'bold',
      },
    },
    series: chartData.series ?? [],
    responsive: {
      rules: [
        {
          condition: { maxWidth: 500 },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
          },
        },
      ],
    },
  };

  return (
    <div className='general-point-chart-container'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};


export default PointChart;

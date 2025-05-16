import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BasicLegend } from "../BasicLegend";

const BarChart = ({
  subtitle = [],
  color = [],
  dataMapper = (data) => data,
  chartData,
  showLegend = true,
}) => {
  const [total, setTotal] = useState(0);
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (chartData) {
      const newData = dataMapper(chartData, color, subtitle);
      setTotal(chartData.total);
      setMappedData(newData);
    }
  }, [chartData, dataMapper, color, subtitle]);

  const options = {
    chart: {
      type: 'bar',
      backgroundColor: null,
      height: null,
      width: null,
    },
    title: {
      text: total?.data,
      align: 'center',
      style: {
        fontWeight: 'bold',
        color: '#5157FF',
        fontSize: '35px',
      },
    },
    subtitle: {
      text: total?.subtitulo || '',
      align: 'center',
      style: {
        fontWeight: 'bold',
        color: 'rgb(102, 102, 102)',
        fontSize: '14px',
      },
    },
    xAxis: {
      type: 'category',
      title: { text: null },
      labels: {
        style: { fontSize: '12px' },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Cantidad',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: '',
      pointFormat: '<b>{point.y}</b><br/>',
      style: {
        fontSize: '13px',
        color: '#666666',
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: <b>{point.y:,.0f}</b>',
          style: {
            fontSize: '12px',
            color: '#666666',
          },
        },
      },
    },
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
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Cantidad',
        data: mappedData.series || [],
        colorByPoint: true,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
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
    <div className="bar-chart-wrapper">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <hr />
      {mappedData.series && mappedData.series.length > 0 && (
        <BasicLegend data={mappedData.series} total={total.data} />
      )}
    </div>
  );
};

export default BarChart;

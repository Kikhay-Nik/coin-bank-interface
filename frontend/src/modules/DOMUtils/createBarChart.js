/* eslint-disable object-curly-newline */
import { Chart } from 'chart.js/auto';
import balanceDinamicByMonths from '../utils/balanceDinamicByMonths';

export default (canvas, account, monthsCount) => {
  const data = balanceDinamicByMonths(account, monthsCount);

  Chart.defaults.backgroundColor = '#116acc';
  Chart.defaults.borderColor = '#000';
  Chart.defaults.color = '#000';
  Chart.defaults.font.family = "'Work Sans', 'sans-serif'";
  Chart.defaults.font.size = 20;

  // Нарисовать границу вокруг графика
  const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };

  // eslint-disable-next-line no-unused-vars
  const balanceChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.map((row) => row.month),
      datasets: [
        {
          label: '',
          data: data.map((row) => row.balance),
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: 2,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
            drawBorder: false,
            drawTicks: false,
          },
          ticks: {
            padding: 8,
            font: {
              weight: 700,
            },
          },
        },
        y: {
          grid: {
            drawOnChartArea: false,
            drawBorder: false,
            drawTicks: false,
          },
          min: Math.round(Math.min(...data.map((obj) => obj.balance))),
          max: Math.round(Math.max(...data.map((obj) => obj.balance))),
          position: 'right',
          ticks: {
            padding: 20,
            font: {
              weight: 500,
            },
            stepSize: '0%',
          },
        },
      },
    },
    plugins: [chartAreaBorder],
  });
};

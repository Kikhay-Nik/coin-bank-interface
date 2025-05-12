/* eslint-disable object-curly-newline */
import { Chart } from 'chart.js/auto';

export default (canvas, data, labelCount) => {
  const dataLengths = data.datasets[0].data.length;

  Chart.defaults.backgroundColor = '#116acc';
  Chart.defaults.borderColor = '#000';
  Chart.defaults.color = '#000';
  Chart.defaults.font.family = "'Work Sans', 'sans-serif'";
  Chart.defaults.font.weight = 500;
  Chart.defaults.font.size = 20;
  Chart.defaults.scale.grid.drawOnChartArea = false;
  Chart.defaults.scale.grid.drawBorder = false;
  Chart.defaults.scale.grid.drawTicks = false;

  const onResize = () => {
    if (canvas.offsetWidth <= 600) {
      if (dataLengths < 5) {
        // eslint-disable-next-line operator-linebreak
        Chart.defaults.datasets.bar.categoryPercentage =
          dataLengths * 0.1 + 0.1;
      }
      if (dataLengths === 1) {
        Chart.defaults.datasets.bar.categoryPercentage = dataLengths * 0.1;
      }
    } else if (dataLengths < 5) {
      Chart.defaults.datasets.bar.categoryPercentage = dataLengths * 0.1 - 0.1;
    }
    if (dataLengths === 1) {
      Chart.defaults.datasets.bar.categoryPercentage = dataLengths * 0.1;
    }
  };

  // Бордер вокруг диаграммы
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

  let yMin;
  const maxVal = [];
  // Вычисление min,middle, max значений для шкалы Y
  for (let i = 0; i < data.datasets.length; i++) {
    const element = data.datasets[i];
    const max = Math.max(...element.data);
    maxVal.push(max);
  }

  const yMax = Math.floor(Math.max(...maxVal));

  let yMiddle = Math.floor(Math.min(...maxVal));
  if (yMiddle * 1.1 > yMax) {
    yMiddle *= 0.9;
  }

  if (data.datasets[0].data.length < labelCount) {
    yMin = 0;
  } else {
    yMin = Math.round(Math.min(...data.datasets[0].data));
  }

  // Настройка отображения шкалы для разных страниц
  const formatLabel = (ctx) => {
    ctx.ticks = [];
    if (labelCount > 6) {
      ctx.ticks.push({ value: yMin, label: `${yMin} ₽` });
      ctx.ticks.push({
        value: yMiddle,
        label: `${yMiddle} ₽`,
      });
      ctx.ticks.push({ value: yMax, label: `${yMax} ₽` });
    } else {
      ctx.ticks.push({ value: yMin, label: yMin });
      ctx.ticks.push({ value: yMax, label: yMax });
    }
  };
  // Ограничение кол-ва значений на шкале Y
  const tickLimit = data.datasets.length === 1 ? 2 : 3;

  const scaleConfig = {
    x: {
      ticks: {
        padding: 8,
        font: {
          weight: 700,
        },
      },
      stacked: true,
    },

    y: {
      beforeTickToLabelConversion: formatLabel,
      min: yMin,
      max: yMax,
      position: 'right',
      ticks: {
        padding: 20,
        maxTicksLimit: tickLimit,
      },
      stacked: true,
    },
  };

  // eslint-disable-next-line no-unused-vars
  const balanceChart = new Chart(canvas, {
    type: 'bar',
    data,
    options: {
      onResize,
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
      scales: scaleConfig,
    },
    plugins: [chartAreaBorder],
  });
};

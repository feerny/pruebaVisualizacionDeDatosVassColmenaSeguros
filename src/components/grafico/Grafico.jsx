import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js/auto';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Slider from '@mui/material/Slider';
import { setOption1, setOption2, setRangeValue } from '../../redux/actions';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
});

const SelectContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
  gap: '16px',
});

const RangeContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '16px',
  width: '80%',
});

const CustomSlider = styled(Slider)({
  width: '100%',
});

const monthLabels = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Grafico({ option1, option2, dataList, rangeValue, setOption1, setOption2, setRangeValue }) {
  const chartRef = useRef(null);

  useEffect(() => {
    let labels;
    let data;
    let backgroundColors;

    if (option2 === 'ventasPorRegion') {
      labels = ['Antioquia', 'BogotáDC', 'ValledelCauca', 'Atlántico', 'Santander'];
      data = [
        dataList.ventasPorRegion.Antioquia,
        dataList.ventasPorRegion.BogotáDC,
        dataList.ventasPorRegion.ValledelCauca,
        dataList.ventasPorRegion.Atlántico,
        dataList.ventasPorRegion.Santander,
      ];
      backgroundColors = labels.map(() => getRandomColor());
    } else if (option2 === 'usuariosRegistradosPorMes') {
      labels = monthLabels.slice(rangeValue[0], rangeValue[1] + 1);
      data = Object.values(dataList.usuariosRegistradosPorMes).slice(rangeValue[0], rangeValue[1] + 1);
      backgroundColors = labels.map(() => getRandomColor());
    } else if (option2 === 'ventasPorMes') {
      labels = monthLabels.slice(rangeValue[0], rangeValue[1] + 1);
      data = Object.values(dataList.ventasPorMes).slice(rangeValue[0], rangeValue[1] + 1);
      backgroundColors = labels.map(() => getRandomColor());
    }

    let chartInstance = null;
    const ctx = chartRef.current.getContext('2d');

    chartInstance = new Chart(ctx, {
      type: option1,
      data: {
        labels: labels,
        datasets: [
          {
            label: option1 === 'bar' || option1 === 'line' ? null : 'Ventas',
            data: data,
            backgroundColor: option1 === 'radar' ? null:backgroundColors,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: option1 !== 'bar' && option1 !== 'line',
          },
        },
      },
    });
    return () => {
      chartInstance.destroy();
    };
  }, [option1, option2, dataList, rangeValue]);

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
    setRangeValue([0, 11]);
  };

  const handleRangeChange = (newValue) => {
    setRangeValue(newValue);
  };

  return (
    <Container>
      <SelectContainer>
        <FormControl sx={{ maxWidth: 200, minWidth: 100 }}>
          <InputLabel id="option1-label">Tipo Gráfico</InputLabel>
          <Select labelId="option1-label" label="Tipo Gráfico" value={option1} onChange={handleOption1Change}>
            <MenuItem value="bar">Barra</MenuItem>
            <MenuItem value="line">Línea</MenuItem>
            <MenuItem value="radar">Radar</MenuItem>
            <MenuItem value="pie">Pastel</MenuItem>
            <MenuItem value="doughnut">Donut</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ maxWidth: 200, minWidth: 100 }}>
          <InputLabel id="option2-label">Datos</InputLabel>
          <Select labelId="option2-label" label="Datos" value={option2} onChange={handleOption2Change}>
            <MenuItem value="ventasPorRegion">Ventas por Región</MenuItem>
            <MenuItem value="usuariosRegistradosPorMes">Usuarios Registrados por Mes</MenuItem>
            <MenuItem value="ventasPorMes">Ventas por Mes</MenuItem>
          </Select>
        </FormControl>
      </SelectContainer>
      {option2 !== 'ventasPorRegion' && (
        <RangeContainer>
          <Typography variant="subtitle1">Rango de Meses:</Typography>
          <CustomSlider
            value={rangeValue}
            onChange={handleRangeChange}
            min={0}
            max={11}
            marks={monthLabels.map((month, index) => ({ value: index, label: month }))}
            track={false}
            getAriaLabel={(index) => (index === 0 ? 'Min' : 'Max')}
          />
        </RangeContainer>
      )}
      <canvas
        ref={chartRef}
        style={{ maxWidth: '500px', maxHeight: '400px', minHeight: '200px', minWidth: '200px' }}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    option1: state.option1,
    option2: state.option2,
    dataList: state.dataList,
    rangeValue: state.rangeValue,
  };
};

const mapDispatchToProps = {
  setOption1,
  setOption2,
  setRangeValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Grafico);

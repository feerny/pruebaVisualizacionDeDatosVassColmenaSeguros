import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import data from '../../data/datos.json';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Slider from '@mui/material/Slider';

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

function Grafico() {
  const [option1, setOption1] = useState('bar');
  const [option2, setOption2] = useState('ventasPorRegion');
  const dataList = JSON.parse(localStorage.getItem('data')) || data;
  const chartRef = useRef(null);
  const [rangeValue, setRangeValue] = useState([0, 11]);

  useEffect(() => {
    let labels;
    let data;

    if (option2 === 'ventasPorRegion') {
      labels = ['Antioquia', 'BogotáDC', 'ValledelCauca', 'Atlántico', 'Santander'];
      data = [
        dataList.ventasPorRegion.Antioquia,
        dataList.ventasPorRegion.BogotáDC,
        dataList.ventasPorRegion.ValledelCauca,
        dataList.ventasPorRegion.Atlántico,
        dataList.ventasPorRegion.Santander,
      ];
    } else if (option2 === 'usuariosRegistradosPorMes') {
      labels = monthLabels.slice(rangeValue[0], rangeValue[1] + 1);
      data = Object.values(dataList.usuariosRegistradosPorMes).slice(rangeValue[0], rangeValue[1] + 1);
    } else if (option2 === 'ventasPorMes') {
      labels = monthLabels.slice(rangeValue[0], rangeValue[1] + 1);
      data = Object.values(dataList.ventasPorMes).slice(rangeValue[0], rangeValue[1] + 1);
    }

    let chartInstance = null;
    const ctx = chartRef.current.getContext('2d');

    chartInstance = new Chart(ctx, {
      type: option1,
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ventas',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
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

  const handleRangeChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  return (
    <Container>
      <SelectContainer>
        <FormControl sx={{ maxWidth: 200, minWidth: 100 }}>
          <InputLabel id="option1-label">Tipo Gráfico</InputLabel>
          <Select
            labelId="option1-label"
            label="Tipo Gráfico"
            value={option1}
            onChange={handleOption1Change}
          >
            <MenuItem value="bar">Barra</MenuItem>
            <MenuItem value="line">Línea</MenuItem>
            <MenuItem value="radar">Radar</MenuItem>
            <MenuItem value="pie">Pastel</MenuItem>
            <MenuItem value="doughnut">Donut</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ maxWidth: 200, minWidth: 100 }}>
          <InputLabel id="option2-label">Datos</InputLabel>
          <Select
            labelId="option2-label"
            label="Datos"
            value={option2}
            onChange={handleOption2Change}
          >
            <MenuItem value="ventasPorRegion">Ventas por Región</MenuItem>
            <MenuItem value="usuariosRegistradosPorMes">Usuarios Registrados por Mes</MenuItem>
            <MenuItem value="ventasPorMes">Ventas por Mes</MenuItem>
          </Select>
        </FormControl>
      </SelectContainer>
      {option2 !== 'ventasPorRegion' && (
        <RangeContainer sx={{width:"80%"}}>
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

export default Grafico;

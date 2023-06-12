import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import data from '../../data/datos.json';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';

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

function Grafico() {
  const [option1, setOption1] = useState('bar');
  const [option2, setOption2] = useState('ventasPorRegion');
  const dataList = JSON.parse(localStorage.getItem('data')) || data;
  const chartRef = useRef(null);

  useEffect(() => {
    var labels;
    var data;
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
      labels = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ];
      data = [
        dataList.usuariosRegistradosPorMes.enero,
        dataList.usuariosRegistradosPorMes.febrero,
        dataList.usuariosRegistradosPorMes.marzo,
        dataList.usuariosRegistradosPorMes.abril,
        dataList.usuariosRegistradosPorMes.mayo,
        dataList.usuariosRegistradosPorMes.junio,
        dataList.usuariosRegistradosPorMes.julio,
        dataList.usuariosRegistradosPorMes.agosto,
        dataList.usuariosRegistradosPorMes.septiembre,
        dataList.usuariosRegistradosPorMes.octubre,
        dataList.usuariosRegistradosPorMes.noviembre,
        dataList.usuariosRegistradosPorMes.diciembre,
      ];
    } else if (option2 === 'ventasPorMes') {
      labels = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ];
      data = [
        dataList.ventasPorMes.enero,
        dataList.ventasPorMes.febrero,
        dataList.ventasPorMes.marzo,
        dataList.ventasPorMes.abril,
        dataList.ventasPorMes.mayo,
        dataList.ventasPorMes.junio,
        dataList.ventasPorMes.julio,
        dataList.ventasPorMes.agosto,
        dataList.ventasPorMes.septiembre,
        dataList.ventasPorMes.octubre,
        dataList.ventasPorMes.noviembre,
        dataList.ventasPorMes.diciembre,
      ];
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
  }, [option1, option2, dataList]);

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  return (
    <Container>
      <SelectContainer>
        <FormControl sx={{ maxWidth: 200, minWidth: 100 }}>
          <InputLabel id="option1-label">Tipo Grafico</InputLabel>
          <Select
            labelId="option1-label"
            label="Tipo Grafico"
            value={option1}
            onChange={handleOption1Change}
          >
            <MenuItem value="bar">bar</MenuItem>
            <MenuItem value="line">line</MenuItem>
            <MenuItem value="radar">radar</MenuItem>
            <MenuItem value="pie">pie</MenuItem>
            <MenuItem value="doughnut">doughnut</MenuItem>
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
            <MenuItem value="ventasPorRegion">ventas Por Region</MenuItem>
            <MenuItem value="usuariosRegistradosPorMes">usuarios Registrados Por Mes</MenuItem>
            <MenuItem value="ventasPorMes">ventas Por Mes</MenuItem>
          </Select>
        </FormControl>
      </SelectContainer>
      <canvas ref={chartRef} style={{ maxWidth: '500px', maxHeight: '400px', minHeight: '200px', minWidth: '200px' }} />
    </Container>
  );
}

export default Grafico;

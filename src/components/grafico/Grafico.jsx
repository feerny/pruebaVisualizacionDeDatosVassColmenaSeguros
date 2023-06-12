import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import data from '../../data/datos.json';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function Grafico() {
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const dataList = JSON.parse(localStorage.getItem("data")) || data;
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;
    const ctx = chartRef.current.getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }

    const filteredData = filterData(dataList, option1, option2);

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
          {
            label: 'Ventas',
            data: [12, 19, 3, 5, 2],
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
  }, [option1, option2]);

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  const filterData = (data, option1, option2) => {
    // Aplica la lógica de filtrado en base a las opciones seleccionadas
    let filteredData = [0, 0, 0, 0, 0];

    // Filtra los datos según las opciones seleccionadas
    // Aquí debes implementar tu lógica de filtrado en base a tus datos reales
    // Por ejemplo:
    if (option1 === 'opcion1') {
      filteredData = [1, 2, 3, 4, 5];
    } else if (option1 === 'opcion2') {
      filteredData = [5, 4, 3, 2, 1];
    }

    // Aplica más lógica de filtrado si es necesario
    // Por ejemplo:
    if (option2 === 'opcion3') {
      filteredData = filteredData.map((value) => value * 2);
    }

    return filteredData;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <FormControl sx={{ minWidth: 200, marginRight: '16px' }}>
        <InputLabel id="option1-label">Opción 1</InputLabel>
        <Select
          labelId="option1-label"
          value={option1}
          onChange={handleOption1Change}
        >
          <MenuItem value="">Seleccione una opción</MenuItem>
          <MenuItem value="opcion1">Opción 1</MenuItem>
          <MenuItem value="opcion2">Opción 2</MenuItem>
        </Select>
      </FormControl>
      <canvas ref={chartRef} style={{ maxWidth: '500px', maxHeight: '500px' }} />
      <FormControl sx={{ minWidth: 200, marginLeft: '16px' }}>
        <InputLabel id="option2-label">Opción 2</InputLabel>
        <Select
          labelId="option2-label"
          value={option2}
          onChange={handleOption2Change}
        >
          <MenuItem value="">Seleccione una opción</MenuItem>
          <MenuItem value="opcion3">Opción 3</MenuItem>
          <MenuItem value="opcion4">Opción 4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Grafico;

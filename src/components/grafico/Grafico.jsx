//importaciones
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js/auto';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Slider from '@mui/material/Slider';
import { setOption1, setOption2, setRangeValue } from '../../redux/actions';

//estilos para mis contenedores
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

//arreglo de meses para los labels del grafico
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

//funcion para obtener un color aleatorio
function getRandomColor() {
  //constante para almacenar los caracteres para generar el color hexadecimal
  const letters = '0123456789ABCDEF';
  //define que se trata de un color hexadecimal
  let color = '#';
  //genera un caracter aleatorio de la cadena letters y lo concatena a color
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  //retorna un color
  return color;
}

function Grafico({ option1, option2, dataList, rangeValue, setOption1, setOption2, setRangeValue }) {
  // referencia mutable para acceder al canvas
  const chartRef = useRef(null);

  //se ejecutara cada que sus dependencias cambien
  useEffect(() => {
    //inicializo
    let labels;
    let data;
    let backgroundColors;

    //envia la data segun el filtro elegido 
    if (option2 === 'ventasPorRegion') {
      labels = ['Antioquia', 'BogotáDC', 'ValledelCauca', 'Atlántico', 'Santander'];
      data = [
        dataList.ventasPorRegion.Antioquia,
        dataList.ventasPorRegion.BogotáDC,
        dataList.ventasPorRegion.ValledelCauca,
        dataList.ventasPorRegion.Atlántico,
        dataList.ventasPorRegion.Santander,
      ];
      //guarda un color para cada label
      backgroundColors = labels.map(() => getRandomColor());
    } else if (option2 === 'usuariosRegistradosPorMes') {
      //obtiene los meses sleccionados en el slice rangeValue[0](primer mes), rangeValue[1] + 1(ultimo mes)
      labels = monthLabels.slice(rangeValue[0], rangeValue[1] + 1);
      //obtiene los valores del objeto dataList.usuariosRegistradosPorMes y aolica la misma logica de arriba para obtener solo las posiciones necesarias
      data = Object.values(dataList.usuariosRegistradosPorMes).slice(rangeValue[0], rangeValue[1] + 1);
      backgroundColors = labels.map(() => getRandomColor());
    } else if (option2 === 'ventasPorMes') {
      //obtiene los meses sleccionados en el slice rangeValue[0](primer mes), rangeValue[1] + 1(ultimo mes)
      labels = monthLabels.slice(rangeValue[0], rangeValue[1] + 1);
      //obtiene los valores del objeto dataList.usuariosRegistradosPorMes y aolica la misma logica de arriba para obtener solo las posiciones necesarias
      data = Object.values(dataList.ventasPorMes).slice(rangeValue[0], rangeValue[1] + 1);
      backgroundColors = labels.map(() => getRandomColor());
    }

    //declaro la variable
    let chartInstance = null;
    //Se obtiene una referencia al contexto 2D del elemento canvas
    const ctx = chartRef.current.getContext('2d');

    //Se crea una nueva instancia del gráfico y Se pasa el contexto 2D
    chartInstance = new Chart(ctx, {
      //elige el tipo de grafico a mostrar segun el filtro
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
      //limpia y elimina el gráfico de la memoria cuando ya no sea necesario.
      chartInstance.destroy();
    };
  }, [option1, option2, dataList, rangeValue]);

  //funciones para actualizar el estado global redux cuando cambian las opciones del gráfico
  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
    //al cambiar de data a mostrar reinicia el slider
    setRangeValue([0, 11]);
  };

  //el newValue es lo mismo que event.target.value
  const handleRangeChange = (event,newValue) => {
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
      {/* si la data a mostrar es diferente a ventas por region muestra el slider de rango de fechas */}
      {option2 !== 'ventasPorRegion' && (
        <RangeContainer>
          <Typography variant="subtitle1">Rango de Meses:</Typography>
          <CustomSlider
            value={rangeValue}
            onChange={handleRangeChange}
            min={0}
            max={11}
            marks={monthLabels.map((month, index) => ({ value: index, label: month }))}
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

//recibe el estado completo de Redux 
const mapStateToProps = (state) => {
  return {
    option1: state.option1,
    option2: state.option2,
    dataList: state.dataList,
    rangeValue: state.rangeValue,
  };
};
//define las acciones que se desean conectar al componente
const mapDispatchToProps = {
  setOption1,
  setOption2,
  setRangeValue,
};
//conecta el componente Grafico con el almacenamiento Redux, lo que permite que acceda al estado y las acciones especificadas a través de sus props.
export default connect(mapStateToProps, mapDispatchToProps)(Grafico);

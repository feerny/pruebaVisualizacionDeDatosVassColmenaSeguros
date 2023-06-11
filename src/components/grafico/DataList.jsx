import React, { useState } from 'react';
import data from '../../data/datos.json';

function DataList() {
  const [option, setOption] = useState('');

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  let dataToShow = null;

  if (option === 'ventasPorMes') {
    dataToShow = data.ventasPorMes;
  } else if (option === 'usuariosRegistradosPorMes') {
    dataToShow = data.usuariosRegistradosPorMes;
  } else if (option === 'ventasPorRegion') {
    dataToShow = data.ventasPorRegion;
  }

  return (
    <div>
      <select value={option} onChange={handleOptionChange}>
        <option value="">Selecciona una opción</option>
        <option value="ventasPorMes">Ventas por mes</option>
        <option value="usuariosRegistradosPorMes">Usuarios registrados por mes</option>
        <option value="ventasPorRegion">Ventas por región</option>
      </select>

      {dataToShow && (
        <ul>
          {Object.entries(dataToShow).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DataList;

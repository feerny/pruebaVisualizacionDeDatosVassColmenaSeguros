//importaciones
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormControl, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { setDataList,setOptionData } from '../../redux/actions';
//creo mis contenedores y les doy estilos
const RootContainer = styled('div')({
  margin: '16px',
});

const SelectContainer = styled(FormControl)({
  margin: '16px 0',
  minWidth: 200,
});

function DataList({ dataList, setDataList, setOptionData,optionData }) {
  // inicializo el estado editableData como un objeto vacío.
  const [editableData, setEditableData] = useState({});
  //se inicializa como null. Esta variable se utilizará para almacenar los datos que se mostrarán según la opción seleccionada 
  let dataToShow = null;
  //se asigna el valor correspondiente a dataToShow según la opción seleccionada en optionData
  if (optionData === 'ventasPorMes') {
    dataToShow = dataList.ventasPorMes;
  } else if (optionData === 'usuariosRegistradosPorMes') {
    dataToShow = dataList.usuariosRegistradosPorMes;
  } else if (optionData === 'ventasPorRegion') {
    dataToShow = dataList.ventasPorRegion;
  }
  //funcion para manejar el cambio de opcion de data
  const handleOptionChange = (event) => {
    event.preventDefault();
    //envia el valor de la opcion seleccionada al action
    setOptionData(event.target.value);
  };

  const handleInputChange = (key, value) => {
    // Actualizar el valor en el estado mientras se edita
    setEditableData({[key]: value});
  };

  const handleEdit = (key) => {
    // Establecer el valor en el estado editableData solo cuando se hace clic en el botón de editar
    setEditableData({
      [key]: dataToShow[key]
    });
  };

  const handleSave = (key) => {
    const updatedValue = editableData[key];

    // Actualizar solo el valor necesario en el objeto de datos
    const updatedDataList = {
      ...dataList,
      [optionData]: {
        ...dataList[optionData],
        [key]: updatedValue,
      },
    };

    // Actualizar los datos en Redux
    setDataList(updatedDataList);

    // Restablecer el estado editableData a un objeto vacío
    setEditableData({});
  };

  return (
    <RootContainer>
      <Typography variant="h3" color="text.secondary" align="center">
        Data
      </Typography>
      <SelectContainer>
        <Select labelId="select-label" value={optionData} onChange={handleOptionChange}>
          <MenuItem value="ventasPorMes">Ventas por mes</MenuItem>
          <MenuItem value="usuariosRegistradosPorMes">Usuarios registrados por mes</MenuItem>
          <MenuItem value="ventasPorRegion">Ventas por región</MenuItem>
        </Select>
      </SelectContainer>

      {dataToShow && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(dataToShow).map(([key, value]) => {
                //determina si editableData tiene la propiedad key usando hasOwnProperty
                const isEditing = editableData.hasOwnProperty(key);

                return (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={editableData[key]}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                        />
                      ) : (
                        value
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <IconButton disabled={editableData[key]===""?true:false} onClick={() => handleSave(key)}>
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleEdit(key)}>
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </RootContainer>
  );
}
//toma el estado actual del Redux store como parámetro y devuelve un objeto que mapea las partes relevantes del estado a props
const mapStateToProps = (state) => {
  return {
    dataList: state.dataList,
    optionData:state.optionData
  };
};
//objeto que especifica qué acciones se deben vincular al componente
const mapDispatchToProps = {
  setDataList,
  setOptionData
};
//conecta el componente DataList con el Redux store
export default connect(mapStateToProps, mapDispatchToProps)(DataList);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormControl, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { setDataList,setOptionData } from '../../redux/actions';

const RootContainer = styled('div')({
  margin: '16px',
});

const SelectContainer = styled(FormControl)({
  margin: '16px 0',
  minWidth: 200,
});

function DataList({ dataList, setDataList, setOptionData, optionData }) {
  const [editableData, setEditableData] = useState(null);

  const handleOptionChange = (event) => {
    event.preventDefault();
    setOptionData(event.target.value);
  };

  const handleInputChange = (key, value) => {
    // Actualizar el valor en el estado mientras se edita
    setEditableData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleEdit = (key) => {
    // Establecer el valor en el estado editableData solo cuando se hace clic en el botón de editar
    setEditableData((prevState) => ({
      ...prevState,
      [key]: dataToShow[key],
    }));
  };

  const handleSave = (key) => {
    const updatedValue = editableData[key];

    // Actualizar el valor en el objeto de datos
    const updatedDataList = {
      ...dataList,
      [optionData]: {
        ...dataList[optionData],
        [key]: updatedValue,
      },
    };

    // Actualizar los datos en Redux
    setDataList(updatedDataList);

    // Restablecer el estado editableData a null
    setEditableData(null);
  };

  let dataToShow = null;

  if (optionData === 'ventasPorMes') {
    dataToShow = dataList.ventasPorMes;
  } else if (optionData === 'usuariosRegistradosPorMes') {
    dataToShow = dataList.usuariosRegistradosPorMes;
  } else if (optionData === 'ventasPorRegion') {
    dataToShow = dataList.ventasPorRegion;
  }

  return (
    <RootContainer>
      <Typography variant="h3" color="text.secondary" align="center">Lista datos</Typography>
      <SelectContainer>
        <Select
          labelId="select-label"
          value={optionData}
          onChange={handleOptionChange}
        >
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
              {Object.entries(dataToShow).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>
                    {editableData && editableData[key] ? (
                      <TextField
                        value={editableData[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    ) : (
                      value
                    )}
                  </TableCell>
                  <TableCell>
                    {editableData && editableData[key] ? (
                      <IconButton onClick={() => handleSave(key)}>
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEdit(key)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </RootContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    dataList: state.dataList,
    optionData:state.optionData,
  };
};

const mapDispatchToProps = {
  setDataList,
  setOptionData
};

export default connect(mapStateToProps, mapDispatchToProps)(DataList);

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'device_type', label: 'Device Type', minWidth: 170 },
  { id: 'device_name', label: 'Device Name', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 170 },
];


const DevicesTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [DeviceData, setDeviceData] = useState([]);

  useEffect(() => {
    // Fetch data from Laravel API
    axios.get('http://127.0.0.1:8000/api/medicaldevices/')
      .then(response => setDeviceData(response.data))
      .catch(error => console.error('Error fetching data from Laravel API', error));
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align="left" sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {DeviceData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                 {columns.map(column => (
                  <TableCell key={column.id} align="left">
                     {row[column.id]}
                  </TableCell>
                ))}
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={DeviceData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DevicesTable;


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
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'patient_name', label: 'Patient Name', minWidth: 170 },
  { id: 'doctor_name', label: 'Doctor Name', minWidth: 170 },
  { id: 'result', label: 'Result', minWidth: 170 },
  { id: 'date_conducted', label: 'Date Conducted', minWidth: 100 },
  { id: 'test_reports', label: 'View Test Reports', minWidth: 170 },
];
const columnsTest = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'test_name', label: 'Test Name', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 170 },
];

const TestReportTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [testReportData, setTestReportData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from Laravel API
    axios.get('http://127.0.0.1:8000/api/testreports/')
      .then(response => setTestReportData(response.data))
      .catch(error => console.error('Error fetching data from Laravel API', error));
  }, []);

  const handleOpenModal = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
    setIsModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const reportIndex = 1;

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
            {testReportData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(patient => (
              <TableRow hover role='checkbox' tabIndex={-1} key={patient.id}>
                {columns.map(column => (
                  <TableCell key={column.id} align="left">
                    {column.id === 'test_reports' ? (
                      <Button onClick={() => handleOpenModal(patient)}>
                        View Tests
                      </Button>
                    ) : (
                      patient[column.id]
                    )}
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
        count={testReportData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for Test Reports */}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Test Reports for {selectedPatient?.patient_name}
          </Typography>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columnsTest.map(column => (
                    <TableCell key={column.id} align="left" sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedPatient?.tests && selectedPatient.tests.length > 0 ? (
                  selectedPatient.tests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(test => (
                    <TableRow key={test.id} hover role='checkbox' tabIndex={-1}>
                      <TableCell>{reportIndex++}</TableCell>
                      <TableCell>{test.test_name}</TableCell>
                      <TableCell>{test.description}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No tests available</TableCell>
                  </TableRow>
                )}
              </TableBody>


            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Paper>
  );
};

export default TestReportTable;

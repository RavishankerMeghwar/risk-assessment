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
  { id: 'gender', label: 'Gender', minWidth: 100 },
  { id: 'date_of_birth', label: 'Birth Date', minWidth: 170 },
  { id: 'test_reports', label: 'View Test Reports', minWidth: 170 },
];
const columnsReports = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'result', label: 'Result', minWidth: 170 },
  { id: 'date_conducted', label: 'Date Conducted', minWidth: 100 },
  { id: 'tests', label: 'View Tests', minWidth: 170 },
];
const columnsTests = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'test_name', label: 'Test Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 170 },
  // Add more columns for test details as needed
];

const TestsModal = ({ tests, isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="tests-modal-title"
      aria-describedby="tests-modal-description"
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
        <Typography id="tests-modal-title" variant="h6" component="h2">
          Tests for selected report
        </Typography>
        {tests && tests.length > 0 ? (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columnsTests.map(column => (
                    <TableCell key={column.id} align="left" sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tests.map(test => (
                  <TableRow key={test.id} hover role='checkbox' tabIndex={-1}>
                    <TableCell>{test.id}</TableCell>
                    <TableCell>{test.test_name}</TableCell>
                    <TableCell>{test.description}</TableCell>
                    {/* Add more columns for test details as needed */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography id="tests-modal-description" variant="body1">
            Tests are not available for the selected report.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};



const PatientsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [patientData, setPatientData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);
  // const [isTestModalOpen, setIsTestModalOpen] = useState(false);
   const [isTestsModalOpen, setIsTestsModalOpen] = useState(false);
  console.log(isTestsModalOpen)
  const handleOpenTestsModal = (tests) => {
    setSelectedTests(tests);
    setIsTestsModalOpen(true);
  };

  const handleCloseTestsModal = () => {
    setIsTestsModalOpen(false);
    setSelectedTests(null);
  };
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Fetch data from Laravel API
    axios.get(`${apiUrl}/patients/`)
      .then(response => setPatientData(response.data))
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
            {patientData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(patient => (
              <TableRow hover role='checkbox' tabIndex={-1} key={patient.id}>
                {columns.map(column => (
                  <TableCell key={column.id} align="left">
                    {column.id === 'test_reports' ? (
                      <Button onClick={() => handleOpenModal(patient)}>
                        View Test Reports
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
        count={patientData.length}
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
                  {columnsReports.map(column => (
                    <TableCell key={column.id} align="left" sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                
                {selectedPatient?.test_reports && selectedPatient.test_reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(report => (
                  <TableRow key={report.id} hover role='checkbox' tabIndex={-1}>
                    <TableCell>{reportIndex++}</TableCell>
                    <TableCell>{report.result}</TableCell>
                    <TableCell>{report.date_conducted}</TableCell>
                    <TableCell>
                    <Button onClick={() => handleOpenTestsModal(report.tests)}>
                        View Tests
                      </Button>
                    </TableCell>
                    
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
      
       {/* Modal for Tests */}
       <TestsModal tests={selectedTests} isOpen={isTestsModalOpen} onClose={handleCloseTestsModal} />
    </Paper>
  );
};

export default PatientsTable;

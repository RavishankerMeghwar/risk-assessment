// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MUITable = () => {
  const [insuranceData, setInsuranceData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://127.0.0.1:8000/api/insurance')
      .then(response => setInsuranceData(response.data.insurances))
      .catch(error => console.error('Error fetching data', error));
  }, []);
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
            Doctors
        </Typography>
        {/* <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography> */}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Doctors' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable

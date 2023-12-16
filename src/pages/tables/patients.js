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
import PatientsTable from 'src/views/tables/PatientsTable'

const MUITable = () => {

  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
            Patients
        </Typography>
        {/* <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography> */}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Patients' titleTypographyProps={{ variant: 'h6' }} />
          <PatientsTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable

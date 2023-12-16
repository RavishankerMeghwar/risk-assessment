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
import TestReportTable from 'src/views/tables/TestReportTable'

const MUITable = () => {

  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
            Test and Report Result
        </Typography>
        {/* <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography> */}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Test and Report Result' titleTypographyProps={{ variant: 'h6' }} />
          <TestReportTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable

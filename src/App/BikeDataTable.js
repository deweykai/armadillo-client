import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const BikeDataTable = ({ bikeData }) => {
  const tableContents = bikeData
    .map(data => ({
      ...data,
      created_at: new Date(data.created_at).toLocaleString()
    }))
    .map(createTableRow);

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Created At</TableCell>
            <TableCell align='right'>Voltage</TableCell>
            <TableCell align='right'>Current</TableCell>
            <TableCell align='right'>RPM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableContents}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const createTableRow = data => (
  <TableRow key={data.created_at}>
    <TableCell component="th" scope="row">{data.created_at}</TableCell>
    <TableCell align="right">{data.voltage}</TableCell>
    <TableCell align="right">{data.current}</TableCell>
    <TableCell align="right">{data.rpm}</TableCell>
  </TableRow>
);

export default BikeDataTable;

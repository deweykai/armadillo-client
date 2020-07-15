import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';

const BikeDataTable = ({ bikeData }) => {
    const tableContents = bikeData.map(createTableRow);

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
      <TableCell align="right">{data.created_at}</TableCell>
      <TableCell align="right">{data.voltage}</TableCell>
      <TableCell align="right">{data.current}</TableCell>
      <TableCell align="right">{data.rpm}</TableCell>
    </TableRow>
);

const BikeDashboard = () => {
    let { bike_id } = useParams();
    let [bikeData, setBikeData] = useState(null);

    useEffect(() => {
        fetch(`/api/data/bike/${bike_id}`)
            .then(res => res.json())
            .then(raw_data => raw_data.map(data => ({
                ...data,
                created_at: new Date(data.created_at.secs_since_epoch * 1000).toLocaleString(),
            })))
            .then(data => setBikeData(data));
    }, [bike_id]);

    if (bikeData == null) {
        return "Waiting for data";
    }

    return (
        <BikeDataTable bikeData={bikeData}/>
    );
};

export default BikeDashboard;

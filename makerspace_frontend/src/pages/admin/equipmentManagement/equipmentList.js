import * as React from 'react';
import PropTypes from 'prop-types';

import EquipmentInfoBox from './equipmentInfoBox'

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Chip from '@mui/material/Chip';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <Icon>arrow_forward</Icon> : <Icon>arrow_back</Icon>}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <Icon>arrow_back</Icon> : <Icon>arrow_forward</Icon>}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

function createData(serviceId, serviceName, description, status, category) {
  return { serviceId, serviceName, description, status, category };
}

const rows = [
  createData(1, 'Cupcake', 305, 1, 1),
  createData(2, 'Donut', 452, 1, 2),
  createData(3, 'Eclair', 262, 1, 3),
  createData(4, 'Frozen yoghurt', 159, 1, 4),
  createData(5, 'Gingerbread', 356, 0, 5),
  // createData('Honeycomb', 408, 3.2),
  // createData('Ice cream sandwich', 237, 9.0),
  // createData('Jelly Bean', 375, 0.0),
  // createData('KitKat', 518, 26.0),
  // createData('Lollipop', 392, 0.2),
  // createData('Marshmallow', 318, 0),
  // createData('Nougat', 360, 19.0),
  // createData('Oreo1', 437, 18.0),
  // createData('Oreo2', 437, 18.0),
  // createData('Oreo3', 437, 18.0),
  // createData('Oreo4', 437, 18.0),
  // createData('Oreo5', 437, 18.0),
  // createData('Oreo6', 437, 18.0),
  // createData('Oreo7', 437, 18.0),
  // createData('Oreo8', 437, 18.0),
  // createData('Oreo9', 437, 18.0),
  // createData('Oreo0', 437, 18.0),
  // createData('Oreo11', 437, 18.0),
  // createData('Oreo12', 437, 18.0),
  // createData('Oreo13', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const CustomPaginationActionsTable = React.forwardRef((props, ref) => {

  React.useImperativeHandle(ref, () => ({
    add() {
      console.log('--- show add box ---')
      editEquipment({ description: '', serviceId: '', serviceName: '', status: '', serviceType: 1 })
    }
  }));

  React.useEffect(() => {
    queryList()
  }, [])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [list,setList] = React.useState([])
  const [category] = React.useState([
    { label: 'Drones', value: 1, },
    { label: 'Virtual Reality', value: 2, },
    { label: 'Audio & Video', value: 3, },
    { label: 'Digital Art', value: 4, },
    { label: 'Computing', value: 5, },
    { label: 'Sustainability', value: 6, },
  ]);
  const equipmentInfoBoxRef = React.useRef();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log('handleChangePage')
  };

  const editEquipment = (info) => {
    console.log('editEquipment');
    equipmentInfoBoxRef.current.show(JSON.parse(JSON.stringify(info)))
  };

  const queryList = async () => {
    let res = await React.$req.post(React.$api.serviceAllByType,{type:1});
    if (res.success) {
      console.log(res);
      setList(res.data.data)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" size='small'>
        <TableBody>
          {(rowsPerPage > 0
            ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : list
          ).map((row) => (
            <TableRow key={row.serviceId}>
              <TableCell style={{ width: 160 }}>
                {row.serviceName}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.active == 1 ? <Chip label="active" color="success" variant="outlined" /> : <Chip label="inactive" color="warning" variant="outlined" />}
              </TableCell>
              <TableCell style={{ width: 50 }} align="right">
                <IconButton aria-label="edit" size='small' onClick={() => editEquipment(row)}>
                  <Icon>edit</Icon>
                </IconButton>
              </TableCell>
              <TableCell style={{ width: 50 }} align="right">
                <IconButton aria-label="delete" size='small'>
                  <Icon>delete</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10]}
              colSpan={3}
              count={list.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      {/*  */}
      <EquipmentInfoBox ref={equipmentInfoBoxRef} category={category} />
    </TableContainer>
  );
})

export default CustomPaginationActionsTable;
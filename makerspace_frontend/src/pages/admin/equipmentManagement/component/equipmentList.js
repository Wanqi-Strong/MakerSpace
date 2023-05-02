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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import CustomAlert from './../../../../components/alter/alter'

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

const CustomPaginationActionsTable = React.forwardRef((props, ref) => {

  React.useImperativeHandle(ref, () => ({
    add() {
      console.log('--- show add box ---')
      editEquipment({ description: '', serviceId: '', serviceName: '', status: 1, serviceType: 1, category: 2, active: 1, picture: null })
    }
  }));

  React.useEffect(() => {
    queryList()
    console.log('queryList')
  }, [])

  const alter = React.useRef();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [list, setList] = React.useState([])
  const [category] = React.useState([
    { label: 'Drones', value: 1, },
    { label: 'Virtual Reality', value: 2, },
    { label: 'Audio & Video', value: 3, },
    { label: 'Digital Art', value: 4, },
    { label: 'Computing', value: 5, },
    { label: 'Sustainability', value: 6, },
  ]);
  const equipmentInfoBoxRef = React.useRef();
  const DeleteBoxRef = React.useRef();

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
    let res = await React.$req.post(React.$api.serviceAllByType, { type: 1 });
    if (res.success) {
      setList(res.data.data)
    } else {
      showError(res.message);
    }
  }

  const showError = (res) => {
    alter.current.showAlert(res.message);
  }

  const showDeleteBox = (row) => {
    DeleteBoxRef.current.show(row);
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
                <IconButton aria-label="delete" size='small' onClick={() => showDeleteBox(row)}>
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
      <EquipmentInfoBox ref={equipmentInfoBoxRef} category={category} refreshList={queryList} />
      <DeleteBox ref={DeleteBoxRef} refreshList={queryList} showError={showError} />
      <CustomAlert ref={alter} severity={'error'} alertTitle={'error'}></CustomAlert>
    </TableContainer>
  );
})

const DeleteBox = React.forwardRef((props, ref) => {

  React.useImperativeHandle(ref, () => ({
    show,
  }))

  const [open, setOpen] = React.useState(false);
  const [equipmentInfo, setEquipmentInfo] = React.useState({});

  const show = (info) => {
    setOpen(true);
    setEquipmentInfo({ ...info })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = async () => {
    let form = {
      facility: equipmentInfo,
      userId: React.$utils.getSessionStorage('userInfo').userId
    };
    let res = await React.$req.post(React.$api.serviceDelete, form);
    if (res.success) {
      handleClose();
      props.refreshList();
    } else {
      handleClose();
      props.showError(res);
    }
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
    >
      <DialogContent>
        <DialogContentText>
          Please confirm deletion of {equipmentInfo.serviceName}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={confirmDelete}>Confirm</Button>
      </DialogActions>
    </Dialog>
  )

})

export default CustomPaginationActionsTable;
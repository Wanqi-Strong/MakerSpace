import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const  EquipmentInfoBox = React.forwardRef((props,ref)=> {
  const [open, setOpen] = React.useState(false);
  const [nameInput, setNameInput] = React.useState(null);
  const[equipmentInfo, setEquipmentInfo] = React.useState({});

  React.useImperativeHandle(ref, () => ({

    show(info) {
        console.log('--- show ---')
        console.log(info)
        setEquipmentInfo(info);
        handleClickOpen();
    }

  }));
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit Equipment"}
        </DialogTitle>
        <DialogContent>
        <TextField id="name" label="username" variant="outlined" required size="small"
                            inputRef={(input) => {setNameInput( input) }} 
                            value={equipmentInfo.name} />
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
export default EquipmentInfoBox;
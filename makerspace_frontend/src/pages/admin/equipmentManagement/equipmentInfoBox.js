import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const EquipmentInfoBox = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [equipmentInfo, setEquipmentInfo] = React.useState({ description: '', serviceId: '', serviceName: '', status: '', serviceType: '' });
  const [category] = React.useState(props.category)

  React.useImperativeHandle(ref, () => ({
    show(info) {
      console.log('--- show edit box ---')
      console.log(info)
      setEquipmentInfo({ ...info });
      handleClickOpen();
    }
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const save = async () => {
    console.log('updated equipmentInfo')
    console.log(equipmentInfo)
    let form = {
      facility: equipmentInfo,
      userId: React.$utils.getSessionStorage('userInfo').userId
    };
    const api = !form.facility.serviceId ? React.$api.serviceAdd : React.$api.serviceUpdate;
    let res = await React.$req.post(api, form);
    console.log(res);
    if (res.success) {
      setOpen(false);
    }
  };

  const bindForm = (e, key) => {
    let form = equipmentInfo;
    form[key] = e.target.value;
    setEquipmentInfo({ ...form });
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!equipmentInfo.serviceId ? "Add Equipment" : "Edit Equipment"}
        </DialogTitle>
        <DialogContent>
          <div className='formBox'>
            <div className='flex flex_center_ver flex_space-between'>
              <div className='inputBox'>
                <TextField id="equipmentName" label="equipmentName" size="small" variant="standard"
                  value={equipmentInfo.serviceName} onChange={(event) => { bindForm(event, 'serviceName') }} />
              </div>
              <div>
                <FormLabel size="small">status</FormLabel>
                <RadioGroup row name="status" size="small" value={equipmentInfo.status} onChange={(event) => { bindForm(event, 'status') }}>
                  <FormControlLabel value="1" control={<Radio />} label="active" />
                  <FormControlLabel value="0" control={<Radio />} label="inactive" />
                </RadioGroup>
              </div>
            </div>
            <div className='inputBox'>
              <InputLabel>category</InputLabel>
              <Select
                id="category"
                value={equipmentInfo.serviceType}
                label="category"
                size="small"
                onChange={(event) => { bindForm(event, 'serviceType') }}
              >
                {category.map((item) =>
                  <MenuItem key={item.value}
                    value={item.value}>{item.label}</MenuItem>
                )}
              </Select>
            </div>
            <div className='inputBox'>
              <FormControl fullWidth variant="standard">
                <TextField id="description" label="description" size="small" variant="standard" multiline maxRows={4}
                  value={equipmentInfo.description} onChange={(event) => { bindForm(event, 'description') }} />
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={save} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
export default EquipmentInfoBox;
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
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

const EquipmentInfoBox = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [equipmentInfo, setEquipmentInfo] = React.useState({ description: '', serviceId: '', serviceName: '', status: 1, serviceType: 1, category: 2, active: 1, picture: null });
  const [category] = React.useState(props.category)
  const [picture, setPicture] = React.useState("");
  const [isAdd, setIsAdd] = React.useState(false);
  const { refreshList } = props;

  React.useImperativeHandle(ref, () => ({
    show(info) {
      initData(info)
    }
  }));

  const initData = (info) => {
    console.log('--- show edit box ---')
    console.log(info)
    if (info.picture != null) {
      setIsAdd(false)
      let url = "data:image/png;base64," + info.picture;
      setPicture(url)
    } else {
      setIsAdd(true)
      setPicture("")
    }
    setEquipmentInfo({ ...info });
    handleClickOpen();
  }

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
      userId: React.$utils.getSessionStorage('userInfo').userId,
      picture: picture
    };
    let param = new FormData();
    let equipment = JSON.stringify(equipmentInfo);
    param.append('userId', form.userId)
    param.append('picture', picture)
    param.append('facility', new Blob([equipment], { type: "application/json" }))
    console.log(param);
    const api = !form.facility.serviceId ? React.$api.serviceAdd : React.$api.serviceUpdate;
    let res = await React.$req.post(api, param, "multipart/form-data");
    console.log(res);
    if (res.success) {
      setOpen(false);
      refreshList();
    }
  };

  const bindForm = (e, key) => {
    let form = equipmentInfo;
    form[key] = e.target.value;
    setEquipmentInfo({ ...form });
  }

  const uploadPic = (e) => {
    if (e != null) {
      setPicture(e.target.files[0]);
      setIsAdd(true);
    } else {
      setPicture("")
      setIsAdd(true);
    }
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
                <FormLabel size="small">active</FormLabel>
                <RadioGroup row name="active" size="small" value={equipmentInfo.active} onChange={(event) => { bindForm(event, 'active') }}>
                  <FormControlLabel value="1" control={<Radio />} label="active" />
                  <FormControlLabel value="0" control={<Radio />} label="inactive" />
                </RadioGroup>
              </div>
            </div>
            <div className='inputBox'>
              <InputLabel>category</InputLabel>
              <Select
                id="category"
                value={equipmentInfo.category}
                label="category"
                size="small"
                onChange={(event) => { bindForm(event, 'category') }}
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
            <div className='inputBox'>
              <InputLabel>picture</InputLabel>
              {picture && (
                <div>
                  <img
                    alt="not found"
                    width={"200px"}
                    height={"150px"}
                    src={isAdd ? URL.createObjectURL(picture) : picture}
                  />
                  <IconButton aria-label="delete" size='small' onClick={() => { uploadPic(null) }}>
                    <Icon>delete</Icon>
                  </IconButton>
                </div>
              )}
              <IconButton aria-label="upload" size='small' component="label">
                <Icon>photo_camera</Icon>
                <input hidden accept="image/*" multiple type="file" onChange={(event) => { uploadPic(event) }} />
              </IconButton>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size="small" variant="outlined">Cancel</Button>
          <Button onClick={save} autoFocus size="small" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
export default EquipmentInfoBox;
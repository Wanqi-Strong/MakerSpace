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

  const defaultPic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAA0jSURBVHhe7d2NceI6A4bRr8HbCqXQCI2kEPrgs4BkCcg/ei0cQs6Z0czd3Qs4wtZjTBL+dwKAgIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiD8LcfDab/77/Tff8PY7U8fx+vfA80EhL9jiMeuhOPbGCJy/WegjYDwZxwPu7t4XMZeQSAiIPwdH3sBgY4EhD/k47R/CMgrXsI6no4fH96f4eUJCH/L8eN02O9Ou90whpce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Jf+MpQtO2fZhW2+2/We3u+58Df5uO8scl3lft6nHYQG9fe6u93n91+Uq83h+L+H6z7/CdS7K+z83X8f+0GOeWUNA2NjzzliBbQkIGxMQeBcCwsYEBN6FgLAxAYF3ISBsTEDgXQgIGxMQeBcCwsYEBN6FgLAxAYF3ISBsTEDgXQgIGxMQeBcCwsYEBN6FgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAAROp/8DMUp1ZMdA+98AAAAASUVORK5CYII=";

  React.useImperativeHandle(ref, () => ({
    show(info) {
      initData(info)
    }
  }));

  const initData = (info) => {
    console.log('--- show edit box ---')
    console.log(info)
    // current equipment has picture, translate it into base64
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

  const resetData = () => {
    setIsAdd(false);
    setPicture("");
    setEquipmentInfo({ description: '', serviceId: '', serviceName: '', status: 1, serviceType: 1, category: 2, active: 1, picture: null });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  // use form-data to send both json and file
  const save = async () => {
    console.log('updated equipmentInfo')
    let param = new FormData();
    let equipment = JSON.stringify(equipmentInfo);
    param.append('userId', React.$utils.getSessionStorage('userInfo').userId,)
    let image = picture;
    // set default pictue
    if (image === "") {
      image = defaultPic;
    }
    // handle old picture
    if (typeof (image) === "string") {
      let array = image.split(",");
      const type = array[0].split(";")[0].split(":")[1];
      image = b64toBlob(array[1], type);
    }
    param.append('picture', image)
    param.append('facility', new Blob([equipment], { type: "application/json" }))
    const api = !equipmentInfo.serviceId ? React.$api.serviceAdd : React.$api.serviceUpdate;
    let res = await React.$req.post(api, param, "multipart/form-data");
    console.log(res);
    if (res.success) {
      resetData();
      setOpen(false);
      refreshList();
    }
  }

  const bindForm = (e, key) => {
    let form = equipmentInfo;
    form[key] = e.target.value;
    setEquipmentInfo({ ...form });
  }

  const uploadPic = (e) => {
    if (e != null) {
      setPicture(e.target.files[0]);
    } else {
      setPicture("")
    }
    setIsAdd(true);
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
                <TextField id="description" label="description" size="small" variant="standard" multiline maxRows={3}
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
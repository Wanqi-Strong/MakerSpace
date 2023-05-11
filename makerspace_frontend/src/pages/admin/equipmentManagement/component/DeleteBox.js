import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

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
export default DeleteBox;
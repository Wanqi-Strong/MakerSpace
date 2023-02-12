import {useState,forwardRef,useImperativeHandle} from "react"

import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const  CustomAlert = forwardRef((props, ref)=> {
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState("");

    useImperativeHandle(ref, () => ({
        showAlert,
    }))

    const showAlert = (info) =>{
        setInfo(info);
        switchShow();
    }  
    const switchShow = () => {
        setShow(!show);
    };
  
    return (
      <div>
        <Dialog open={show} onClose={switchShow}>
          <Alert severity={props.severity}>
            <AlertTitle>{props.alertTitle}</AlertTitle>
            {info}
          </Alert>
        </Dialog>
      </div>
    );
  });
  export default CustomAlert;
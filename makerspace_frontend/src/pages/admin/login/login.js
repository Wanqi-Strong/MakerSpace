import './login.css';

import {useState,useRef} from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import CustomAlert from './../../../components/alter/alter'
function Login(props){
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');

    const [nameInput, setNameInput] = useState(null);
    const [pwdInput, setPwdInput] = useState(null);
    const alter = useRef();

    function handleSubmit() {
        let form = {
            username:name.trim(),
            pwd:pwd.trim(),
        }
        if(!form.username){
            nameInput.focus();
            alter.current.showAlert('please input username');
            return;
        }
        if(!form.pwd){
            pwdInput.focus();
            alter.current.showAlert('please input password');
            return;
        }
        console.log(form);
      }
    return(
            <div className="container flex flex_ver flex_center_all">
                <div>
                    <Box component="form" noValidate autoComplete="off" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>   
                        <div>
                            <TextField id="username" label="username" variant="outlined" required size="small"
                            inputRef={(input) => {setNameInput( input) }} 
                            value={name} onChange={(event) => {setName(event.target.value);}} />
                        </div>
                        <div>
                            <TextField id="password" label="password" variant="outlined" type="password" required size="small" 
                            inputRef={(input) => {setPwdInput( input) }} 
                            value={pwd} onChange={(event) => {setPwd(event.target.value);}} />
                        </div>
                        <Button variant="contained" onClick={handleSubmit}>Login</Button>
                    </Box>
                </div>
                <CustomAlert ref={alter} severity='warning' alertTitle='incomplete form'></CustomAlert>
            </div>
    );
}
export default Login;
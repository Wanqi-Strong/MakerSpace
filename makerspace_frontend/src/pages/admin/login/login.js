import './login.css';

import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import CustomAlert from './../../../components/alter/alter'
function Login(props) {
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();

    const [nameInput, setNameInput] = useState(null);
    const [pwdInput, setPwdInput] = useState(null);

    const alter = useRef();

    async function handleSubmit() {
        let form = {
            userEmail: name.trim(),
            userPwd: pwd.trim(),
        }
        if (!form.userEmail) {
            nameInput.focus();
            alter.current.showAlert('please input username');
            return;
        }
        if (!form.userPwd) {
            pwdInput.focus();
            alter.current.showAlert('please input password');
            return;
        }
        let res = await React.$req.post(React.$api.userLogin, form);
        if (res.success) {
            React.$utils.setSessionStorage("userInfo", res.data.data);
            navigateTo("/admin/home");
        } else {
            alter.current.showAlert(res.message);
        }
    }

    function navigateTo(url) {
        try {
            navigate(url);
        } catch (e) {
            throw e;
        }
    }

    function Signup(){
        navigateTo('/admin/signup');
    }
    return (
        <div className="container flex flex_ver flex_center_all">
            <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
                <div>
                    <TextField id="username" label="user email" variant="outlined" required size="small"
                        inputRef={(input) => { setNameInput(input) }}
                        value={name} onChange={(event) => { setName(event.target.value); }} />
                </div>
                <div>
                    <TextField id="password" label="password" variant="outlined" type="password" required size="small"
                        inputRef={(input) => { setPwdInput(input) }}
                        value={pwd} onChange={(event) => { setPwd(event.target.value); }} />
                </div>
                <div className='center-box'>
                    <Button variant="contained" onClick={handleSubmit} size="small" >Login</Button>
                    <Button variant="outlined" onClick={Signup} size="small" >Signup</Button>
                </div>
            </Box>
            <CustomAlert ref={alter} severity='error' alertTitle='Login Failed'></CustomAlert>
        </div>
    );
}
export default Login;
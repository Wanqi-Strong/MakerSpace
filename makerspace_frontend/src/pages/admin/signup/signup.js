import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import CustomAlert from './../../../components/alter/alter'
function Signup(props) {
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const [nameInput, setNameInput] = useState(null);
    const [pwdInput, setPwdInput] = useState(null);
    const [emailInput, setEmailInput] = useState(null);

    const alter = useRef();

    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    async function handleSubmit() {
        let form = {
            userEmail: email.trim(),
            userPwd: pwd.trim(),
            userName: name.trim(),
        }
        if (!form.userName) {
            nameInput.focus();
            alter.current.showAlert('please input name');
            return;
        }
        if (!form.userEmail) {
            emailInput.focus();
            alter.current.showAlert('please input email');
            return;
        }
        if (!form.userPwd) {
            pwdInput.focus();
            alter.current.showAlert('please input password');
            return;
        }
        // check strong pwd
        if (!strongPassword.test(form.userPwd)) {
            pwdInput.focus();
            alter.current.showAlert(`please input password follow rules:\nleast 8 characters long\nleast one uppercase letter\nleast one lowercase letter\nleast one digit\nleast one special character`);
            return;
        }
        let res = await React.$req.post(React.$api.userRegister, form);
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
    return (
        <div className="container flex flex_ver flex_center_all">
            <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
                <div>
                    <TextField id="username" label="user name" variant="outlined" required size="small"
                        inputRef={(input) => { setNameInput(input) }}
                        value={name} onChange={(event) => { setName(event.target.value); }} />
                </div>
                <div>
                    <TextField id="email" label="user email" variant="outlined" required size="small"
                        inputRef={(input) => { setEmailInput(input) }}
                        value={email} onChange={(event) => { setEmail(event.target.value); }} />
                </div>
                <div>
                    <TextField id="password" label="password" variant="outlined" type="password" required size="small"
                        inputRef={(input) => { setPwdInput(input) }}
                        value={pwd} onChange={(event) => { setPwd(event.target.value); }} />
                </div>
                <div className='center-box'>
                    <Button variant="contained" onClick={handleSubmit} size="small" >Signup</Button>
                </div>
            </Box>
            <CustomAlert ref={alter} severity='error' alertTitle='Signup Failed'></CustomAlert>
        </div>
    );
}
export default Signup;
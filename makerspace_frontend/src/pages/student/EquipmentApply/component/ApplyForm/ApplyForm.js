import React, { useState, useRef } from "react"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import CustomAlert from './../../../../../components/alter/alter'
import './ApplyForm.css'
function ApplyForm({ serviceId }) {

    const [firstNameInput, setFirstNameInput] = useState(null);
    const [lastNameInput, setLastNameInput] = useState(null);
    const [reasonInput, setReasonInput] = useState(null);
    const [studentIdInput, setStudentIdInput] = useState(null);
    const [studentEmailInput, setStudentEmailInput] = useState(null);

    const alter = useRef();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [reason, setReason] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    const [severity, setSeverity] = useState('success');

    async function handleSubmit() {
        let form = {
            firstName: firstName,
            lastName: lastName,
            reason: reason,
            studentId: studentId,
            studentEmail: studentEmail,
            startDate: "2023-03-24 08:00:00",
            endDate: "2023-03-25 08:00:00"
        }
        if (!form.firstName) {
            firstNameInput.focus();
            alter.current.showAlert('please input firstName');
            setAlertTitle('incomplete form');
            return;
        }
        if (!form.lastName) {
            lastNameInput.focus();
            alter.current.showAlert('please input lastName');
            setAlertTitle('incomplete form');
            return;
        }
        if (!form.reason) {
            reasonInput.focus();
            alter.current.showAlert('please input reason');
            setAlertTitle('incomplete form');
            return;
        }
        if (!form.studentId) {
            studentIdInput.focus();
            alter.current.showAlert('please input studentId');
            setAlertTitle('incomplete form');
            return;
        }
        if (!form.studentEmail) {
            studentEmailInput.focus();
            alter.current.showAlert('please input studentEmail');
            setAlertTitle('incomplete form');
            return;
        }
        console.log(form);
        let submitForm = {
            serviceId: serviceId,
            record: form
        }
        let res = await React.$req.post(React.$api.reservationAdd, submitForm);
        if (res.success) {
            if (res.data.data) {
                setSeverity('error');
                setAlertTitle('Reservation Fail');
                alter.current.showAlert(res.data.data);
            } else {
                setSeverity('success');
                setAlertTitle('Reservation Success');
                alter.current.showAlert('Your application is submitted');
            }

        }
    }

    return (
        <div className="reservationBox flex flex_center_ver">
            <div className="calendar">there will be a calendar</div>
            <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
                <div>
                    <TextField id="firstName" label="first name" variant="outlined" required size="small"
                        inputRef={(input) => { setFirstNameInput(input) }}
                        value={firstName} onChange={(event) => { setFirstName(event.target.value); }} />
                </div>
                <div>
                    <TextField id="lastName" label="last name" variant="outlined" required size="small"
                        inputRef={(input) => { setLastNameInput(input) }}
                        value={lastName} onChange={(event) => { setLastName(event.target.value); }} />
                </div>
                <div>
                    <TextField id="reason" label="reason" variant="outlined" required size="small"
                        inputRef={(input) => { setReasonInput(input) }}
                        value={reason} onChange={(event) => { setReason(event.target.value); }} />
                </div>
                <div>
                    <TextField id="studentId" label="studentId" variant="outlined" required size="small"
                        inputRef={(input) => { setStudentIdInput(input) }}
                        value={studentId} onChange={(event) => { setStudentId(event.target.value); }} />
                </div>
                <div>
                    <TextField id="studentEmail" label="studentEmail" variant="outlined" required size="small"
                        inputRef={(input) => { setStudentEmailInput(input) }}
                        value={studentEmail} onChange={(event) => { setStudentEmail(event.target.value); }} />
                </div>
                <div className='center-box'>
                    <Button variant="contained" onClick={handleSubmit} size="small" >Submit</Button>
                </div>
            </Box>
            <CustomAlert ref={alter} severity={severity} alertTitle={alertTitle}></CustomAlert>
        </div>
    )

}

export default ApplyForm;
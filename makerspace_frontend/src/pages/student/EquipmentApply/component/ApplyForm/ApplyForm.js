import React, { useState, useRef, useEffect } from "react"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

import CustomAlert from './../../../../../components/alter/alter'
import './ApplyForm.css'
function ApplyForm({ serviceId }) {

    const [firstNameInput, setFirstNameInput] = useState(null);
    const [lastNameInput, setLastNameInput] = useState(null);
    const [reasonInput, setReasonInput] = useState(null);
    const [studentIdInput, setStudentIdInput] = useState(null);
    const [studentEmailInput, setStudentEmailInput] = useState(null);

    const [recordList, setRecordList] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const alter = useRef();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [reason, setReason] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    const [severity, setSeverity] = useState('success');

    useEffect(() => {
        initData()
    }, [])

    function showWarning() {
        setAlertTitle('incomplete form');
        setSeverity('warning');
    }

    function initData() {
        // set date for this week
        let dateRange = React.$utils.getOneDayInWeekAllDate();
        const date1 = dateRange[0];
        const date2 = dateRange[4];
        setStartDate(date1);
        setEndDate(date2);
        queryRecordList(date1, date2);
    }

    async function queryRecordList(startDate, endDate) {
        let form = { startDate: startDate + ' 00:00:00', endDate: endDate + ' 23:59:59', serviceId: serviceId, };
        console.log(form);
        let res = await React.$req.post(React.$api.reservationByService, form);
        console.log(res);
        if (res.success) {
            if (res.data.data && res.data.data.length) {
                res.data.data.forEach((item) => {
                    item.title = 'unavailable';
                    item.start = item.startDate;
                    item.end = item.endDate;
                    item.backgroundColor = '#e2e2e2';
                    item.borderColor = '#e2e2e2';
                    item.textColor = '#000'
                })
                setRecordList(res.data.data)
            }
            console.log(recordList)
        } else {
            setSeverity('error');
            setAlertTitle('Error');
            alter.current.showAlert(res.message);
        }
    }

    async function handleSubmit() {
        let form = {
            firstName: firstName,
            lastName: lastName,
            reason: reason,
            studentId: studentId,
            studentEmail: studentEmail,
            startDate: "2023-05-03 14:00:00",
            endDate: "2023-05-03 15:00:00"
        }
        if (!form.firstName) {
            firstNameInput.focus();
            alter.current.showAlert('please input firstName');
            showWarning();
            return;
        }
        if (!form.lastName) {
            lastNameInput.focus();
            alter.current.showAlert('please input lastName');
            showWarning();
            return;
        }
        if (!form.reason) {
            reasonInput.focus();
            alter.current.showAlert('please input reason');
            showWarning();
            return;
        }
        if (!form.studentId) {
            studentIdInput.focus();
            alter.current.showAlert('please input studentId');
            showWarning();
            return;
        }
        if (!form.studentEmail) {
            studentEmailInput.focus();
            alter.current.showAlert('please input studentEmail');
            showWarning();
            return;
        }
        console.log(form);
        let submitForm = {
            serviceId: serviceId,
            record: form
        }
        let res = await React.$req.post(React.$api.reservationAdd, submitForm);
        if (res.success) {
            if (res.data.code != 1) {
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
            <div className="calendar">
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView='timeGridWeek'
                    selectable={true}
                    weekends={false}
                    allDaySlot={false}
                    height='100%'
                    slotMinTime="10:45:00"
                    slotMaxTime="22:00:00"
                    slotDuration="00:15:00"
                    events={recordList}
                />
            </div>
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
                    <TextField id="studentId" label="studentId" variant="outlined" required size="small"
                        inputRef={(input) => { setStudentIdInput(input) }}
                        value={studentId} onChange={(event) => { setStudentId(event.target.value); }} />
                </div>
                <div>
                    <TextField id="studentEmail" label="studentEmail" variant="outlined" required size="small"
                        inputRef={(input) => { setStudentEmailInput(input) }}
                        value={studentEmail} onChange={(event) => { setStudentEmail(event.target.value); }} />
                </div>
                <div>
                    <TextField id="reason" label="reason" variant="outlined" required size="small"
                        inputRef={(input) => { setReasonInput(input) }}
                        value={reason} onChange={(event) => { setReason(event.target.value); }} />
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
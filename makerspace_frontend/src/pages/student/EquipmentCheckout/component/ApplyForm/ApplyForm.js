import React, { useState, useRef, useEffect } from "react"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
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
    const [bookStart, setBookStart] = useState('');
    const [bookEnd, setBookEnd] = useState('');

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
        // set date for this month
        let dateRange = React.$utils.getOneMonth();
        const date1 = dateRange[0];
        const date2 = dateRange[1];
        setStartDate(date1);
        setEndDate(date2);
    }

    // check the selected time is between any unavailable slot
    function checkBetween(start, end) {
        const item = recordList.find(i =>
            (i.startDate >= start && i.endDate <= end) || (i.startDate <= start && i.endDate >= end) || (i.startDate >= start && i.endDate <= end)
        )
        return React.$utils.isEmpty(item);
    }

    // check the selected time is bigger than now or unavailable
    function checkAllow(info) {
        let moment = React.$utils.getMoment();
        let start = moment(info.startStr + ' 10:00:00').format("YYYY-MM-DD HH:mm:ss");
        let end = moment(info.endStr + ' 17:30:00').subtract(1, "days").format("YYYY-MM-DD HH:mm:ss");
        let limit = moment(info.startStr + ' 17:30:00').add(7, 'days').format("YYYY-MM-DD HH:mm:ss")
        let now = new Date();
        // check if weekend
        if (moment(info.startStr + ' 10:00:00').day() == 0 || moment(info.startStr + ' 10:00:00').day() == 6) {
            return false
        }
        if (moment(info.endStr + ' 17:30:00').subtract(1, "days").day() == 0 || moment(info.endStr + ' 17:30:00').subtract(1, "days").day() == 6) {
            return false
        }
        let valid = info.start > now && info.end > now && end < limit && checkBetween(start, end);
        if (valid) {
            setBookStart(start);
            setBookEnd(end)
        }
        return valid;
    }

    // click prev or next button
    function updateList(info) {
        let moment = React.$utils.getMoment();
        let start = moment(info.start).format("YYYY-MM-DD");
        let end = moment(info.end).format("YYYY-MM-DD");
        setStartDate(start);
        setEndDate(end);
        queryRecordList(start, end);
    }

    async function queryRecordList(startDate, endDate) {
        let form = { startDate: startDate + ' 00:00:00', endDate: endDate + ' 23:59:59', serviceId: serviceId, };
        let res = await React.$req.post(React.$api.reservationByService, form);
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
        } else {
            setSeverity('error');
            setAlertTitle('Error');
            alter.current.showAlert(res.message);
        }
    }

    // resetform
    function resetform() {
        setFirstName('');
        setLastName('');
        setReason('');
        setStudentId('');
        setStudentEmail('');
        setBookStart('');
        setBookEnd('');
    }

    async function handleSubmit() {
        let form = {
            firstName: firstName,
            lastName: lastName,
            reason: reason,
            studentId: studentId,
            studentEmail: studentEmail,
            startDate: bookStart,
            endDate: bookEnd
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
        let submitForm = {
            serviceId: serviceId,
            record: form
        }
        let res = await React.$req.post(React.$api.reservationAdd, submitForm);
        if (res.success) {
            if (res.data.data === '') {
                setSeverity('success');
                setAlertTitle('Reservation Success');
                alter.current.showAlert('Your application is submitted');
                queryRecordList(startDate, endDate);
            } else {
                setSeverity('error');
                setAlertTitle('Reservation Fail');
                alter.current.showAlert(res.data.data);
            }
            resetform();
        }
    }

    return (
        <div className="reservationBox flex flex_center_ver">
            <div className="calendar">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    selectable={true}
                    unselectAuto={false}
                    height='100%'
                    events={recordList}
                    selectAllow={checkAllow}
                    datesSet={updateList}
                />
            </div>
            <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
                <div className="timeBox"><span>Start&nbsp;Date: </span>{bookStart}</div>
                <div className="timeBox"><span>End&nbsp;&nbsp;Date: </span>{bookEnd}</div>
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
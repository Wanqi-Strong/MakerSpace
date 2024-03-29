import React from 'react';

import CustomPaginationActionsTable from './component/bookingList'
import './checkoutBooking.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function CheckoutBooking(props) {
    const customPaginationActionsTableRef = React.useRef();

    const [name, setName] = React.useState('');
    const [nameInput, setNameInput] = React.useState(null);

    const [id, setId] = React.useState('');
    const [idInput, setIdInput] = React.useState(null);

    function queryList() {
        customPaginationActionsTableRef.current.queryListClick(name.trim(), id.trim());
    }

    return (
        <div className="container flex flex_ver">
            <div className='headerBox flex flex_center_ver flex_space-between'>
                <div>
                    <TextField id="name" label="equipment name" variant="outlined" size="small"
                        inputRef={(input) => { setNameInput(input) }}
                        value={name} onChange={(event) => { setName(event.target.value); }} />
                </div>
                <div>
                    <TextField id="id" label="student id" variant="outlined" size="small"
                        inputRef={(input) => { setIdInput(input) }}
                        value={id} onChange={(event) => { setId(event.target.value); }} />
                </div>
                <Button variant="contained" onClick={queryList} size="small" >Search</Button>
            </div>

            <div className='flex_1 tableBox'>
                <div className='test'>
                    <CustomPaginationActionsTable ref={customPaginationActionsTableRef} />
                </div>
            </div>
        </div>
    )
}
export default CheckoutBooking;
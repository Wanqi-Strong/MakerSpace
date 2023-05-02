import * as React from 'react';

import CustomPaginationActionsTable from './component/bookingList'
import './studioBooking.css';

import Button from '@mui/material/Button';

function StudioBooking(props) {
    const customPaginationActionsTableRef = React.useRef();

    function add() {
        customPaginationActionsTableRef.current.add();
    }

    return (
        <div className="container flex flex_ver">
            <div className='headerBox'>
                <Button variant="contained" onClick={add} size="small" >Search</Button>
            </div>
            <div className='flex_1 tableBox'>
                <CustomPaginationActionsTable ref={customPaginationActionsTableRef} />
            </div>
        </div>
    )
}
export default StudioBooking;
import './equipmentManagement.css';
import CustomPaginationActionsTable from './equipmentList'

import * as React from 'react';

import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';

function EquipmentManagement(props){
    function edit(){

    }
    return(
        <div className="container flex flex_ver">
            <div className='headerBox'>
                <Button variant="contained" onClick={edit} size="small" >Add</Button>
            </div>
            <div className='flex_1 tableBox'>
                {CustomPaginationActionsTable()}
            </div>
        </div>
    )
}
export default EquipmentManagement;
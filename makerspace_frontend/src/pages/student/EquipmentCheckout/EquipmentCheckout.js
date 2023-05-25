import React, { useState, useEffect } from 'react';
import './EquipmentCheckout.css'

import EquipmentDetails from './component/EquipmentDetails/EquipmentDetails'



function EquipmentCheckout(props) {

    const [equipmentList, setEquipmentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        queryEquipmentList()
    }, [])

    async function queryEquipmentList() {
        let res = await React.$req.post(React.$api.serviceAllByType, { type: 1, active: 1 });
        if (res.success) {
            setEquipmentList(res.data.data || [])
        }
    }

    function resetSelect() {
        setSelectedItem({});
    }

    function BuildList() {
        return (
            <div className='listBox'>
                <div className='flex flex_center_ver flex_wrap_wrap'>
                    {
                        equipmentList.length && equipmentList.map((item) => {
                            return (
                                <div className='listItem flex flex_ver' key={item.serviceId} onClick={() => { setSelectedItem(item) }}>
                                    <img src={item.picture ? "data:image/png;base64," + item.picture : ''} alt={item.serviceId} />
                                    <span>{item.serviceName}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='applyBox flex flex_ver'>
            <h3>Equipment Checkout</h3>
            {!React.$utils.isEmpty(selectedItem) ? <EquipmentDetails equipmentInfo={selectedItem} resetSelect={resetSelect} /> : null}
            {React.$utils.isEmpty(selectedItem) ? <BuildList /> : null}
        </div>
    )
}

export default EquipmentCheckout;
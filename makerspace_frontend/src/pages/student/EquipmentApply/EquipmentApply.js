import React, { useState, useEffect } from 'react';
import './EquipmentApply.css'

function EquipmentApply(props) {

    const [equipmentList, setEquipmentList] = useState([{ serviceName: 1, serviceId: 1 }]);

    useEffect(() => {
        queryEquipmentList()
    }, [])

    async function queryEquipmentList() {
        let res = await React.$req.post(React.$api.serviceAllByType, { type: 1 });
        console.log(res);
        if (res.success) {
            setEquipmentList(res.data.data || [])
        }
    }

    function BuildList() {
        return (
            <div className='listBox'>
                <div className='flex flex_center_ver flex_wrap_wrap'>
                    {
                        equipmentList.length && equipmentList.map((item) => {
                            return (
                                <div className='listItem flex flex_ver' key={item.serviceId}>
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
            <div className='searchBox'></div>
            <BuildList />
        </div>
    )
}

export default EquipmentApply;
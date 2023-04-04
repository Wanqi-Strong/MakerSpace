import './EquipmentDetails.css'
import ApplyForm from './../ApplyForm/ApplyForm'
import Button from '@mui/material/Button';
function EquipmentDetails({ equipmentInfo, resetSelect }) {
    return (
        <div>
            <Button variant="outlined" size="small" onClick={resetSelect}>Back</Button>
            {/* equipment details */}
            <div className="detailBox flex flex_center_ver">
                <div>
                    <img src={equipmentInfo.picture ? "data:image/png;base64," + equipmentInfo.picture : ''} alt={equipmentInfo.serviceId} />
                </div>
                <div>
                    <div className='flex flex_center_ver'>
                        <h4>Device name:</h4>
                        <span>{equipmentInfo.serviceName}</span>
                    </div>
                    <div className='flex flex_center_ver'>
                        <h4>Location:</h4>
                        <span>{equipmentInfo.location}</span>
                    </div>
                    <div className='flex flex_center_ver'>
                        <h4>Description:</h4>
                        <span>{equipmentInfo.description}</span>
                    </div>
                </div>
            </div>
            {/* reservation form */}
            <ApplyForm serviceId={equipmentInfo.serviceId} />
        </div >
    )
}
export default EquipmentDetails;
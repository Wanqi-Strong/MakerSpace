import './home.css';

import React,{useState} from "react"

import Icon from '@mui/material/Icon';

function AdminHome(props){
    const [summaryInfo, setSummaryInfo] = useState([
        {title:'Total Booking',value:132,per:0.032},
        {title:'Total Checkout',value:88,per:0.015},
        {title:'Total 3D Print',value:63,per:0.044}
    ]);

    function summaryInfoList(props){
        const listItems = props.map((item) =>
        <ListItem key={item.title} item={item} />
      );
        return(
        <div className='summaryBox flex flex_space-around flex_center_ver'>
            {listItems}
        </div>
        )
    }

    function ListItem(props) {
        const item = props.item;
        return(
            <div className='dataBox'>
                <div>{item.title}</div>
                <div>
                <div className='flex flex_center_ver flex_space-between'>
                    <div>{item.value}</div>
                    <Icon>check_box</Icon>
                </div>
                <div>+ {React.$utils.toFixed(item.per*100)}% from last month</div>
                </div>
            </div>
        )
    }

    return(
        <div className="container flex flex_ver flex_center_all">
            {summaryInfoList(summaryInfo)}
            <div className='chartBox flex flex_center_ver flex_space-between'>
                <div className='flex flex_center_all'>chart 1</div>
                <div className='flex flex_center_all'>chart 2</div>
            </div>
        </div>
    )
}
export default AdminHome;
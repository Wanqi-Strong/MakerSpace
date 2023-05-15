import './home.css';

import React, { useState } from "react"

import Icon from '@mui/material/Icon';

import MyLineChart from './component/lineChart';
import MyPieChart from './component/PieChart';

function AdminHome(props) {
    const [summaryInfo, setSummaryInfo] = useState([
        { title: 'Total In-studio', sum: 0, per: 0, icon: 'construction', type: 3 },
        { title: 'Total Checkout', sum: 0, per: 0, icon: 'shopping_cart', type: 1 },
        { title: 'Total Workshop', suum: 0, per: 0, icon: 'school', type: 2 }
    ]);

    const [list, setList] = React.useState([]);

    React.useEffect(() => {
        query()
    }, [])

    async function query() {
        let res = await React.$req.post(React.$api.summaryByMonth);
        if (res.success) {
            let list = res.data.data, info = [...summaryInfo];
            for (let i of list) {
                for (let i1 of info) {
                    if (i.type === i1.type) {
                        i1.sum = i.sum;
                    }
                }
            }
            setSummaryInfo(info);
        }
    }

    function summaryInfoList(props) {
        const listItems = props.map((item) =>
            <ListItem key={item.title} item={item} />
        );
        return (
            <div className='summaryBox flex flex_space-around flex_center_ver'>
                {listItems}
            </div>
        )
    }

    function ListItem(props) {
        const item = props.item;
        return (
            <div className='dataBox'>
                <div>{item.title}</div>
                <div>
                    <div className='flex flex_center_ver flex_space-between'>
                        <div>{item.sum || 0}</div>
                        <Icon>{item.icon}</Icon>
                    </div>
                    <div>+ {React.$utils.toFixed(item.per * 100)}% from last month</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container flex flex_ver flex_center_all">
            {summaryInfoList(summaryInfo)}
            <div className='chartBox flex flex_center_ver flex_space-between'>
                <div className='flex flex_center_all'>
                    <MyLineChart />
                </div>
                <div className='flex flex_center_all'>
                    <MyPieChart />
                </div>
            </div>
        </div>
    )
}
export default AdminHome;
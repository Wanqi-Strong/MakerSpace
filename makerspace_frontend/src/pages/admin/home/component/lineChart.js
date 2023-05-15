import React from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function MyLineChart(props) {

    const [list, setList] = React.useState([]);

    React.useEffect(() => {
        query();
    }, [])

    function initMonth() {
        let copy = [...list];
        let moment = React.$utils.getMoment();
        for (let i = 5; i > 0; i--) {
            let m = moment().subtract(i, 'months').format('M');
            let obj = {
                "equipment": 0,
                "month": m,
                "studio": 0,
                "workshop": 0,
            }
            copy.push(obj);
        }
        let obj = {
            "equipment": 0,
            "month": moment().format('M'),
            "studio": 0,
            "workshop": 0,
        }
        copy.push(obj);
        return copy;
    }

    async function query() {
        let res = await React.$req.post(React.$api.summaryForMonth, { 'month': 6 });
        if (res.success) {
            let copy = [...list];
            let ans = initMonth();
            for (let i of ans) {
                for (let i1 of res.data.data) {
                    if (i["month"] == i1["month"]) {
                        i["equipment"] = i1["equipment"];
                        i["studio"] = i1["studio"];
                        i["workshop"] = i1["workshop"];
                    }
                }
            }
            copy = ans;
            setList(copy)
        }
    }
    return (
        <LineChart
            width={500}
            height={300}
            data={list}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="workshop"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="equipment" stroke="#4bcbeb" />
            <Line
                type="monotone"
                dataKey="studio"
                stroke="#fe9496"
                activeDot={{ r: 12 }}
            />
        </LineChart>
    );
}
export default MyLineChart;
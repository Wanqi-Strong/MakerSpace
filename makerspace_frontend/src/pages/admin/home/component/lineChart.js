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

const data = [
    {
        name: "1",
        equipment: 30,
        workshop: 12,
        amt: 2400
    },
    {
        name: "2",
        equipment: 45,
        workshop: 54,
        amt: 99
    },
    {
        name: "3",
        equipment: 32,
        workshop: 80,
        amt: 112
    },
    {
        name: "4",
        equipment: 64,
        workshop: 24,
        amt: 88
    },
    {
        name: "5",
        equipment: 112,
        workshop: 90,
        amt: 202
    },
    {
        name: "6",
        equipment: 10,
        workshop: 38,
        amt: 48
    },
];

function MyLineChart(props) {

    const [list, setList] = React.useState([]);

    React.useEffect(() => {
        //query()
    }, [])

    async function query() {
        let res = await React.$req.post(React.$api.summaryByMonth);
        console.log(res)
        if (res.success) {
            setList(res.data.data)
        }
    }
    return (
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
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
        </LineChart>
    );
}
export default MyLineChart;
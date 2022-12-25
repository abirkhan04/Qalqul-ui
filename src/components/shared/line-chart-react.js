import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

export const LineChartReact = ({data, xKey, yKey, width})=>  {
        return  (<LineChart width={width-30} height={450} data={data}>
        <XAxis dataKey={xKey}/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="10 0"/>
        <Line type="monotone" dataKey={yKey} stroke="#4E342E" />
        {/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
      </LineChart>)
}

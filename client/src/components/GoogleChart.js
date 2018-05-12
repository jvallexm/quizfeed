import React from 'react';
import { Chart } from 'react-google-charts';

const GoogleChart = (props) =>{

    return(

        <Chart graph_id={props.id} chartType="PieChart" data={props.pieChartData} height="150px"/>

    )

}

export default GoogleChart;
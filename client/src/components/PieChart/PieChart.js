import React, {Component} from "react";
import {GoogleCharts} from 'google-charts';

function drawChart() {
    }

class PieChart extends React.Component {
    

    componentDidMount () {
        GoogleCharts.load(this.drawChart);
        
    }

    drawChart = () => {
        const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById(this.props.id));
        pie_1_chart.draw(GoogleCharts.api.visualization.arrayToDataTable(this.props.data));
    }
    render () {
        return <div id={this.props.id}></div>
    }
};



export default PieChart;

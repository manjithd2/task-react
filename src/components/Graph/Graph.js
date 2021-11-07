import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Bar } from 'react-chartjs-2';

import classes from './graphStyle.module.scss';

const Graph = () => {
    const [chartData, setChartData] = useState({});
    console.log(chartData)
    const graphData = useSelector(state => state.graph)
   
    useEffect(() => {
      initializeGraph()
    }, [graphData])

    console.log("Rendering Graph component")
    const initializeGraph = () => {
        let languages = [],
            popularity = [];
        for (const data of graphData ){
            languages.push(data.name);
            popularity.push(data.count)
        }
        console.log("Rendering Graph component 2", graphData)

        setChartData({
            labels: languages,
            datasets: [{
                label: "Count of languages",
                data: popularity,
                backgroundColor: ["rgba(79,166,255,1)"],
                borderWidth: 1
            }]
        })

    }


 

    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

    return (
        <div className={classes.graphBody}>
            { Object.keys(chartData).length > 0 && <Bar
              data={chartData}
              // options={options}
            />}
        </div>
    )
}

export default Graph

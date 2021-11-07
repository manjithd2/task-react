import React from 'react'
import classes from "./homeStyle.module.scss";

function Home() {
    return (
        <div className={classes.home}>
            <h4>Zolve task</h4>
            <ul>
                <li>I have Implemented the given 2 tasks and partially implemented the 3rd optional task.</li>
                <li>Run the dev server in HTTPS mode while viewing the Webcam task</li>
                <li>I have used material UI for styling some components, the API tasks mostly</li>
                <li>I have used react-redux for the state management in the API task, to get the graph data</li>
                <li>I used charts.js for the graph rendering bit</li>
                <li>For the copy to clipboard task, the input box is read only and it gets its value from the query param </li>
                <li>I enjoyed doing the third task more because video on the frontend wasn't something i had worked on before and I learnt a lot while doing it. 
                    Though I haven't fully completed it, i am going to look into the cropping functionality personally as a side project.</li>
                <li>Had fun doing the tasks, the front page was empty and so i've filled it with some content using these points!</li>
            </ul>
        </div>
    )
}

export default Home

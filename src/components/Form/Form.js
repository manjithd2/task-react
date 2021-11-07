import React, { useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import getGraphData from '../../api/getGraphData';
import { graph_data } from '../../redux/actions/actions';

import classes from './formStyle.module.scss';

const Form = () => {
    //Subtracting ~ epoch 1 week to initialize from date to 1 week before
    const [fromDate, setFromDate] = useState(() => Date.now() - 516622071);
    const [toDate, setToDate] = useState(() => Date.now());
    const [pageSize, setPageSize ] = useState("");
    const [page, setPage] = useState("");

    const [err,setErr] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    
    const dispatch = useDispatch();
    const data = useSelector(state => state.graph)

    console.log("XXXXXXX",data)


    const onInputChange = (e) => {
        const field = e.currentTarget.id;
        switch (field) {
            case "pageSize":
                setPageSize(e.target.value)
                break;
            case "page":
                setPage(e.target.value)
                break;
            default:
                break;
        }
    }

    const onDateChange = (value) => {
        console.log(value.getTime(),"//", (value.getTime())/1000)
        setFromDate(value.getTime())
    }

    const onToDateChange = (value) => {
        setToDate(value.getTime())
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        setErr(false)
        //Call api to get graphData
        const {res,error,errorMessage} = await getGraphData(pageSize,page,fromDate,toDate)

        if (error === false){
            //Update graph data in redux store
            dispatch(graph_data(res))
            setLoading(false)
        }

        else if (error === true) {
            setErr(true);
            setErrMessage(errorMessage);
            setLoading(false)
        }
            
    }
    
    return (
        <div>
            <form className={classes.graphForm} onSubmit={handleSubmit}> 
                <TextField
                    onChange={onInputChange}
                    InputProps={{
                        className: classes.graphForm__input,
                    }}
                    value={pageSize}
                    name={"pageSize"}
                    label={"Page Size"} 
                    id="pageSize"
                />
                <TextField
                    InputProps={{
                        className: classes.graphForm__input,
                    }}
                    onChange={onInputChange}
                    value={page}
                    name={"page"}
                    label={"Page"}
                    id="page"
                />
                 <LocalizationProvider dateAdapter={DateAdapter}>
                    <DesktopDatePicker
                        
                        label="From Date"
                        inputFormat="dd/MM/yyyy"
                        value={fromDate}
                        onChange={onDateChange}
                        id="fromDate"
                        InputProps={{
                            className: classes.graphForm__input,
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        />

                    <DesktopDatePicker
                        label="To Date"
                        inputFormat="dd/MM/yyyy"
                        value={toDate}
                        onChange={onToDateChange}
                        id="fromDate"
                        InputProps={{
                            className: classes.graphForm__input,
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        />

                 </LocalizationProvider>

                
                 <button className={classes.graphForm__button} type="submit">Get Graph</button>
            </form>
            { loading && <p className= {classes.loading}> Loading your graph...</p> }
            { err && <p className={classes.error}> {errMessage} </p>}
        </div>
    )
}

export default Form

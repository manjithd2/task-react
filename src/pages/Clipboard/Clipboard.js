import React , {useState, useEffect, useRef } from 'react';

import classes from "./clipboardStyle.module.scss";

function Clipboard() {

    const [queryStr,setQueryStr] = useState("");
    const [ copied, setCopied ] = useState(false);
    
    const getQueryParam = () => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('q')){
            setQueryStr(query.get('q'))
        }
        
    }
    

    const handleCopy = () => {
        // inputRef.current.select();
        if ('clipboard' in navigator){
            navigator.clipboard.writeText(queryStr)
            
        }
        else {
            document.execCommand('copy',true,queryStr)
        }
        //For notification of user
        setCopied(true);
        setTimeout( () => {
            setCopied(false)
        }, 2000)
    }

    useEffect(() => {
        getQueryParam();
    }, []) 

    return (
        <div>
        <div className={classes.clipboard}>
            <input type="text" readOnly value={queryStr}/>
            <button onClick={handleCopy}>Copy</button>
        </div>
         { copied && <div className={classes.notification}> Copied <b>{queryStr}</b> to clipboard! </div>}
         </div>
    )
}

export default Clipboard

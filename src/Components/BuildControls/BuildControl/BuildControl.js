import React from 'react';
import classes from './BuildControl.css';
const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button onClick={props.lessHandler.bind(this, props.type)} className={classes.Less} disabled={props.disabled}>Less</button>
            <button onClick={props.moreHandler.bind(this, props.type)} className={classes.More} >More</button>
        </div>
    )
};

export default buildControl;

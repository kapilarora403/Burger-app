import React from 'react';
import burgerLogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height, marginBottom: props.mb ? props.mb: null}}>
            <img src={burgerLogo} alt='Burger'/>
        </div>
    )
};

export default logo;

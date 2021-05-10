import React from 'react';
import classes from './column.module.css';

export default function Column({value}) {
    return (
        <div className={classes.change}>
            <span>{value}</span>
        </div>
    )
};

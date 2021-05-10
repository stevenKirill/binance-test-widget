import React from 'react';
import Header from '../Header/Header';
import Table from '../Table/Table';
import classes from './widget.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SortableButtons from '../SortableButtons/SortableButtons';

export default function Widget(props) {
    const {data} = props;
    return (
        <div className={classes.wrapper}>
            <Header/>
            <SearchBar/>
            <SortableButtons/>
            <Table data={data}/>
        </div>
    );
}

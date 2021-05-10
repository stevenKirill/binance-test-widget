import React, {useContext} from 'react';
import classes from './searchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {Ctx} from '../../App';

export default function SearchBar() {
    const {dispatch} = useContext(Ctx);

    function handleChangeText(e) {
        dispatch({
            type: 'FILTER_BY_NAME',
            payload: e.target.value
        }) 
    };

    function handleChooseOption(e) {
        // диспатчим разные строки в зависимости от кнопки на которую тыкаем
        const {value} = e.target;
        if(value === 'volume') {
            dispatch({type: 'VOLUME_COLUMN'})
        } else if(value === 'change') {
            dispatch({type: 'CHANGE_COLUMN'})
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.inputText}>
                <div><FontAwesomeIcon icon={faSearch}/></div>
                <input 
                type="text"
                onChange={handleChangeText}
                className={classes.inputNode}
                placeholder="Search"/>
            </div>
            <div className={classes.radioWrapper}>
                <div>
                    <label>Change</label>
                    <input type="radio" name="option" value="change" onChange={handleChooseOption}/>
                </div>
                <div>
                    <label>Volume</label>
                    <input type="radio" name="option" value="volume" onChange={handleChooseOption}/>
                </div>
            </div>
        </div>
    )
}
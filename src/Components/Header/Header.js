import React, {useContext} from 'react';
import classes from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {Ctx} from '../../App';


const config = [
    {
        label: '',
        component: (dispatch) => <div onClick={() => dispatch({type: 'SHOW_FAVOURITE'})} className={classes.fav}><FontAwesomeIcon icon={faStar}/></div>,
    },
    {
        label: 'All',
        image: 'url',
        changebaleLabel: false,
    },
    {
        label: 'BTC',
        image: 'url',
        subCategories: [],
        changebaleLabel: false,
    },
    {
        label: 'BNB',
        image: 'url',
        subCategories: [],
        changebaleLabel: false,
    },
    {
        label: 'ETH',
        image: 'url',
        subCategories: [],
        changebaleLabel: true,

    },
    {
        label: 'USDT',
        image: 'url',
        subCategories: [],
        changebaleLabel: true,

    },
]

/**
 * Проверка на функцию
 * @param {function} func функция
 * @returns является ли функцией
 */
function isFunction(func) {
    return typeof func === 'function'
};

export default function Header() {
    const {dispatch} = useContext(Ctx)

    function handleChooseCurrency(currency) {
        const {label} = currency;
        // сначала очистить фильтр (вернуть полную таблицу а потом заново применить)
        dispatch({type: 'CLEAR_FILTER'});
        dispatch({
            type: 'FILTER_BY_CURRENCY',
            payload: label
        })
    };

    return (
        <div className={classes.wrapper}>
            {config.map(element => {
                let jsxComponent;
                if(element.component && isFunction(element.component)) {
                    jsxComponent = element.component(dispatch);
                } else {
                    jsxComponent = <div className={classes.cell} onClick={() => handleChooseCurrency(element)}>
                                         <span>{element.label}</span>
                                    </div>
                }
                return jsxComponent;
            })}
        </div>
    )
}
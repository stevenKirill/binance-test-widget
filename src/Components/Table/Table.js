import React, {useContext} from 'react';
import classes from './table.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {Ctx} from '../../App';
import Column from '../Column/Column';

export default function Table({data}) {
    const {dispatch,change} = useContext(Ctx);

    function addFavourite(e) {
        const {target} = e;
        // тут чтобы сто обработчиков не назначать на каждый ряд 
        // вешаем один Event Delegation Pattern и ловим уже событие на 
        // дочерних элементах то есть на svg и его родителе
        if(target.dataset.name === 'favourite') {
            dis(target.dataset)
        } else if(target.dataset.prefix === 'fas') {
            const {dataset} = target.parentNode;
            dis(dataset)
        } else if(target.nodeName === 'path') {
            const {dataset} = target.parentNode.parentNode;
            dis(dataset)
        }
    };
    /*Чтобы сто раз не писать диспатч а сюда просто пэулоал передат из разных кейсов */
    function dis(dataset) {
        dispatch({type: 'ADD_FAVOURITE', assets: {
            base: dataset.base,
            relate: dataset.relate
        }})
    }

    function renderData() {
        let jsx = [];
        if (data) {
            if(data.length === 0) {
                const noData = <div className={classes.noData}>No data</div>
                jsx.push(noData)
            } else {
                data.forEach(item => {
                    const valueForThirdColumn = change ? item.qv : item.i;
                    const row = <div className={classes.wrapper}>
                                    <div className={classes.inner}>
                                        <div className={classes.fav} data-name="favourite" data-base={item.b} data-relate={item.q}>
                                            <FontAwesomeIcon icon={faStar}/>
                                        </div>
                                        <div className={classes.assets}>
                                            <span>{item.b}</span>/<span>{item.q}</span>
                                        </div>
                                        <div className={classes.price}>
                                            <span>{item.c}</span>
                                        </div>
                                        <Column value={valueForThirdColumn}/>
                                    </div>
                                </div>
                    jsx.push(row);
                })
            }
        }
        return jsx;
    }
    return (
        <div className={classes.wrapper} onClick={addFavourite}>{renderData()}</div>
    )
}
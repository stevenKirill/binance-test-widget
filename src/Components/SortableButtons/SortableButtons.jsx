import React, {useContext} from 'react';
import classes from './sortableButtons.module.css';
import {Ctx} from '../../App';

export default function SortableButtons() {
    const context = useContext(Ctx);
    const {dispatch, change} = context;
    function handleArrowUp(option1, option2) {
        switch(option1) {
            case 'number':
                return dispatch({
                    type: 'SORT_DATA_BY_NUMBER',
                    way: 'asc',
                    column: option2
                })
            case 'string':
                return dispatch({
                    type: 'SORT_DATA_BY_STRING',
                    way: 'asc',
                    column: option2
                })
            default:
                return
        }
    };

    function handleArrowDown(option1, option2) {
        switch(option1) {
            case 'number':
                return dispatch({
                    type: 'SORT_DATA_BY_NUMBER',
                    way: 'desc',
                    column: option2
                })
            case 'string':
                return dispatch({
                    type: 'SORT_DATA_BY_STRING',
                    way:'desc',
                    column: option2
                })
            default:
                return
        }
    };

    return (
        <div className={classes.buttons}>
            <div className={classes.inner} style={{
                    marginLeft: '77px'
                }}>
                <div className={classes.label}>Pair</div>
                <div className={classes.arrows}>
                    <div className={classes.arrowUp} style={{
                        marginBottom: '3px'
                    }}
                    onClick={() => handleArrowUp('string', 'pair')}></div>
                    <div className={classes.arrowDown} onClick={() => handleArrowDown('string', 'pair')}></div>
                </div>
            </div>
            <div className={classes.inner} style={{
                    marginLeft: '47px'
                }}>
                <div className={classes.label}>Price</div>
                <div className={classes.arrows}>
                    <div className={classes.arrowUp} style={{
                        marginBottom: '3px'
                    }}
                    onClick={() => handleArrowUp('number', 'price')}></div>
                    <div className={classes.arrowDown} onClick={() => handleArrowDown('number', 'price')}></div>
                </div>
            </div>
            <div className={classes.inner}  style={{
                    marginLeft: '17px'
                }}>
                <div className={classes.label}>{change ? "Change" : 'Volume'}</div>
                <div className={classes.arrows}>
                    <div className={classes.arrowUp} style={{
                        marginBottom: '3px'
                    }}
                    onClick={() => handleArrowUp('number', 'volume')}></div>
                    <div className={classes.arrowDown} onClick={() => handleArrowDown('number', 'volume')}></div>
                </div>
            </div>

        </div>
    )
};
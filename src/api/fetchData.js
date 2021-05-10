import {URL} from './url';
import {START_LOAD_DATA,LOAD_SUCCESS,LOAD_FAILED} from '../actions/actions_consts';

/**
 * Функция загрузки данных с сервака (валют и инфе о них) она ниче не возвращает
 * @param {function} dispatch диспатч в стор после загрузки данных
 * @param {function} subscribeToData подписка на изменения в сокете
 */
export function fetchData(dispatch, subscribeToData) {
    dispatch({
        type: START_LOAD_DATA,
      });
      fetch(URL)
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        dispatch({
          type: LOAD_SUCCESS,
          payload: data
        });
        subscribeToData();
      })
      .catch((err) => {
        console.error(err)
        dispatch({
          type: LOAD_FAILED
        });
      })
};
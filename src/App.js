import './App.css';
import React, {useReducer, useEffect} from 'react';
import Widget from './Components/Widget/Widget';
import Button from './Components/Button/Button';
import Loader from './Components/Loader/Loader';
import {io} from 'socket.io-client';
import {customSort, filterByName, filterByCurrency} from "./utils/utils";
import {fetchData} from './api/fetchData';

const socket = io('wss://stream.binance.com/stream?streams=!miniTicker@arr');

console.log(socket,'=>> socket')
// функция которая вызывает сокет и подписывается на изменения на серваке
function subscribeToData() {
  console.log('function subscribe')
  socket.on('message',  param => {
    console.log(param,'=>> para,')
    // dispatch()
  }); 
};

const initialState = {
  serverData: null,
  loading: false,
  error: false,
  serverDataCopy: null,
  favouriteCurrencies: [],
  change: true,
};

/** лень было писать action creators поэтому все экшены в стрингах обычных=) */
function reducerFuntion(state, action) {
  switch (action.type) {
    case 'START_LOAD_DATA':
      return {
        ...state,
        loading: true
      }
    case 'LOAD_SUCCESS':
      const {data} = action.payload;
      const sliced = data.slice(0,100);
      return {
        ...state,
        loading: false,
        serverData: sliced,
        serverDataCopy: sliced,
      }
    case 'LOAD_FAILED':
      return {
        ...state,
        loading: false,
        error: true,
      }
    case 'SORT_DATA_BY_NUMBER':
        return {
          ...state,
          serverData: customSort(state.serverData, {
            direction: action.way,
            byWhat: 'number',
            column: action.column
          })
        };
    case 'SORT_DATA_BY_STRING':
        return {
          ...state,
          serverData: customSort(state.serverData, {
            direction: action.way,
            byWhat: 'string',
            column: action.column
          })
        };
    case "FILTER_BY_NAME":
      const {payload} = action;
      if(!payload.length) {
        return {
          ...state,
          serverData: [].concat(state.serverDataCopy),
        }
      } else {
        return {
          ...state,
          serverData: filterByName(state.serverData, payload),
        }
      }
    case 'CLEAR_FILTER': 
      return {
        ...state,
        serverData: [].concat(state.serverDataCopy),
      }
    case 'FILTER_BY_CURRENCY':
      if (action.payload === 'All') {
        return state;
      } else {
        return {
          ...state,
          serverData: filterByCurrency(state.serverData,action.payload)
        }
      }
    case 'SHOW_FAVOURITE':
      return {
        ...state,
        serverData: [].concat(state.favouriteCurrencies)
      }
    case 'ADD_FAVOURITE':
      const {assets: {base,relate}} = action;
      const found = state.serverData.find(item => item.b === base && item.q === relate);
      if (state.favouriteCurrencies.includes(found)) {
        return state;
      } else {
        return {
          ...state,
          favouriteCurrencies: state.favouriteCurrencies.concat([found])
        }
      }
    case 'VOLUME_COLUMN':
      return {
        ...state,
        change: false
      }
    case 'CHANGE_COLUMN':
      return {
        ...state,
        change: true,
      }
    default:
      return state;
  }
};

export const Ctx = React.createContext({
  dispatch: function noop() {},
  data: [],
  volume: false,
  change: true,
});

function App() {
  const [state, dispatch] = useReducer(reducerFuntion, initialState);

  useEffect(() => {
    fetchData(dispatch, subscribeToData)
  },[]);

  const {loading, serverData, error, change} = state;
  return (
    <Ctx.Provider value={{
      dispatch,
      data: serverData,
      change,
    }}>
      <div className="App">
        {loading && <Loader/>}
        {!loading && !error && <Widget data={serverData}/>}
        {!loading && error && <div>Error</div>}
        <Button/>
      </div>
      </Ctx.Provider>
  );
}

export default App;

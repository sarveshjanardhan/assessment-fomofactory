import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, setData } from '../store';
import axios from 'axios';

const SYMBOLS = ['bitcoin', 'ethereum', 'dogecoin', 'cardano', 'polkadot']

const convertToIST = (timestamp: any) => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
};

const StockTable = () => {
  const symbol = useSelector((state: RootState) => state.symbol.symbol);
  const data = useSelector((state: RootState) => state.symbol.data);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/api/prices?symbol=${symbol}`);
      dispatch(setData(response.data.slice(-20)));
    };
    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, [symbol, dispatch]);

  return (
    <div>
      <button onClick={() => openModal()} style={{ marginBottom: '10px' }}>Change Symbol</button>
      <table>
        <thead>
          <tr>
            <th style={{ paddingRight: '20px' }}>Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td style={{ paddingRight: '20px' }}>{convertToIST(entry.timestamp)}</td>
              <td>{entry.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const openModal = () => {
  const modal = document.getElementById('modal');
  modal!.style.display = 'block';
};

const closeModal = () => {
  const modal = document.getElementById('modal');
  modal!.style.display = 'none';
};

const Modal = () => {
  const dispatch: AppDispatch = useDispatch();
  const { setSymbol } = require('../store');

  const handleChangeSymbol = (symbol: string) => {
    dispatch(setSymbol(symbol));
    closeModal();
  };

  return (
    <div id="modal" style={{ display: 'none' }}>
      <div>
        <button onClick={() => closeModal()} style={{ marginBottom: '10px' }}>Close</button>
        {SYMBOLS.map((symbol) => (
          <button key={symbol} onClick={() => handleChangeSymbol(symbol)} style={{ display: 'block', marginBottom: '10px' }}>
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Modal />
      <StockTable />
    </div>
  );
};

export default App;

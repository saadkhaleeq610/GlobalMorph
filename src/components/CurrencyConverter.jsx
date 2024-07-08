import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFrom, setTo, setAmount, convertCurrency } from '../features/currency/currencySlice';

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const { from, to, amount, result, status, history } = useSelector((state) => state.currency);

  const handleConvert = () => {
    dispatch(convertCurrency({ from, to, amount }));
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => dispatch(setAmount(Number(e.target.value)))}
        />
        <select value={from} onChange={(e) => dispatch(setFrom(e.target.value))}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more currencies as needed */}
        </select>
        <span>to</span>
        <select value={to} onChange={(e) => dispatch(setTo(e.target.value))}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more currencies as needed */}
        </select>
        <button onClick={handleConvert}>Convert</button>
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && <p>Result: {result.toFixed(2)}</p>}
      {status === 'failed' && <p>Error occurred. Please try again.</p>}
      <h2>Recent Conversions</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.amount} {item.from} = {item.result.toFixed(2)} {item.to}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyConverter;
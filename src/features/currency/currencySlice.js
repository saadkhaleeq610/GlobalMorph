import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const convertCurrency = createAsyncThunk(
  'currency/convert',
  async ({ from, to, amount }) => {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const rate = response.data.rates[to];
    return { from, to, amount, result: amount * rate };
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    from: 'USD',
    to: 'EUR',
    amount: 1,
    result: 0,
    history: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(convertCurrency.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(convertCurrency.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload.result;
        state.history.unshift(action.payload);
        if (state.history.length > 5) state.history.pop();
      })
      .addCase(convertCurrency.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFrom, setTo, setAmount } = currencySlice.actions;

export default currencySlice.reducer;
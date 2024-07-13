import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SymbolState {
  symbol: string;
  data: any[];
}

const initialState: SymbolState = {
  symbol: 'bitcoin',
  data: [],
};

const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    setSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
  },
});

export const { setSymbol, setData } = symbolSlice.actions;

const store = configureStore({
  reducer: {
    symbol: symbolSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

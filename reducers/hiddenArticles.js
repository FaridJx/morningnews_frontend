import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const hiddenArticleSlice = createSlice({
  name: 'hiddenArticles',
  initialState,
  reducers: {
    hidden: (state, action) => {
        state.value.push(action.payload);
    },
    show: (state) => {
        state.value = []
    }
  }
});

export const { hidden, show } = hiddenArticleSlice.actions;
export default hiddenArticleSlice.reducer;